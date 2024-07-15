/* wdd131/7s4e/assets/js/svg.js */

export function createCircle(radius, cx=0, cy=0, pathLength=null) {
  const element = createElement("circle");
  const parameters = {"r": radius, "cx": cx, "cy": cy, "pathLength": pathLength};
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createClipPath(
  id, shapeElement, clipPathUnits="userSpaceOnUse"
) {
  const element = createElement("clipPath");
  const parameters = {"id": id, "clipPathUnits": clipPathUnits};
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.appendChild(shapeElement);
  return element;
}

export function createDefs(blocks) {
  const element = createElement("defs");
  blocks.forEach(block => element.appendChild(block));
  return element;
}

export function createElement(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}

export function createRadialGradient(
  id, radius, stops, cx=0.5, cy=0.5, fx=cx, fy=cy, href=null, 
  gradientUnits="objectBoundingBox", spreadMethod="pad"
) {
  const element = createElement("radialGradient");
  const parameters = {
    "id": id, "r": radius, "cx": cx, "cy": cy, "fx": fx, "fy": fy, 
    "href": href, "gradientUnits": gradientUnits, "spreadMethod": spreadMethod
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  stops.forEach(stop => element.appendChild(stop));
  return element;
}

export function createGroup(id=null) {
  const element = createElement("g");
  element.setAttribute("id", id);
  return element;
}

export function createImage(id, href, x, y, width, height="auto", clipID=null) {
  const element = createElement("image");
  const parameters = {
    "id": id, "href": href, "x": x, "y": y, "width": width, "height": height, 
    "clip-path": `url(#${clipID})`
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.appendChild(defs);
  return element;
}

export function createPath(d) {
  const element = createElement("image");
  element.setAttribute("d", value);
  return element;
}

export function createShape(
  shapeElement, fill="black", stroke=fill, strokeWidth=1
) {
  const element = shapeElement;
  const parameters = {
    "fill": fill,  "stroke": stroke, "stroke-width": strokeWidth
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createStop(offset=0, stopColor="black", stopOpacity=1) {
  const element = createElement("stop");
  const parameters = {
    "offset": offset, "stop-color": stopColor, "stop-opacity": stopOpacity
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createSVG(
  defs, width, height=width, vbMinX=-width/2, vbMinY=-height/2, vbWidth=width, 
  vbHeight=height
) {
  const element = createElement("svg");
  const parameters = {
    "width": width, "height": height, 
    "viewBox": `${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}`
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.appendChild(defs);
  return element;
}

export function createText(
  text, fontSize="20px", stroke="black", fill=stroke, textAnchor="middle", 
  alignmentBaseline="middle"
) {
  const element = createElement("text");
  const parameters = {
    "font-size": fontSize, "stroke": stroke, "fill": fill, 
    "text-anchor": textAnchor, "alignment-baseline": alignmentBaseline
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.textContent(text);
  return element;
}






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