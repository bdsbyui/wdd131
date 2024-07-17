/* wdd131/7s4e/assets/js/svg.js */

export function createAnimateMotion(path, attributes) {
  const element = createElement("animateMotion");
  const parameters = {"path": path, ...attributes};
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createAnimateTransform(type, attributes) {
  const element = createElement("animateTransform");
  const parameters = {
    "attributeName": "transform", "type": type, ...attributes
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createCircle(radius, cx=0, cy=0) {
  const element = createElement("circle");
  const parameters = {"cx": cx, "cy": cy, "r": radius};
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createClipPath(shapeElement) {
  const element = createElement("clipPath");
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

export function createRadialGradient(stops, radius, cx=0.5, cy=0.5) {
  const element = createElement("radialGradient");
  const parameters = {"cx": cx, "cy": cy, "r": radius};
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  stops.forEach(stop => element.appendChild(stop));
  return element;
}

export function createGroup(array=null) {
  const element = createElement("g");
  array.forEach(member => element.appendChild(member));
  return element;
}

export function createImage(href, x, y, width, height="auto") {
  const element = createElement("image");
  const parameters = {
    "x": x, "y": y, "width": width, "height": height, "href": href
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function createPath(d) {
  const element = createElement("path");
  element.setAttribute("d", d);
  return element;
}

export function createShape(
  shapeElement, fill="black", stroke=fill, strokeWidth=1
) {
  const parameters = {
    "fill": fill,  "stroke": stroke, "stroke-width": strokeWidth
  };
  Object.entries(parameters).forEach(([key, value]) => {
    shapeElement.setAttribute(key, value);
  });
  return shapeElement;
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
  text, fontSize="20px", fill="black", stroke=fill, textAnchor="middle", 
  alignmentBaseline="middle"
) {
  const element = createElement("text");
  const parameters = {
    "font-size": fontSize, "fill": fill, "stroke": stroke, 
    "text-anchor": textAnchor, "alignment-baseline": alignmentBaseline
  };
  Object.entries(parameters).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.textContent(text);
  return element;
}
