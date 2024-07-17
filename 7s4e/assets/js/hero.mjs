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
const lobeWidth = portraitOffset + portraitRadius;

// Paths
const imagesPath = "assets/images/";
const r = portraitRadius;
const lL = `-${controlPointMagnitude},${controlPointMagnitude}`;  // lower left
const lR = `${controlPointMagnitude},${controlPointMagnitude}`;   // lower right
const uL = `-${controlPointMagnitude},-${controlPointMagnitude}`; // upper left
const uR = `${controlPointMagnitude},-${controlPointMagnitude}`;  // upper right
const paths = {
  "infinityLoop": `M 0,0 C ${lL} ${uL} 0,0 S ${uR} 0,0`,
  "leftLobe": `M 0,0 C ${lL} ${uL} 0,0`,
  "rightLobe": `M 0,0 C ${lR} ${uR} 0,0`
};

/* STYLE VALUES */

// Colors
const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color").trim();
const accentColor = styles.getPropertyValue("--dark-accent").trim();
const textColor = styles.getPropertyValue("--light-color").trim();

// Gradients
const gradientRadius = portraitOffset / lobeWidth;
const colorStops = [
  {"offset": portraitRadius / portraitOffset, "color": mainColor},
  {"offset": 1, "color": accentColor}
];
const gradientCx = (alignment) => {
  switch (alignment) {
    case "left":
      return portraitRadius / lobeWidth;
    case "right":
      return portraitOffset / lobeWidth;
    case "center":
      return 0.5;
  }
}

// Shapes
const fill = "transparent";
const strokeWidth = "7";

// Text
const fontSize = "75px";

/* ANIMATION VALUES */
const generationScaleFactor = 3;
const rotationDuration = 2;   // minutes
const revolutionDuration = 5; // minutes
const rotationAttributes = (clockwise) => {
  return {
    "from": "0 0 0",
    "to": `${clockwise ? "360 0 0" : "-360 0 0"}`,
    "dur": `${rotationDuration * 60}s`,
    "repeatCount": "indefinite"
  };
}
const revolutionAttributesStaggeredStart = (total, index) => {
  return {
    "begin": "0s",
    "dur": `${revolutionDuration - revolutionDuration * 60 * index / total}s`,
    "keyPoints": `${index / total};1`,
    "keyTimes": "0;1",
    "fill": "freeze",
    "additive": "sum"
  };
}
const revolutionAttributesSteadyState = (total, index) => {
  return {
    "begin": `${revolutionDuration * 60 * index / total}s`,
    "dur": `${revolutionDuration * 60}s`,
    "repeatCount": "indefinite",
    "fill": "freeze",
    "additive": "sum"
  };
}


/* SVG ELEMENTS */

// Portrait frame for single family memembers
const roundFrame = svg.createShape(
  svg.createCircle(portraitRadius), fill, accentColor, strokeWidth
);

// Portrait frame for married family memembers
const infinityFrame = svg.createShape(
  svg.createPath(paths.infinityLoop), fill, accentColor, strokeWidth
);

// Background filler for any gap between portrait and frame
const mat = (alignment) => {
  const shape = alignment === "center" ? 
    svg.createCircle(portraitRadius) : (alignment === "left" ?
      svg.createPath(paths.leftLobe) : svg.createPath(paths.rightLobe)
    );
  shape.setAttribute("fill", `url(#${alignment})`);
  return shape;
};

/* FUNCTIONS */

/**createPortrait()
 * Create portrait from croped image or of name, align and rotate
 * @param {Object} person - metadata for image of person
 * @param {String} alignment - left, right, or center
 * @return {Element} - SVG element
 */
function createPortait(person, alignment) {

  // Create portrait from image or of name
  const portrait = person.portrait ? svg.createImage(
    `${imagesPath}${person.portrait.id}.${person.portrait.extension}`, 
    person.portrait.x, 
    person.portrait.y, 
    person.portrait.width
  ) : svg.createText(person.name, fontSize, textColor);

  // Crop and align portrait, and rotate counter-clockwise
  portrait.setAttribute("clip-path", "url(#clip})");
  portrait.setAttribute("transform", `translate(${portraitOffset * (
    alignment === "center" ? 0 : (alignment === "left" ? -1 : 1)
  )}, 0)`);
  portrait.appendChild(
    svg.createAnimateTransform("rotate", rotationAttributes(false))
  );

  return portrait;
}

/**buildHouseholdGroup()
 * Create portrait from croped image or of name, align and rotate
 * @param {Array} parents - Array of person objects
 * @param {Boolean} isCouple - False of single
 * @param {String} parentId - Parent name assigned to frame path
 * @param {Element} svgElement - Household group
 * @return {void} - Household group element passed by reference
 */
function buildHouseholdGroup(parents, isCouple, parentId, svgElement) {
  parents.forEach((parent, index, array) => {
    
    // Set alignment and create portrait
    const alignment = isCouple ? ["left", "right"][index] : "center";
    const portrait = createPortait(parent, alignment);
    
    // Add mat, portrait, and frame to household group
    svgElement.appendChild(mat(alignment));
    svgElement.appendChild(portrait);
    if (index === array.length - 1) {
      const frame = alignment === "center" ? roundFrame : infinityFrame;
      frame.setAttribute("id", parentId);
      svgElement.appendChild(frame);
    }
  });
}

/**getMotions()
 * Get motions for child households to orbit parent frames, on a staggered 
 * basis if there are siblings
 * @param {Object} household - Object tracking siblings and parent
 * @return {Array} - Motion elements
 */
function getMotions(household) {
  const motions = [];
  if (household.siblingIndex > 0) {
    motions.push(svg.createAnimateMotion(
      revolutionAttributesStaggeredStart(
        household.siblingCount, 
        household.siblingIndex
      ),
      household.parent
    ));
  }
  motions.push(svg.createAnimateMotion(
    revolutionAttributesSteadyState(
      household.siblingCount, 
      household.siblingIndex
    ),
    household.parent
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
function addElements(family, attributes, elements) {

  // Parent(s) for whose household the SVG group element is created
  const parents = family.parents;
  const isCouple = parents.length === 2;
  const parentId = parents[0].name.toLowerCase();

  // Create SVG element for the parents' household
  const svgElement = svg.createGroup();
  buildHouseholdGroup(parents, isCouple, parentId, svgElement);

  // Realign married household group and scale by generation
  svgElement.setAttribute(
    "transform", 
    `${isCouple && attributes.generation > 0 ? `translate(-${portraitOffset
      }, 0)` : ''} ${`scale(${1 / Math.pow(generationScaleFactor, 
        attributes.generation)})`}`
  );

  // Rotate household group clockwise
  svgElement.appendChild(
    svg.createAnimateTransform("rotate", rotationAttributes(true))
  );

  // Move household group along parent's frame
  if (attributes.siblingCount > 0) {
    const animations = getMotions(attributes);
    animations.forEach(animation => svgElement.appendChild(animation));
  }

  // Retain SVG element
  elements.push(svgElement);

  // Children for whom addElements() is called
  const children = family.children;
  if (children.length) {

    // Update household attributes
    attributes.generation++;
    attributes.siblingCount = children.length;
    attributes.parent = parentId;

    // Recursive call on each child
    children.forEach((child, index) => {
      attributes.siblingIndex = index;
      addElements(child, attributes, elements);
    })
  }
}

/**getElements()
 * Calls recursive addElements() function
 * @param {Object} family - Object for family
 * @param {Object} attributes - Object tracking generation, siblings, and parent
 * @return {Array} Returns array modified by addElements()
 */
function getElements(family, attributes) {
  const elements = [];
  addElements(family, attributes, elements);
  return elements;
}

/**loadSVG()
 * Loads SVG element to the DOM
 */
export function loadSVG() {

  // Initialize SVG
  const clipPath = svg.createClipPath(svg.createCircle(portraitRadius));
  clipPath.setAttribute("id", "clip");

  const stops = colorStops.map(stop => svg.createStop(stop.offset, stop.color));

  const gradients = ["left", "right", "center"].map(alignment => {
    const gradient = svg.createRadialGradient(
      stops, gradientRadius, gradientCx(alignment)
    );
    gradient.setAttribute("id", alignment);
    return gradient;
  });
  
  const defs = svg.createDefs([...[clipPath], ...gradients]);
  const hero = svg.createSVG(defs, viewboxSize);  

  // Generate child SVG elements
  const householdAttributes = {
    "generation": 0,
    "siblingCount": 0,
    "siblingIndex": null,
    "parent": null
  };
  const householdElements = getElements(family, householdAttributes);

  // Append SVG Elements
  householdElements.forEach(element => hero.appendChild(element));
  document.querySelector("#hero").appendChild(hero);
}

export default loadSVG;
