// Corrected code with explanations

import getFamilyObject from "./utils.mjs";

// Imported object
const family = getFamilyObject();

// Structure values
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
  roundLoop: `M ${r} 1 A ${r} ${r} ${r} 1 1 ${r} -1 Z`,
  infinityLoop: `M 0,0 C ${lL} ${uL} 0,0 S ${uR} 0,0`,
  leftLobe: `M 0,0 C ${lL} ${uL} 0,0`,
  rightLobe: `M 0,0 C ${lR} ${uR} 0,0`
};
const imagesPath = "assets/images/";

// Style values
// Colors
const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color").trim();
const accentColor = styles.getPropertyValue("--dark-accent").trim();
const textColor = styles.getPropertyValue("--light-color").trim();
const stops = {
  first: { offset: portraitRadius / portraitOffset, color: mainColor },
  second: { offset: 1, color: accentColor }
};

// Shapes
const fill = "transparent";
const strokeWidth = "7";

// Text
const fontSize = "75px";
const textAnchor = "middle";
const alignmentBaseline = "middle";

// Animation values
const rotationDuration = "2s";
const revolutionDuration = "5s";
const generationScaleFactor = 3;

// Elements
// SVG namespace element of given type
const createElement = (type) => {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
};

// Circle element of given radius
const createCircle = (radius) => {
  const circle = createElement("circle");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", radius);
  return circle;
};

// Circular clip path element to crop portraits
const createClipPath = () => {
  const clipPath = createElement("clipPath");
  clipPath.setAttribute("id", "crop");
  const frame = createCircle(portraitRadius);
  clipPath.appendChild(frame);
  return clipPath;
};

// Numerator divided by lobe width to center radial gradient
const getXNumerator = (alignment) => {
  switch (alignment) {
    case "left":
      return portraitRadius;
    case "right":
      return portraitOffset;
    case "center":
      return 0.5 * lobeWidth;
    default:
      return 0;
  }
};

// Gradient's color stop element by order of sequence
const createStop = (order) => {
  const stopElement = createElement("stop");
  stopElement.setAttribute("offset", stops[order].offset);
  stopElement.setAttribute("stop-color", stops[order].color);
  return stopElement;
};

// Radial gradient element with color stops and identified by alignment
const createGradient = (alignment) => {
  const numerator = getXNumerator(alignment);
  const gradient = createElement("radialGradient");
  gradient.setAttribute("id", alignment);
  gradient.setAttribute("cx", numerator / lobeWidth);
  gradient.setAttribute("cy", "0.5");
  gradient.setAttribute("r", portraitOffset / lobeWidth);
  gradient.appendChild(createStop("first"));
  gradient.appendChild(createStop("second"));
  return gradient;
};

// SVG definition block element
const createDefs = () => {
  const defs = createElement("defs");
  defs.appendChild(createClipPath());
  defs.appendChild(createGradient("left"));
  defs.appendChild(createGradient("right"));
  defs.appendChild(createGradient("center"));
  return defs;
};

// Parent SVG element
const createSvg = () => {
  const svg = createElement("svg");
  svg.setAttribute("width", viewboxSize);
  svg.setAttribute("height", viewboxSize);
  svg.setAttribute(
    "viewBox",
    `${viewboxMinimum} ${viewboxMinimum} ${viewboxSize} ${viewboxSize}`
  );
  svg.appendChild(createDefs());
  return svg;
};

// Animate Transform element to rotate elements, clockwise if true
const createRotation = (clockwise, couple = false) => {
  const from = couple ? `0 -${portraitOffset} 0` : "0 0 0";
  const to = clockwise ? (couple ? `360 -${portraitOffset} 0` : "360 0 0") : "-360 0 0";
  const rotation = createElement("animateTransform");
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
const createImage = (attributes) => {
  const imageElement = createElement("image");
  imageElement.setAttribute("id", attributes.id);
  imageElement.setAttribute("x", attributes.x);
  imageElement.setAttribute("y", attributes.y);
  imageElement.setAttribute("width", attributes.width);
  imageElement.setAttribute("href", `${imagesPath}${attributes.id}.${attributes.extension}`);
  imageElement.setAttribute("clip-path", "url(#crop)");
  imageElement.appendChild(createRotation(false));
  return imageElement;
};

// Text element with name in given person object
const createName = (person) => {
  const nameElement = createElement("text");
  nameElement.setAttribute("stroke", textColor);
  nameElement.setAttribute("fill", textColor);
  nameElement.setAttribute("font-size", fontSize);
  nameElement.setAttribute("text-anchor", textAnchor);
  nameElement.setAttribute("alignment-baseline", alignmentBaseline);
  nameElement.textContent = person.name;
  nameElement.appendChild(createRotation(false));
  return nameElement;
};

// Circle element to frame of portraits of single family members
const createRoundFrame = () => {
  const frame = createCircle(portraitRadius);
  frame.setAttribute("fill", fill);
  frame.setAttribute("stroke", accentColor);
  frame.setAttribute("stroke-width", strokeWidth);
  return frame;
};

// Path element to frame of portraits of married family members
const createInfinityFrame = () => {
  const frame = createElement("path");
  frame.setAttribute("d", paths.infinityLoop);
  frame.setAttribute("fill", fill);
  frame.setAttribute("stroke", accentColor);
  frame.setAttribute("stroke-width", strokeWidth);
  return frame;
};

// Path element to fill space between portraits and the Infinity Frame
const createMat = (alignment) => {
  const mat = alignment === "center" ? createElement("circle") : createElement("path");
  if (alignment !== "center") {
    mat.setAttribute("d", alignment === "left" ? paths.leftLobe : paths.rightLobe);
  }
  mat.setAttribute("fill", `url(#${alignment})`);
  return mat;
};

// Group element with given ID
const createGroup = (id) => {
  const group = createElement("g");
  group.setAttribute("id", id);
  return group;
};

// Internal path element
const createPath = (person) => {
  const path = createElement("path");
  path.setAttribute("d", person.path.d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", person.path.stroke);
  path.setAttribute("stroke-width", strokeWidth);
  path.appendChild(createRotation(false));
  return path;
};

// Add elements recursively
const addElements = (group, familyMembers) => {
  familyMembers.forEach((member) => {
    const memberGroup = createGroup(member.id);
    const image = createImage(member.attributes);
    const name = createName(member);
    const path = createPath(member);
    const mat = createMat(member.alignment);
    const frame = member.alignment === "center" ? createRoundFrame() : createInfinityFrame();
    
    memberGroup.appendChild(mat);
    memberGroup.appendChild(frame);
    memberGroup.appendChild(image);
    memberGroup.appendChild(name);
    memberGroup.appendChild(path);

    group.appendChild(memberGroup);

    if (member.children && member.children.length) {
      addElements(memberGroup, member.children);
    }
  });
};

export function loadSVG() {

  // Create the SVG and add elements
  const svg = createSvg();
  console.log(family.parents);
  addElements(svg, family.parents);
  
  // Append the SVG to the body
  // document.body.appendChild(svg);
  document.querySelector("#hero").appendChild(svg);

}

export default loadSVG;