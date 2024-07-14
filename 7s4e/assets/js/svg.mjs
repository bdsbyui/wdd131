/* wdd131/7s4e/assets/js/svg.js */

import getFamilyObject from "./utils.mjs";

/* IMPORTED OBJECT */
const family = getFamilyObject();

/* STRUCTURE VALUES */

// SVG parameters
const viewboxSize = 1000;
const viewboxMinimum = -viewboxSize / 2;

// Shapes
const controlPointMagnitude = 600;
const portraitOffset = 282;
const portraitRadius = 168;
const lobeWidth = portraitOffset + portraitRadius;

// Paths
const r = portraitRadius;
const lL = `-${controlPointMagnitude},${controlPointMagnitude}`;
const lR = `${controlPointMagnitude},${controlPointMagnitude}`;
const uL = `-${controlPointMagnitude},-${controlPointMagnitude}`;
const uR = `${controlPointMagnitude},-${controlPointMagnitude}`;
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
const stops = {
  "first": {"offset": portraitRadius / portraitOffset, "color": mainColor},
  "second": {"offset": 1, "color": accentColor}
};

// Shapes
const fill = "transparent";
const strokeWidth = "7";

// Text
const fontSize = "75px";
const textAnchor = "middle";
const alignmentBaseline = "middle";

/* ANIMATION VALUES */
const rotationDuration = "2m";
const revolutionDuration = "5m";
const generationScaleFactor = 3;

/* ELEMENTS */

// SVG namespace element of given type
const newElement = (type) => {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
};

// Circle element of given radius
const circleElement = (radius) => {
  const circle = newElement("circle");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", radius);
  return circle;
};

// Circular clip path element to crop portraits
const clipElement = () => {
  const clip = newElement("clipPath");
  clip.setAttribute("id", "crop");
  const frame = circleElement(portraitRadius);
  clip.appendChild(frame);
  return clip;
};

// Numerator divided by lobe width to center radial gradient
const xNumerator = (alignment) => {
  switch (alignment) {
    case "left":
      return portraitRadius;
    case "right":
      return portraitOffset;
    case "center":
      return 0.5 * lobeWidth;
  }
};

// Gradient's color stop element by order of sequence
const stopElement = (order) => {
  const stop = newElement("stop");
  stop.setAttribute("offset", stops[order].offset);
  stop.setAttribute("stop-color", stops[order].color);
  return stop;
};

// Radial gradient element with color stops and identified by alignment
const gradientElement = (alignment) => {
  const numerator = xNumerator(alignment);
  const gradient = newElement("radialGradient");
  gradient.setAttribute("id", alignment);
  gradient.setAttribute("cx", numerator / lobeWidth);
  gradient.setAttribute("cy", "0.5");
  gradient.setAttribute("r", portraitOffset / lobeWidth);
  gradient.appendChild(stopElement("first"));
  gradient.appendChild(stopElement("second"));
  return gradient;
};

// SVG definition block element
const defsElement = () => {
  const defs = newElement("defs");
  defs.appendChild(clipElement());
  defs.appendChild(gradientElement("left"));
  defs.appendChild(gradientElement("right"));
  defs.appendChild(gradientElement("center"));
  return defs;
};

// Parent SVG element
const svgElement = () => {
  const svg = newElement("svg");
  svg.setAttribute("width", viewboxSize);
  svg.setAttribute("height", viewboxSize);
  svg.setAttribute(
    "viewBox", 
    `${viewboxMinimum} ${viewboxMinimum} ${viewboxSize} ${viewboxSize}`
  );
  const defsBlock = defsElement();
  svg.appendChild(defsBlock);
  return svg;
};

// Animate Transform element to rotate elements, clockwise if true
const transformRotation = (clockwise, couple=false) => {
  const from = couple ? `0 -${portraitOffset} 0` : "0 0 0";
  const to = 
    clockwise ? (couple ? `360 -${portraitOffset} 0` : "360 0 0") : "-360 0 0";
  const rotation = newElement("animateTransform");
  rotation.setAttribute("attributeName", "transform");
  rotation.setAttribute("attributeType", "XML");
  rotation.setAttribute("type", "rotate");
  rotation.setAttribute("from", from);
  rotation.setAttribute("to", to);
  rotation.setAttribute("begin", "0s");
  rotation.setAttribute("dur", rotationDuration);
  rotation.setAttribute("repeatCount", "indefinite");
  return rotation;
};

// Image element with attributes of given object
const imageElement = (attributes) => {
  const image = newElement("image");
  image.setAttribute("id", attributes.id);
  image.setAttribute("x", attributes.x);
  image.setAttribute("y", attributes.y);
  image.setAttribute("width", attributes.width);
  image.setAttribute(
    "href", `${imagesPath}${attributes.id}.${attributes.extension}`
  );
  image.setAttribute("clip-path", "url(#crop)");
  image.appendChild(transformRotation(false));
  return image;
};

// Text element with name in given person object
const textElement = (person) => {
  const name = newElement("text");
  name.setAttribute("stroke", textColor);
  name.setAttribute("fill", textColor);
  name.setAttribute("font-size", fontSize);
  name.setAttribute("text-anchor", textAnchor);
  name.setAttribute("alignment-baseline", alignmentBaseline);
  name.textContent = person.name;
  name.appendChild(transformRotation(false));
  return name;
};

// Circle element to frame of portraits of single family members
const roundFrame = () => {
  const frame = circleElement(portraitRadius);
  frame.setAttribute("fill", fill);
  frame.setAttribute("stroke", accentColor);
  frame.setAttribute("stroke-width", strokeWidth);
  return frame;
};

// Path element to frame of portraits of married family members
const infinityFrame = () => {
  const frame = newElement("path");
  frame.setAttribute("d", paths.infinityLoop);
  frame.setAttribute("fill", fill);
  frame.setAttribute("stroke", accentColor);
  frame.setAttribute("stroke-width", strokeWidth);
  return frame;
};

// Path element to fill space between portraits and the Infinity Frame
const mat = (alignment) => {
  const filler = 
    alignment === "center" ? newElement("circle") : newElement("path");
  if (alignment != "center") filler.setAttribute(
    "d", alignment === "left" ? paths.leftLobe : paths.rightLobe
  );
  filler.setAttribute("fill", `url(#${alignment})`);
  return filler;
};

// Group element with given ID
const groupElement = (id) => {
  const group = newElement("g");
  group.setAttribute("id", id);
  return group;
};

// Internal path element
const path = (id, couple) => {
  const path = newElement("path");
  path.setAttribute("id", `${id}-path`);
  path.setAttribute("d", couple ? paths.roundLoop : paths.infinityLoop);
  return path;
}

// External path element
const mPath = (id) => {
  const path = newElement("mpath");
  path.setAttribute("href", `#${id}`)
  return path;
}

// Animate Transform element to rotate elements, clockwise if true
const revolution = (household) => {
  const orbit = mPath(`${household.parent}-path`);
  const revolution = newElement("animateMotion");
  revolution.setAttribute("href", `#${household.parent}`);
  revolution.setAttribute("begin", "0s");
  revolution.setAttribute("dur", revolutionDuration);
  revolution.setAttribute("repeatCount", "indefinite");
  revolution.appendChild(orbit);
  return revolution;
};

/* FUNCTIONS */

/**addElements()
 * Recursively add objects of SVG elements to arrays of portraits and households
 * @param {Object} family - Object with parents and children
 * @param {Number} generation - Generation of parents
 * @param {String} parent - Name of parent to which children are assigned
 * @param {Number} siblings - Number of sibling households
 * @param {Array} portraits - Objects of portrait elements and metadata
 * @param {Array} households - Objects of household elements and metadata
 * @return {void} Modified arrays are passed by reference
 */
function addElements(
  family, generation, parent, siblings, portraits, households
) {

  // Parent(s) for whom household elements is created
  const parents = family.parents;
  const couple = parents.length === 2;
  const household = groupElement(parents[0].name);

  parents.forEach((parent, index, array) => {
    
    // Portrait
    const sides = ["left", "right"]
    const alignment = couple ? sides[index] : "center";
    const portrait = 
      parent.portrait ? imageElement(parent.portrait) : textElement(parent);
    portraits.push({"alignment": alignment, "portraitElement": portrait});

    // Mat and Frame
    const fill = mat(alignment);
    household.appendChild(fill);
    household.appendChild(portrait);
    const frame = alignment === "center" ? roundFrame() : infinityFrame();
    // if (index === array.length - 1) household.appendChild(frame);
  });

  // Animation
  const tracePath = path(parents[0].name, couple);
  const clockwiseRotation = transformRotation(true, couple);
  // household.appendChild(tracePath);
  // household.appendChild(clockwiseRotation);
  

  households.push({
    "couple": couple, 
    "generation": generation, 
    "parent": parent, 
    "siblings": siblings,
    "householdElement": household
  });

  // Children for whom addElements() is called
  const children = family.children;
  siblings = children.length;
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
 * @return {Array} Returns arrays modified by addElements()
 */
function getElements(family, generation, parent, siblings) {
  const portraits = [];
  const households = [];
  addElements(family, generation, parent, siblings, portraits, households);
  return [portraits, households];
}

// forEach vs map
// multiple transforms overwrite each other
// createRotation called by createImage, createName, and createPath(below)
// "2m" corrected to "2s"

/**loadSVG()
 * Loads SVG element to the DOM
 */
export function loadSVG() {

  // Initialize SVG element
  const hero = svgElement();

  // Generate child elements
  const [portraits, households] = 
    getElements(family, 0, null, null);
  
  // Align portrait elements: left and right for couples, center for singles
  portraits.map(portrait => {
    let offset;
    switch (portrait.alignment) {
      case "center":
        offset = 0;
        break;
      case "left":
        offset = -portraitOffset;
        break;
      case "right":
        offset = portraitOffset;
    }
    portrait.portraitElement.setAttribute(
      "transform", `translate(${offset}, 0)`
    );
  });

  // Iterate through household elements
  households.map(household => {

    // Shift center of married children
    if (household.couple && household.generation > 0) {
      household.householdElement.setAttribute(
        "transform", `translate(-${portraitOffset}, 0)`
      );  
    }

    // Scale households by generation
    household.householdElement.setAttribute(
      "transform", 
      `scale(${1 / Math.pow(generationScaleFactor, household.generation)})`
    );

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


// // Internal path element
// const createPath = (person) => {
//   const path = createElement("path");
//   path.setAttribute("d", person.path.d);
//   path.setAttribute("fill", "none");
//   path.setAttribute("stroke", person.path.stroke);
//   path.setAttribute("stroke-width", strokeWidth);
//   path.appendChild(createRotation(false));
//   return path;
// };

// // Add elements recursively
// const addElements = (group, familyMembers) => {
//   familyMembers.forEach((member) => {
//     const memberGroup = createGroup(member.id);
//     const image = createImage(member.attributes);
//     const name = createName(member);
//     const path = createPath(member);
//     const mat = createMat(member.alignment);
//     const frame = member.alignment === "center" ? createRoundFrame() : createInfinityFrame();
    
//     memberGroup.appendChild(mat);
//     memberGroup.appendChild(frame);
//     memberGroup.appendChild(image);
//     memberGroup.appendChild(name);
//     memberGroup.appendChild(path);

//     group.appendChild(memberGroup);

//     if (member.children && member.children.length) {
//       addElements(memberGroup, member.children);
//     }
//   });
// };

// // Create the SVG and add elements
// const svg = createSvg();
// addElements(svg, family.members);

// // Append the SVG to the body
// document.body.appendChild(svg);