/* wdd131/7s4e/assets/js/svg.js */

import getFamilyObject from "./utils.mjs";

// Imported Object
const family = getFamilyObject();

// Structure
const controlPointMagnitude = 600;
const portraitOffset = 282;
const portraitRadius = 168;
const viewboxSize = 1000;
const viewboxMinimum = -viewboxSize / 2;
const lobeWidth = portraitOffset + portraitRadius;
const lowerLeft = `-${controlPointMagnitude},${controlPointMagnitude}`;
const lowerRight = `${controlPointMagnitude},${controlPointMagnitude}`;
const upperLeft = `-${controlPointMagnitude},-${controlPointMagnitude}`;
const upperRight = `${controlPointMagnitude},-${controlPointMagnitude}`;
const paths = {
  "infinityLoop": `M 0,0 C ${lowerLeft} ${upperLeft} 0,0 S ${upperRight} 0,0`,
  "leftLobe": `M 0,0 C ${lowerLeft} ${upperLeft} 0,0`,
  "rightLobe": `M 0,0 C ${lowerRight} ${upperRight} 0,0`
};

// Style
const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color").trim();
const accentColor = styles.getPropertyValue("--dark-accent").trim();
const textColor = styles.getPropertyValue("--light-color").trim();
const stops = {
  "first": {"offset": portraitRadius / portraitOffset, "color": mainColor},
  "second": {"offset": 1, "color": accentColor}
};

// Elements
const element = (type) => {
  return document.createElementNS("http://www.w3.org/2000/svg", type)
};

const circle = (radius) => {
  const circle = element("circle");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", radius);
  return circle;
};

const clip = (id) => {
  const clip = element("clipPath");
  clip.setAttribute("id", id);
  const frame = circle(portraitRadius);
  clip.appendChild(frame);
  return clip;
};

const xFactor = (alignment) => {
  let xFactor;
  switch (alignment) {
    case "left":
      xFactor = portraitRadius;
      break;
    case "right":
      xFactor = portraitOffset;
      break;
    case "center":
      xFactor = 0.5 * lobeWidth;
      break;
  }
  return xFactor;
};

const stop = (order) => {
  const stop = element("stop");
  stop.setAttribute("offset", stops[order].offset);
  stop.setAttribute("stop-color", stops[order].color);
  return stop;
};

const gradient = (alignment) => {
  const numerator = xFactor(alignment);
  const gradient = element("radialGradient");
  gradient.setAttribute("id", alignment);
  gradient.setAttribute("cx", numerator / lobeWidth);
  gradient.setAttribute("cy", "0.5");
  gradient.setAttribute("r", portraitOffset / lobeWidth);
  const stop1 = stop("first");
  const stop2 = stop("second");
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  return gradient;
};

const defs = () => {
  const defs = element("defs");
  const portraitFrame = clip("frame");
  const leftGradient = gradient("left");
  const rightGradient = gradient("right");
  const centerGradient = gradient("center");
  defs.appendChild(portraitFrame);
  defs.appendChild(leftGradient);
  defs.appendChild(rightGradient);
  defs.appendChild(centerGradient);
  return defs;
};

const svg = () => {
  const svg = element("svg");
  svg.setAttribute("width", viewboxSize);
  svg.setAttribute("height", viewboxSize);
  svg.setAttribute(
    "viewBox", 
    `${viewboxMinimum} ${viewboxMinimum} ${viewboxSize} ${viewboxSize}`
  );
  const defsBlock = defs();
  svg.appendChild(defsBlock);
  return svg;
};

const image = (attributes) => {
  const id = attributes.id;
  const path = `assets/images/${id}.${attributes.extension}`;
  const image = element("image");
  image.setAttribute("id", id);
  image.setAttribute("x", attributes.x);
  image.setAttribute("y", attributes.y);
  image.setAttribute("width", attributes.width);
  image.setAttribute("href", path);
  image.setAttribute("clip-path", "url(#frame)");
  return image;
};

const name = (person) => {
  const name = element("text");
  name.setAttribute("stroke", textColor);
  name.setAttribute("fill", textColor);
  name.setAttribute("font-size", "75px");
  name.setAttribute("text-anchor", "middle");
  name.setAttribute("alignment-baseline", "middle");
  name.textContent = person.name;
  return name;
};

const roundFrame = () => {
  const roundFrame = circle(portraitRadius);
  roundFrame.setAttribute("fill", "transparent");
  roundFrame.setAttribute("stroke", accentColor);
  roundFrame.setAttribute("stroke-width", "7");
  return roundFrame;
};

const infinityFrame = () => {
  const infinityFrame = element("path");
  infinityFrame.setAttribute("d", paths.infinityLoop);
  infinityFrame.setAttribute("fill", "transparent");
  infinityFrame.setAttribute("stroke", accentColor);
  infinityFrame.setAttribute("stroke-width", "7");
  return infinityFrame;
};

const mat = (alignment) => {
  const d = alignment === "left" ? paths.leftLobe : paths.rightLobe;
  const mat = element("path");
  mat.setAttribute("d", d);
  mat.setAttribute("fill", `url(#${alignment})`);
  return mat;
};

// Functions
function addElements(family, generation, parent, portraits, households) {

  // Parents
  const sides = Math.random() < 0.5 ? ["left", "right"] : ["right", "left"];
  const household = element("g");
  const parents = family.parents;
  parents.forEach((parent, index, array) => {

    // Portrait
    const alignment = array.length === 1 ? "center" : sides[index];
    const portrait = parent.portrait ? image(parent.portrait) : name(parent);
    portraits.push(
      {"generation": generation, "alignment": alignment, "portrait": portrait}
    );

    // Mat and Frame
    if (alignment === "center") {
      const soloFrame = roundFrame();
      household.appendChild(portrait);
      household.appendChild(soloFrame);
    }
    else {
      const fill = mat(alignment);
      household.appendChild(fill);
      household.appendChild(portrait);
      if (index === 1) {
        const coupleFrame = infinityFrame();
        household.appendChild(coupleFrame);
      }
    }
  });

  households.push(
    {"generation": generation, "parent": parent, "household": household}
  );

  // Children
  generation++;
  parent = parents[0].name;
  const children = family.children;
  if (children.length) {children.forEach((child) => {
    addElements(child, generation, parent, portraits, households);
  })}
}

function getElements(family, generation, parent) {
  const portraits = [];
  const households = [];
  addElements(family, generation, parent, portraits, households);
  return [portraits, households];
}

export function loadSVG() {
  const hero = svg();
  const [portraits, households] = getElements(family, 0, null);

  portraits.map(portrait => {
    let xTranslation;
    switch (portrait.alignment) {
      case "center":
        xTranslation = 0;
        break;
      case "left":
        xTranslation = -portraitOffset;
        break;
      case "right":
        xTranslation = portraitOffset;
    }
    portrait.portrait.setAttribute("transform", `translate(${xTranslation}, 0)`);
  });

  households.map(household => {
    let scale;
    switch (household.generation) {
      case 0:
        scale = 1;
        break;
      case 1:
        scale = 1 / 3;
        break;
      case 2:
        scale = 1 / 9;
    }
    household.household.setAttribute("transform", `scale(${scale})`);
  });

  households.map(household => {
    hero.appendChild(household.household);
  });

  document.querySelector("#hero").appendChild(hero);
  // console.log(JSON.stringify(family, null, 2));
  
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

export default loadSVG;
