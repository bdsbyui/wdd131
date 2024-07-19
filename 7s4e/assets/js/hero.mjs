/* wdd131/7s4e/assets/js/hero.js */

import * as svg from "./svg.mjs";
import getFamilyObject from "./utils.mjs";

/* IMPORTED OBJECT */
const family = getFamilyObject();

/* STRUCTURE VALUES */

// SVG parameters
const viewboxSize = 1000;

// Shapes
const controlPointMagnitude = 600;
const portraitOffset = 282;
const portraitRadius = 168;
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
const textColor = styles.getPropertyValue("--light-color").trim();

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

// Shapes
const fill = "transparent";
const strokeWidth = "7";

// Text
const fontSize = "75px";

/* ANIMATION VALUES */
const generationalScaleFactor = 2;
const times = {
  "rotation": {"duration": 2, "deviation": 1},
  "revolution": {"duration": 4, "deviation": 1}
}

/* SVG ELEMENTS */

// Portrait frame for single family memembers
const roundFrame = svg.createShape(
  svg.createCircle(portraitRadius), fill, accentColor, strokeWidth
);

// Portrait frame for married family memembers
const infinityFrame = svg.createShape(
  svg.createPath(pathCommands.infinityLoop), fill, accentColor, strokeWidth
);

/* FUNCTIONS */

/**getRandomizedTime()
 * Introduce variation with randomized times within deviation of a declared mean
 * @param {Number} mean - Target time in minutes
 * @param {Number} deviation - Allowed deviation from target, in minutes
 * @return {Number} - Randomized time within the deviation of the target time
 */
const getRandomizeTime = (mean, deviation) => {
  return Math.random() * 2 * deviation + mean - deviation;
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

/**getRotationAttribues()
 * Get attributes for use as parameter in an animateTransform element
 * @param {String} alignment - Portrait placement: left, right, or center
 * @param {Number} generation - Generation number
 * @param {Boolean} isClockwise - Counterclockwise rotation if false
 * @param {Number} duration - Time for complete rotation, in minutes
 * @return {Object} - Attribute and value pairs for animateTransform element
 */
const getRotationAttributes = (
  alignment, generation, isClockwise, duration
) => {
  const offset = generation > 0 ? 2 * getOffset(alignment, generation) : 0;
  return {
    "from": `0 ${offset} 0`,
    "to": `${isClockwise ? 360 : -360} ${offset} 0`,
    "dur": `${duration * 60}s`,
    "additive": "sum",
    "repeatCount": "indefinite"
  };
}

/**createPortrait()
 * Create portrait from croped image or of name, align and rotate
 * @param {Object} person - Name and metadata for image of person
 * @param {String} alignment - Portrait placement: left, right, or center
 * @param {Number} duration - Time for complete rotation, in minutes
 * @return {Element} - SVG element
 */
const createPortait = (person, alignment, duration) => {

  // Create portrait from image or of name
  const portrait = person.portrait ? svg.createImage(
    `${imagesPath}${person.portrait.id}.${person.portrait.extension}`, 
    person.portrait.x, 
    person.portrait.y, 
    person.portrait.width
  ) : svg.createText(person.name, fontSize, textColor);

  // Crop and align portrait, and rotate counter-clockwise
  portrait.setAttribute("clip-path", "url(#clip)");
  portrait.setAttribute(
    "transform", `translate(${getOffset(alignment, 0)}, 0)`
  );
  portrait.appendChild(svg.createAnimateTransform(
    "rotate", getRotationAttributes(alignment, 0, false, duration))
  );

  return portrait;
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

/**getFrame()
 * Get a portrait frame: round for singles and an infinity shape for couples
 * @param {String} alignment - Portrait placement: left, right, or center
 * @param {String} id - ID of frame as reference for animateMotion elements
 * @return {Element} - The roundFrame or infinityFrame
 */
const getFrame = (alignment, id) => {
  const frame = alignment === "center" ? roundFrame.cloneNode(true) : 
    infinityFrame.cloneNode(true);
  frame.setAttribute("id", id);
  return frame;
};

/**createHouseholdGroup()
 * Create portrait from croped image or of name, align and rotate
 * @param {Array} parents - Array of person objects
 * @param {Boolean} isCouple - False if single
 * @param {Number} rotationDuration - Time for complete rotation, in minutes
 * @param {String} parentId - Parent name assigned to frame path
 * @return {Element} - Household group element
 */
const createHouseholdGroup = (parents, parentId, generation) => {

  // Initiate group and parameters
  const group = svg.createGroup();
  const isCouple = parents.length === 2;
  const rotationDuration = getRandomizeTime(
    times.rotation.duration, times.rotation.deviation
  );

  // Append elements to group
  parents.forEach((parent, index, array) => {
    
    // Set alignment and create portrait
    const portraitAlignment = isCouple ? ["left", "right"][index] : "center";
    const portrait = createPortait(parent, portraitAlignment, rotationDuration);
    
    // Add mat and portrait to the household element
    group.appendChild(createMat(portraitAlignment));
    group.appendChild(portrait);

    // The cloneNode method to create separate paths with unique IDs
    if (index === array.length - 1) {
      group.appendChild(getFrame(portraitAlignment, parentId));
    }
  });

  // Translate and scale group
  const translateValue = isCouple && generation > 0 ? 
    `translate(${getOffset("right", generation)}, 0)` : "";
  const scaleValue = `scale(${
    1 / Math.pow(generationalScaleFactor, generation)
  })`
  group.setAttribute("transform", `${translateValue} ${scaleValue}`);

  // Rotate group clockwise
  const groupAlignment = isCouple ? "left" : "center";
  group.appendChild(svg.createAnimateTransform("rotate", getRotationAttributes(
    groupAlignment, generation, true, rotationDuration))
  );

  return group;
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
    "begin": `0s`,
    "dur": `${duration * 60}s`,
    "repeatCount": "indefinite",
    "fill": "freeze",
    "additive": "sum"
  };
  // return {
  //   "begin": `${duration * 60 * index / total}s`,
  //   "dur": `${duration * 60}s`,
  //   "repeatCount": "indefinite",
  //   "fill": "freeze",
  //   "additive": "sum"
  // };
}

/**getMotions()
 * Get motions for child households to orbit parent frames, on a staggered 
 * basis if there are siblings
 * @param {Number} count - Number of siblings
 * @param {Number} index - Index of sibling
 * @param {String} pathId - Path to trace
 * @return {Array} - Motion elements
 */
function getMotions(count, index, pathId) {
  const motions = [];
  const revolutionDuration = getRandomizeTime(
    times.revolution.duration, times.revolution.deviation
  );
  // if (index > 0) {
  //   motions.push(svg.createAnimateMotion(
  //     getStaggeredStartAttributes(revolutionDuration, index, count),
  //     pathId
  //   ));
  // }
  motions.push(svg.createAnimateMotion(
    getSteadyStateAttributes(revolutionDuration, index, count),
    pathId
  ));
  return motions;
}

/**addElements()
 * Recursively add objects of SVG elements to arrays of portraits and households
 * @param {Object} family - Object with parents and children
 * @param {Object} attributes - Object tracking generation, siblings, and parent
 * @param {Array} elements - Array of household SVG elements
 * @return {void} Modified elements array is passed by reference
 */
const addElements = (
  family, generation, siblingCount, siblingIndex, parent, elements
) => {
  
  // Parent(s) for whose household the SVG group element is created
  const parents = family.parents;
  const parentId = parents[0].name.toLowerCase();
  const household = createHouseholdGroup(parents, parentId, generation);

  // Move household group along parent's frame
  if (siblingCount > 0) {
    const animations = getMotions(siblingCount, siblingIndex, parent);
    animations.forEach(animation => household.appendChild(animation));
  }

  // Retain SVG element
  elements.push(household);

  // Children for whom addElements() is called
  const children = family.children;
  if (children.length) {

    // New generation
    generation++;

    children.forEach((child, index) => {

      // Update household attributes
      siblingCount = children.length;
      siblingIndex = index;
      parent = parentId;

      // Recursive call
      addElements(child, generation, siblingCount, siblingIndex, parent, elements);
    })
  }
}

/**getElements()
 * Calls recursive addElements() function
 * @return {Array} Returns array modified by addElements()
 */
function getElements() {
  let generation = 0;
  let siblingCount = 0;
  let siblingIndex = null;
  let parent = null;
  const elements = [];
  addElements(family, generation, siblingCount, siblingIndex, parent, elements);
  return elements;
}

/**loadSVG()
 * Loads SVG element to the DOM
 */
export function loadSVG() {

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
  const householdElements = getElements();

  // Append SVG Elements
  householdElements.forEach(element => hero.appendChild(element));
  // hero.appendChild(householdElements[6]);
  // hero.appendChild(svg.createCircle(10));
  document.querySelector("#hero").appendChild(hero);
}

export default loadSVG;
