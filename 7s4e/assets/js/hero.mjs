/* wdd131/7s4e/assets/js/hero.js */

import * as svg from "./svg.mjs";
import getFamilyObject from "./utils.mjs";

/* IMPORTED OBJECT */
const family = getFamilyObject();

/* STRUCTURE VALUES */

// SVG parameters
const viewboxSize = 1000;

// Shapes
const controlPointMagnitude = 650; // 600;
const portraitOffset = controlPointMagnitude * 0.47; // 282;
const portraitRadius = controlPointMagnitude * 0.28; // 168;
const infinityLobeWidth = portraitOffset + portraitRadius;

// Paths
const imagesPath = "assets/images/";
const lowerLeft = `-${controlPointMagnitude},${controlPointMagnitude}`;
const lowerRight = `${controlPointMagnitude},${controlPointMagnitude}`;
const upperLeft = `-${controlPointMagnitude},-${controlPointMagnitude}`;
const upperRight = `${controlPointMagnitude},-${controlPointMagnitude}`;
const pathCommands = {
  "infinityLoop": `M 0,0 C ${lowerLeft} ${upperLeft} 0,0 S ${upperRight} 0,0`,
  "leftLobe": `M 0,0 C ${lowerLeft} ${upperLeft} 0,0`,
  "rightLobe": `M 0,0 C ${lowerRight} ${upperRight} 0,0`
};

/* STYLE VALUES */

// Colors
const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color").trim();
const accentColor = styles.getPropertyValue("--dark-accent").trim();

// Gradients
const colorStops = [
  {"offset": portraitRadius / portraitOffset, "color": mainColor},
  {"offset": 1, "color": accentColor}
];
const gradientCx = {
  "center": 0.5, 
  "left": portraitRadius / infinityLobeWidth, 
  "right": portraitOffset / infinityLobeWidth
};
const gradientRadius = portraitOffset / infinityLobeWidth;

/* ANIMATION VALUES */
const generationalScaleFactor = 2;
const times = {
  "rotation": {"duration": 0.5, "deviation": 0.25},
  "revolution": {"duration": 0.5, "deviation": 0}
}

/* SVG ELEMENTS */

// Portrait frame for single family memembers
const roundFrame = svg.createShape(
  svg.createCircle(portraitRadius), ["logos", "hero__frame"]);

// Portrait frame for married family memembers
const infinityFrame = svg.createShape(
  svg.createPath(pathCommands.infinityLoop), ["logos", "hero__frame"]
);

/* FUNCTIONS */

/**addHouseholds()
 * Recursively add objects of SVG elements to arrays of portraits and households
 * @param {Object} family - Object with parents and children
 * @param {Object} attributes - Object tracking generation, siblings, and parent
 * @param {Array} households - Array of household SVG elements and motion paths
 * @return {void} Modified elements array is passed by reference
 */
const addHouseholds = (family, generation, siblingCount, siblingIndex, parent, 
  orbitalPeriod, elements) => {
  
  // Parent(s) for whose household the SVG group element is created
  const parents = family.parents;
  const parentId = parents[0].name.toLowerCase();
  const household = createHouseholdGroup(parents, parentId, generation);
  household.setAttribute("id", `${parentId}-group`);

  // Move household group along parent's frame
  if (siblingCount > 0) {
    const animations = getMotions(
      orbitalPeriod, siblingCount, siblingIndex, parent
    );
    animations.forEach(animation => household.appendChild(animation));
  }

  // Retain SVG element
  elements.push(household);

  // Children for whom addHouseholds() is called
  const children = family.children;
  if (children.length) {

    // Update household attributes
    generation++;
    siblingCount = children.length;
    parent = parentId;
    orbitalPeriod = getRandomizeTime(
      times.revolution.duration, times.revolution.deviation
    );

    children.forEach((child, index) => {

      // Update individual attribute
      siblingIndex = index;

      // Recursive call
      addHouseholds(child, generation, siblingCount, siblingIndex, parent, 
        orbitalPeriod, elements);
    })
  }
}

/**createHouseholdGroup()
 * Create portrait from croped image or of name, align and rotate
 * @param {Array} parents - Array of person objects
 * @param {Boolean} isCouple - False if single
 * @param {Number} rotationDuration - Time for complete rotation, in minutes
 * @param {String} parentId - Parent name assigned to frame path
 * @return {Element} - Household group element
 */
const createHouseholdGroup = (parents, parentId, generation) => {

  // Initialize parameters for household
  const isCouple = parents.length === 2;
  const rotationDuration = getRandomizeTime(
    times.rotation.duration, times.rotation.deviation
  );

  // Initialize group elements
  const householdGroup = svg.createGroup();
  const mattedPortraits = svg.createGroup();
  const frame = isCouple ? infinityFrame.cloneNode(true) : 
    roundFrame.cloneNode(true);
  frame.setAttribute("id", `${parentId}-path`);

  // Append elements to group
  parents.forEach((parent, index) => {

    // Set alignment and create portrait
    const portraitAlignment = isCouple ? ["left", "right"][index] : "center";
    /* debugging addion of generation parameter */
    const portrait = createPortait(parent, portraitAlignment, rotationDuration, generation);
    
    // Add mat and portrait to mattedPortaits group
    mattedPortraits.appendChild(createMat(portraitAlignment));
    mattedPortraits.appendChild(portrait);
  });

  // Transformations
  const transformationElements = [mattedPortraits, frame];

  // Translate and scale mattedPortaits and frame groups
  const translateValue = isCouple && generation > 0 ? 
    `translate(${getOffset("right", generation)}, 0)` : "";
  const scaleValue = `scale(${
    1 / Math.pow(generationalScaleFactor, generation)
  })`
  transformationElements.forEach(element => {
    element.setAttribute("transform", `${translateValue} ${scaleValue}`);
  });

  // Rotate mattedPortaits and frame groups clockwise
  const groupAlignment = isCouple ? "left" : "center";
  transformationElements.forEach(element => {
    
    /* debuggin addition of generation condition; interior statement stays*/
    if (generation != 0){
      
      element.appendChild(svg.createAnimateTransform("rotate", 
        getRotationAttributes(groupAlignment, generation, true, 
          rotationDuration)));
    }
  });

  // Append mattedPortaits and frame groups to household group
  transformationElements.forEach(element => {
    householdGroup.appendChild(element);
  });

  return householdGroup;
}

/**createMat()
 * Create fill for any gap between portrait and frame
 * @param {String} alignment - Portrait placement: left, right, or center
 * @return {Element} - Circle or path element with radialGradient fill
 */
const createMat = (alignment) => {
  const shape = alignment === "center" ? svg.createCircle(portraitRadius) : 
    (alignment === "left" ? svg.createPath(pathCommands.leftLobe) : 
      svg.createPath(pathCommands.rightLobe));
  shape.setAttribute("fill", `url(#${alignment})`);
  return shape;
};

/**createPortrait()
 * Create portrait from croped image or of name, align and rotate
 * @param {Object} person - Name and metadata for image of person
 * @param {String} alignment - Portrait placement: left, right, or center
 * @param {Number} duration - Time for complete rotation, in minutes
 * @return {Element} - SVG element
 */
const createPortait = (person, alignment, duration, generation) => {
  /* debugging addition of generation */

  // Create portrait from image or of name
  const portrait = person.portrait ? svg.createImage(
    `${imagesPath}${person.portrait.id}.${person.portrait.extension}`, 
    person.portrait.x, 
    person.portrait.y, 
    person.portrait.width
  ) : svg.createText(person.name, ["hero__name"]);

  // Crop and align portrait, and rotate counter-clockwise
  portrait.setAttribute("clip-path", "url(#clip)");
  portrait.setAttribute(
    "transform", `translate(${getOffset(alignment, 0)}, 0)`
  );

  /* debugging if statement; interior block remains*/
  if (generation != 0)

    portrait.appendChild(svg.createAnimateTransform(
    "rotate", getRotationAttributes(alignment, 0, false, duration))
  );

  return portrait;
}

/**getHouseholds()
 * Calls recursive addHouseholds() function
 * @return {Array} Returns array modified by addHouseholds()
 */
const getHouseholds = () => {
  let generation = 0;
  let siblingCount = 0;
  let siblingIndex = null;
  let parent = null;
  let orbitalPeriod = null;
  const households = [];
  addHouseholds(family, generation, siblingCount, siblingIndex, parent, 
    orbitalPeriod, households);
  return households;
}

/**getMotions()
 * Get motions for child households to orbit parent frames, on a staggered 
 * basis if there are siblings
 * @param {Number} count - Number of siblings
 * @param {Number} index - Index of sibling
 * @param {String} pathId - Path to trace
 * @return {Array} - Motion elements
 */
function getMotions(duration, count, index, pathId) {
  const motions = [];
  // if (index > 0) {
  //   motions.push(svg.createAnimateMotion(
  //     getStaggeredStartAttributes(duration, index, count), 
  //     `${pathId}-path`
  // ));}
  motions.push(svg.createAnimateMotion(
    getSteadyStateAttributes(duration, index, count),
    `${pathId}-path`
  ));
  return motions;
}

/**getOffset()
 * Get value of offset from origin on the x-axis
 * @param {String} alignment - Portrait placement: left, right, or center
 * @param {Number} generation - Generation number
 * @return {Number} - Offset on x-axis
 */
const getOffset = (alignment, generation) => {
  return portraitOffset *
    (alignment === "center" ? 0 : (alignment === "left" ? -1 : 1)) /
      Math.pow(generationalScaleFactor, generation);
}

/**getRandomizedTime()
 * Introduce variation with randomized times within deviation of a declared mean
 * @param {Number} mean - Target time in minutes
 * @param {Number} deviation - Allowed deviation from target, in minutes
 * @return {Number} - Randomized time within the deviation of the target time
 */
const getRandomizeTime = (mean, deviation) => {
  return Math.random() * 2 * deviation + mean - deviation;
}

/**getRotationAttribues()
 * Get attributes for use as parameter in an animateTransform element
 * @param {String} alignment - Portrait placement: left, right, or center
 * @param {Number} generation - Generation number
 * @param {Boolean} isClockwise - Counterclockwise rotation if false
 * @param {Number} duration - Time for complete rotation, in minutes
 * @return {Object} - Attribute and value pairs for animateTransform element
 */
const getRotationAttributes = (alignment, generation, isClockwise, duration) => 
  {
  const offset = generation > 0 ? 2 * getOffset(alignment, generation) : 0;
  return {
    "from": `0 ${offset} 0`,
    "to": `${isClockwise ? 360 : -360} ${offset} 0`,
    "dur": `${duration * 60}s`,
    "additive": "sum",
    "repeatCount": "indefinite"
  };
}

/**getStaggeredStartAttributes()
 * Get attributes for use as parameter in animateMotion element
 * @param {Number} duration - Time to revolve around parent, in minutes
 * @param {Number} index - Index of sibling
 * @param {Number} total - Number of siblings
 * @return {Object} - Attribute and value pairs for animateMotion element
 */
const getStaggeredStartAttributes = (duration, index, total) => {
  return {
    "begin": "0s",
    "dur": `${(duration - duration * index / total) * 60}s`,
    "keyPoints": `${index / total};1`,
    "keyTimes": "0;1",
    "fill": "freeze",
    "additive": "sum"
  };
}

/**getSteadyStateAttributes()
 * Get attributes for use as parameter in animateMotion element
 * @param {Number} duration - Time to revolve around parent, in minutes
 * @param {Number} index - Index of sibling
 * @param {Number} total - Number of siblings
 * @return {Object} - Attribute and value pairs for animateMotion element
 */
const getSteadyStateAttributes = (duration, index, total) => {
  return {
    "begin": `${duration * 60 * index / total}s`,
    "dur": `${duration * 60}s`,
    "repeatCount": "indefinite",
    "fill": "freeze",
    "additive": "sum"
  };
}

/**updateAnimations()
 * Utility function to update motion to transforming motion paths
 * @param {NodeList} motionPaths - List of path elements to update animations for
 * @return {void} Modifies motion paths in place
 */
const updateAnimations = (motionPaths) => {
    
  motionPaths.forEach(motionPath => {
    const pathLength = motionPath.getTotalLength();
    const points = [];

    const transformationMatrix = motionPath.getCTM();
    const inverseMatrix = transformationMatrix.inverse();

    for (let i = 0; i <= pathLength; i += pathLength / 100) {
      const point = motionPath.getPointAtLength(i);
      const transformedPoint = point.matrixTransform(inverseMatrix);
      points.push(`${transformedPoint.x},${transformedPoint.y}`);
    }

    const pathCommands = `M${points.join("L")}`;

    const motionAnimations = document.querySelectorAll(
      `animateMotion[href="${motionPath.id}"]`
    );
    motionAnimations.forEach(animation => {
      const mpath = animation.querySelector("mpath");
      if (mpath) mpath.setAttribute("href", `#${motionPath.id}`);
      animation.setAttribute("path", pathCommands);
    });
  });
}

/**loadHero()
 * Loads SVG element to the DOM
 * @return {void} DOM modified
 */
export const loadHero = () => {

  // Crop portraits
  const clipPath = svg.createClipPath(svg.createCircle(portraitRadius));
  clipPath.setAttribute("id", "clip");

  // Clone stops, as gradients cannot share them
  const clonedStops = () => colorStops.map(
    stop => svg.createStop(stop.offset, stop.color)
  );

  // Set graidents by alignment
  const gradients = ["left", "right", "center"].map(alignment => {
    const gradient = svg.createRadialGradient(
      clonedStops(), gradientRadius, gradientCx[alignment]
    );
    gradient.setAttribute("id", alignment);
    return gradient;
  });

  // Initialize SVG
  const defs = svg.createDefs([clipPath, ...gradients]);
  const hero = svg.createSVG(defs, viewboxSize);

  // Generate child SVG elements
  const households = getHouseholds();

  // Append SVG Elements
  households.forEach(element => hero.appendChild(element));
  document.querySelector(".hero").appendChild(hero);

  // const framePaths = document.querySelectorAll("[id$='path']");
  // setInterval(() => {updateAnimations(framePaths);}, 100);
}

export default loadHero;
