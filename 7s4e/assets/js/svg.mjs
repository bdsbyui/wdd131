/* wdd131/7s4e/assets/js/svg.js */

import family from "../../data/family.mjs";

const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue("--dark-color");
const accentColor = styles.getPropertyValue("--dark-accent");

const newElement = (type) => {
  return document.createElementNS("http://www.w3.org/2000/svg", type)
};

export function loadHero() {
  const svg = newElement("svg");
  svg.setAttribute("width", 1000);
  svg.setAttribute("height", 1000);
  svg.setAttribute("viewBox", "-500 -500 1000 1000")

  const defs = newElement("defs");

  const frameClip = newElement("clipPath");
  frameClip.setAttribute("id", "frame");

  const frameShape = newElement("circle");
  frameShape.setAttribute("cx", "0");
  frameShape.setAttribute("cy", "0");
  frameShape.setAttribute("r", "168");

  const radialGradient = newElement("radialGradient");
  radialGradient.setAttribute("id", "gradient");
  radialGradient.setAttribute("cx", "0.3733");
  radialGradient.setAttribute("cy", "0.5");
  radialGradient.setAttribute("r", "0.6267");

  const stop1 = newElement("stop");
  stop1.setAttribute("offset", "0.5957");
  stop1.setAttribute("stop-color", mainColor);

  const stop2 = newElement("stop");
  stop2.setAttribute("offset", "1");
  stop2.setAttribute("stop-color", accentColor);

  const portrait = newElement("image");
  portrait.setAttribute("id", "bryant");
  portrait.setAttribute("x", "-830");
  portrait.setAttribute("y", "-190");
  portrait.setAttribute("width", "1150");
  portrait.setAttribute("href", "assets/images/bryant.jpg");
  portrait.setAttribute("clip-path", "url(#frame)");

  const loopFiller = newElement("path");
  loopFiller.setAttribute("d", "M 0,0 c -600,600, -600,-600, 0,0");
  loopFiller.setAttribute("fill", "url(#gradient)");

  const wingGroup = newElement("g");
  wingGroup.appendChild(loopFiller);
  wingGroup.appendChild(portrait);

  const infinityLoop = newElement("path");
  infinityLoop.setAttribute("class", "logos");
  infinityLoop.setAttribute(
    "d", "M 0,0 C -600,600, -600,-600, 0,0 S 600,-600, 0,0"
  );

  const circle = newElement('circle');
  // circle.setAttribute("class", "logos");
  circle.setAttribute('cx', -282);
  circle.setAttribute('cy', 0);
  circle.setAttribute('r', 168);
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", 7);
  circle.setAttribute("fill", "none");

  svg.appendChild(defs);
  defs.appendChild(frameClip);
  frameClip.appendChild(frameShape);

  defs.appendChild(radialGradient);
  radialGradient.appendChild(stop1);
  radialGradient.appendChild(stop2);

  svg.appendChild(wingGroup);
  // svg.appendChild(infinityLoop);
  // svg.appendChild(circle);
  document.querySelector("#hero").appendChild(svg);
  
  const rotationDuration = 120000 // two minutes
  const revolutionDuration = 300000 // five minutes
  const start = performance.now();

  function animateElements(timestamp) {
    const elapsed = timestamp - start;
    const rotationProgress = (elapsed % rotationDuration) / rotationDuration;
    const portraitRotation = -360 * rotationProgress;
    const loopRotation = 360 * rotationProgress;
    portrait.setAttribute(
      "transform", 
      `translate(-282, 0) rotate(${portraitRotation} 0 0)`
    );
    wingGroup.setAttribute("transform", `rotate(${loopRotation} 0 0)`);
    requestAnimationFrame(animateElements);
  }
  requestAnimationFrame(animateElements);

}

export default loadHero;