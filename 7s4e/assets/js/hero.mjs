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
const r = portraitRadius;
const lL = `-${controlPointMagnitude},${controlPointMagnitude}`;  // lower left
const lR = `${controlPointMagnitude},${controlPointMagnitude}`;   // lower right
const uL = `-${controlPointMagnitude},-${controlPointMagnitude}`; // upper left
const uR = `${controlPointMagnitude},-${controlPointMagnitude}`;  // upper right
const paths = {
  "roundLoop": `M ${r} 1 A ${r} ${r} ${r} 1 1 ${r} -1 Z`,
  "infinityLoop": `M 0,0 C ${lL} ${uL} 0,0 S ${uR} 0,0`,
  "leftLobe": `M 0,0 C ${lL} ${uL} 0,0`,
  "rightLobe": `M 0,0 C ${lR} ${uR} 0,0`
};
const imagesPath = "assets/images/";

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
const rotationAttributes = (clockwise) => {
  return {
    "from": "0 0 0",
    "to": `${clockwise ? "360 0 0" : "-360 0 0"}`,
    "dur": "2m",
    "repeatCount": "indefinite"
  };
}
const rolutionAttributes = (siblings) => {
  return {
    "from": "0 0 0",
    "to": `${siblings ? "360 0 0" : "-360 0 0"}`,
    "dur": "2m",
    "repeatCount": "indefinite"
  };
}
const revolutionDuration = "5m";
const generationScaleFactor = 3;


/* SVG ELEMENTS */

const roundFrame = svg.createShape(
  svg.createCircle(portraitRadius), fill, accentColor, strokeWidth
);

const infinityFrame = svg.createShape(
  svg.createPath(paths.infinityLoop), fill, accentColor, strokeWidth
);

const mat = (alignment) => {
  const shape = alignment === "center" ? 
    svg.createCircle(portraitRadius) : (alignment === "left" ?
      svg.createPath(paths.leftLobe) : svg.createPath(paths.rightLobe)
    );
  shape.setAttribute("fill", `url(#${alignment})`);
  return shape;
};

/* FUNCTIONS */

/**addElements()
 * Recursively add objects of SVG elements to arrays of portraits and households
 * @param {Object} family - Object with parents and children
 * @param {Number} generation - Generation of parents
 * @param {String} parent - Name of parent to which children are assigned
 * @param {Number} siblings - Number of sibling households
 * @param {Array} households - Objects of household elements and metadata
 * @return {void} Modified arrays are passed by reference
 */
function addElements(family, generation, parent, siblings, households) {

  // Parent(s) for whom household elements is created
  const parents = family.parents;
  const couple = parents.length === 2;
  const household = svg.createGroup();
  household.setAttribute("id", parents[0].name);

  parents.forEach((parent, index, array) => {
    
    // Portrait
    const alignment = couple ? ["left", "right"][index] : "center";
    const pp = parent.portrait;
    const portrait = pp ? svg.createImage(
      `${imagesPath}${pp.id}.${pp.extension}`, pp.x, pp.y, pp.width
    ) : svg.createText(parent.name, fontSize, textColor);
    portrait.setAttribute("clip-path", "url(#clip})");
    portrait.setAttribute("transform", `translate(${portraitOffset * (
      alignment === "center" ? 0 : (alignment === "left" ? -1 : 1)
    )}, 0)`);
    portrait.appendChild(
      svg.createAnimateTransform("rotate", rotationAttributes(false))
    );


    // Mat and Frame
    household.appendChild(mat(alignment));
    household.appendChild(portrait);
    if (index === array.length - 1) {
      household.appendChild(
        alignment === "center" ? roundFrame : infinityFrame
      );
    }
  });
  
  household.setAttribute("transform", `${
    couple && generation > 0 ? `translate(-${portraitOffset}, 0)` : ''
  } ${
    `scale(${1 / Math.pow(generationScaleFactor, generation)})`
  }`);
  household.appendChild(
    svg.createAnimateTransform("rotate", rotationAttributes(true))
  );

const animations = siblings ? [] : [];


// <animateMotion
// href="#t"
// begin="0s"
// dur="54s"
// keyPoints="0.1;1"
// keyTimes="0;1"
// fill="freeze"
// >
// <mpath href="#child-path"/>
// </animateMotion>
// <animateMotion
// href="#t"
// begin="54s"
// dur="60s"
// repeatCount="indefinite"
// >
// <mpath href="#child-path"/>
// </animateMotion>


  households.push({
    "couple": couple, 
    "generation": generation, 
    "parent": parent, 
    "siblings": siblings,
    "groupElement": household
  });

  // Children for whom addElements() is called
  const children = family.children;
  if (children.length) {
    let indexes;
    
    siblings = {
      "total": children.length,

    }
  }
  // siblings = children.length;
  parent = parents[0].name;
  generation++;
  if (siblings) {children.forEach((child) => {
    addElements(child, generation, parent, siblings, portraits, households);
  })}
}

/**getElements()
 * Calls recursive addElements() function
 * @param {Object} family - Object for family
 * @param {Number} generation - Generation of parents
 * @param {String} parent - Name of parent to which children are assigned
 * @param {Number} siblings - Number of household's siblings
 * @return {Array} Returns array modified by addElements()
 */
function getElements(family, generation, parent, siblings) {
  const households = [];
  addElements(family, generation, parent, siblings, households);
  return households;
}

/**loadSVG()
 * Loads SVG element to the DOM
 */
export function loadSVG() {

  // Initialize SVG
  const clipPath = svg.createClipPath(svg.createCircle(portraitRadius));
  clipPath.setAttribute("id", "clip");

  const stops = colorStops.forEach(stop => {
    return svg.createStop(stop.offset, stop.color);
  });

  const gradients = ["left", "right", "center"].forEach(alignment => {
    const gradient = svg.createRadialGradient(
      stops, gradientRadius, gradientCx(alignment)
    );
    gradient.setAttribute("id", alignment);
    return gradient;
  });
  
  const defs = svg.createDefs([...[clipPath], ...gradients]);
  const hero = svg.createSVG(defs, viewboxSize);  

  // Generate child elements
  const households = getElements(family, 0, null, null);
  

  // Iterate through household elements
  households.map(household => {

    // Add animation
    if (household.siblings) {
      const parentOrbit = revolution(household);
      household.householdElement.appendChild(parentOrbit);
    }

    // Add to SVG
    // hero.appendChild(household.householdElement);
  });

  const testLog = portraits[0].portraitElement;
  console.log(testLog);

  const testShow = households[0].householdElement;
  hero.appendChild(testShow);

  document.querySelector("#hero").appendChild(hero);
}

export default loadSVG;
