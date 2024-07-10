/* wdd131/7s4e/assets/js/svg.js */

import getFamilyObject from "./utils.mjs";

// Imported Object
const familyObject = getFamilyObject();

// Styles
const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color").trim();
const accentColor = styles.getPropertyValue("--dark-accent").trim();
const className = "logos";

// Specifications
const heroSpecs = {
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
const size = heroSpecs.viewboxSize;
const minXY = -size / 2;
const radius = heroSpecs.portraitRadius;
const offset = heroSpecs.portraitOffset;
const wingspan = radius + offset;
const stops = {
  "first": {
    "offset": radius / offset,
    "color": mainColor
  },
  "second": {
    "offset": 1,
    "color": accentColor
  }
};
const ll = heroSpecs.controlPoints.lowerLeft;
const ul = heroSpecs.controlPoints.upperLeft;
const lr = heroSpecs.controlPoints.lowerRight;
const ur = heroSpecs.controlPoints.upperRight;

// SVG Elements

//\ New Element Constructor
const newElement = (type) => {
  return document.createElementNS("http://www.w3.org/2000/svg", type)
};

//\ Color Stop
const stop = (order) => {
  const stop = newElement("stop");
  stop.setAttribute("offset", stops[order].offset);
  stop.setAttribute("stop-color", stops[order].color);
  return stop;
};

//\ Radial Gradient
const radialGradient = (side) => {
  const numerator = side === "left" ? radius : offset;
  const radialGradient = newElement("radialGradient");
  radialGradient.setAttribute("id", `${side}-gradient`);
  radialGradient.setAttribute("cx", numerator / wingspan);
  radialGradient.setAttribute("cy", "0.5");
  radialGradient.setAttribute("r", offset / wingspan);

  //\/ Adding stops to the gradient
  const firstStop = stop("first");
  const secondStop = stop("second");
  radialGradient.appendChild(firstStop);
  radialGradient.appendChild(secondStop);

  return radialGradient;
}


//\ Main Container SVG
const heroSVG = () => {

  //\/ SVG Setup
  const svg = newElement("svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `${minXY} ${minXY} ${size} ${size}`);

  //\/ Clip Path and Gradient Blocks
  const defs = newElement("defs");
  
  //\/\ Portrait Frame
  const frameClip = newElement("clipPath");
  frameClip.setAttribute("id", "frame");

  const frameShape = newElement("circle");
  frameShape.setAttribute("cx", "0");
  frameShape.setAttribute("cy", "0");
  frameShape.setAttribute("r", radius);

  //\/\ Gradients
  const leftRadialGradient = radialGradient("left");
  const rightRadialGradient = radialGradient("right");

  //\/ Object Assembly
  frameClip.appendChild(frameShape);
  defs.appendChild(frameClip);
  defs.appendChild(leftRadialGradient);
  defs.appendChild(rightRadialGradient);
  svg.appendChild(defs);

  return svg;
}

// Portrait Element
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

// Frame Element for Individual
const roundFrame = () => {
  const circle = newElement('circle');
  circle.setAttribute("class", className);
  circle.setAttribute('cx', "0");
  circle.setAttribute('cy', "0");
  circle.setAttribute('r', radius);
  return circle;
}

// Frame Element for Couple
const loopFrame = () => {
  const infinityLoop = newElement("path");
  infinityLoop.setAttribute("class", className);
  infinityLoop.setAttribute("d", `M 0 0 C ${ll}, ${ul}, 0 0 S ${ur}, 0 0`);
  return infinityLoop;
}

// Background Filler for Loop Frame
const mat = (alignment) => {
  const isLeft = alignment === "left";
  const d = isLeft ? `M 0 0 C ${ll}, ${ul}, 0 0` : `M 0 0 C ${lr}, ${ur}, 0 0`;
  const href = `url(#${alignment}-gradient)`;
  const filler = newElement("path");
  filler.setAttribute("d", d);
  filler.setAttribute("fill", href);
  return filler;
}

// Recursive Function
function addElements(family, generation, parent, portraits, groups) {

  //\ Parents
  const parents = family.parents;
  
  //\/ Pick Sides and Create Group Element
  const sides = Math.random() < 0.5 ? ["left", "right"] : ["right", "left"];
  const groupElement = newElement("g");

  //\/ Add Portrait
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
      const fillElement = mat(alignment);
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
