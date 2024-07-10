/* wdd131/7s4e/assets/js/svg.js */

import getFamilyObject from "./utils.mjs";

const familyObject = getFamilyObject();

// Colors
const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color");
const accentColor = styles.getPropertyValue("--dark-accent");
const className = "logos";


// Dimensions
const heroDimensions = {
  "viewboxSize": 1000,
  "portraitRadius": 168,
  "portraitOffset": 282,
  "controlPoints": {
    "lowerLeft": "-600 600",
    "upperLeft": "-600 -600",
    "lowerRight": "600 600",
    "upperRight": "600 -600"
  }
};
const size = heroDimensions.viewboxSize;
const minXY = -size / 2;
const radius = heroDimensions.portraitRadius;
const offset = heroDimensions.portraitOffset;
const wingspan = radius + offset;
const ll = heroDimensions.controlPoints.lowerLeft;
const ul = heroDimensions.controlPoints.upperLeft;
const lr = heroDimensions.controlPoints.lowerRight;
const ur = heroDimensions.controlPoints.upperRight;


// Elements
const newElement = (type) => {
  return document.createElementNS("http://www.w3.org/2000/svg", type)
};

const heroSVG = () => {

  // SVG Specifications
  const svg = newElement("svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `${minXY} ${minXY} ${size} ${size}`);

  // Clip Path and Gradient Block
  const defs = newElement("defs");
  const frameClip = newElement("clipPath");
  frameClip.setAttribute("id", "frame");
  const frameShape = newElement("circle");
  frameShape.setAttribute("cx", "0");
  frameShape.setAttribute("cy", "0");
  frameShape.setAttribute("r", radius);
  const leftRadialGradient = newElement("radialGradient");
  leftRadialGradient.setAttribute("id", "left-gradient");
  leftRadialGradient.setAttribute("cx", radius / wingspan);
  leftRadialGradient.setAttribute("cy", "0.5");
  leftRadialGradient.setAttribute("r", offset / wingspan);
  const rightRadialGradient = newElement("radialGradient");
  rightRadialGradient.setAttribute("id", "right-gradient");
  rightRadialGradient.setAttribute("cx", offset / wingspan);
  rightRadialGradient.setAttribute("cy", "0.5");
  rightRadialGradient.setAttribute("r", offset / wingspan);
  const stop1 = newElement("stop");
  stop1.setAttribute("offset", radius / offset);
  stop1.setAttribute("stop-color", mainColor);
  const stop2 = newElement("stop");
  stop2.setAttribute("offset", "1");
  stop2.setAttribute("stop-color", accentColor);

  // Object Assembly
  frameClip.appendChild(frameShape);
  leftRadialGradient.appendChild(stop1);
  leftRadialGradient.appendChild(stop2);
  rightRadialGradient.appendChild(stop1);
  rightRadialGradient.appendChild(stop2);
  defs.appendChild(frameClip);
  defs.appendChild(leftRadialGradient);
  defs.appendChild(rightRadialGradient);
  svg.appendChild(defs);

  return svg;
}

const portrait = (attributes) => {
  const id = attributes.id;
  const path = `assets/images/${id}.${attributes.extension}`;
  const image = newElement("image");
  image.setAttribute("id", id);
  image.setAttribute("x", attributes.x);
  image.setAttribute("y", attributes.y);
  image.setAttribute("width", attributes.width);
  image.setAttribute("href", path);
  image.setAttribute("clip-path", "url(#frame)");
  return image;
};

const roundFrame = () => {
  const circle = newElement('circle');
  circle.setAttribute("class", className);
  circle.setAttribute('cx', "0");
  circle.setAttribute('cy', "0");
  circle.setAttribute('r', radius);
  return circle;
}

const loopFrame = () => {
  const infinityLoop = newElement("path");
  infinityLoop.setAttribute("class", className);
  infinityLoop.setAttribute("d", `M 0 0 C ${ll}, ${ul}, 0 0 S ${ur}, 0 0`);
  return infinityLoop;
}

const mat = (isLeft) => {
  const d = isLeft ? `M 0 0 C ${ll}, ${ul}, 0 0` : `M 0 0 C ${lr}, ${ur}, 0 0`;
  const href = isLeft ? "url(#left-gradient)" : "url(#right-gradient)";
  const filler = newElement("path");
  filler.setAttribute("d", d);
  filler.setAttribute("fill", href);
  return filler;
}

// Recursive Function
function addElements(family, generation, parent, portraits, groups) {
  // Parents
  const parents = family.parents;
  const sides = Math.random() < 0.5 ? ["left", "right"] : ["right", "left"];
  const groupElement = newElement("g");
  parents.forEach((parent, index, array) => {
    const alignment = array.length === 1 ? "center" : sides[index];
    const imageElement = parent.portrait ? portrait(parent.portrait) : roundFrame();
    portraits.push({
      "generation": generation,
      "alignment": alignment,
      "portrait": imageElement
    });
    if (alignment === "center") {
      const circleElement = roundFrame();
      groupElement.appendChild(imageElement);
      groupElement.appendChild(circleElement);
    } else {
      const fillElement = mat(alignment === "left");
      groupElement.appendChild(fillElement);
      groupElement.appendChild(imageElement);
      if (index === 1) {
        const pathElement = loopFrame();
        groupElement.appendChild(pathElement);
      }
    }
  });
  groups.push({
    "generation": generation,
    "parent": parent,
    "group": groupElement
  });
  // Children
  const children = family.children;
  generation++;
  parent = parents[0].name;
  if (children.length) {
    children.forEach((child) => {
      addElements(child, generation, parent, portraits, groups);
    });
  }
}

// Wrapper Function
const svgElements = (family, generation, parent) => {
  const portraits = [];
  const groups = [];
  addElements(family, generation, parent, portraits, groups);
  return [portraits, groups];
}

export function loadHero() {
  const svg = heroSVG();
  const [portraits, groups] = svgElements(familyObject, 0, null);

  portraits.map(portrait => {
    let xTranslation;
    switch (portrait.alignment) {
      case "center":
        xTranslation = 0;
        break;
      case "left":
        xTranslation = -offset;
        break;
      case "right":
        xTranslation = offset;
    }
    portrait.portrait.setAttribute("transform", `translate(${xTranslation}, 0)`);
  })

  const test = groups.filter((group) => group.generation === 0);
  svg.appendChild(test[0].group);
  // console.log(JSON.stringify(familyObject, null, 2));
  document.querySelector("#hero").appendChild(svg);
  
  // const rotationDuration = 120000 // two minutes
  // const revolutionDuration = 300000 // five minutes
  // const start = performance.now();

  // function animateElements(timestamp) {
  //   const elapsed = timestamp - start;
  //   const rotationProgress = (elapsed % rotationDuration) / rotationDuration;
  //   const portraitRotation = -360 * rotationProgress;
  //   const loopRotation = 360 * rotationProgress;
  //   portrait.setAttribute(
  //     "transform", 
  //     `translate(-282, 0) rotate(${portraitRotation} 0 0)`
  //   );
  //   wingGroup.setAttribute("transform", `rotate(${loopRotation} 0 0)`);
  //   requestAnimationFrame(animateElements);
  // }
  // requestAnimationFrame(animateElements);

}

export default loadHero;