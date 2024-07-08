/* wdd131/7s4e/assets/js/main.js */

const templateSVG = function(
  svgWidth, svgHeight, vbMinX, vbMinY, vbWidth, vbHeight
) {return `
    <svg
      id="heroSVG" 
      width="${svgWidth}" 
      height="${svgHeight}" 
      viewBox="${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
      </defs>
      <style>
      </style>
    </svg>
  `;
};

// Hero SVG
document.addEventListener("DOMContentLoaded", () => {
  const styles = getComputedStyle(document.documentElement);
  const mainColor = styles.getPropertyValue("--dark-color");
  const accentColor = styles.getPropertyValue("--dark-accent");

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", 1000);
  svg.setAttribute("height", 1000);
  svg.setAttribute("viewBox", "-500 -500 1000 1000")

  const defs = document.createElementNS(svgNS, "defs");

  const frameClip = document.createElementNS(svgNS, "clipPath");
  frameClip.setAttribute("id", "frame");

  const frameShape = document.createElementNS(svgNS, "circle");
  frameShape.setAttribute("cx", "0");
  frameShape.setAttribute("cy", "0");
  frameShape.setAttribute("r", "168");

  // const loopClip = document.createElementNS(svgNS, "clipPath");
  // loopClip.setAttribute("id", "loop");

  const radialGradient = document.createElementNS(svgNS, "radialGradient");
  radialGradient.setAttribute("id", "gradient");
  radialGradient.setAttribute("cx", "0.3733");
  radialGradient.setAttribute("cy", "0.5");
  radialGradient.setAttribute("r", "0.6267");

  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0.5957");
  stop1.setAttribute("stop-color", mainColor);

  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "1");
  stop2.setAttribute("stop-color", accentColor);

  const portrait = document.createElementNS(svgNS, "image");
  portrait.setAttribute("id", "bryant");
  portrait.setAttribute("x", "-830");
  portrait.setAttribute("y", "-190");
  portrait.setAttribute("width", "1150");
  portrait.setAttribute("href", "assets/images/bryant.jpg");
  portrait.setAttribute("clip-path", "url(#frame)");

  const loopFiller = document.createElementNS(svgNS, "path");
  loopFiller.setAttribute("d", "M 0,0 c -600,600, -600,-600, 0,0");
  loopFiller.setAttribute("fill", "url(#gradient)");

  const wingGroup = document.createElementNS(svgNS, "g");
  wingGroup.appendChild(loopFiller);
  wingGroup.appendChild(portrait);

  const infinityLoop = document.createElementNS(svgNS, "path");
  infinityLoop.setAttribute("class", "logos");
  infinityLoop.setAttribute(
    "d", "M 0,0 C -600,600, -600,-600, 0,0 S 600,-600, 0,0"
  );

  const circle = document.createElementNS(svgNS, 'circle');
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
});

// Make icons clickable
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const svgObjects = document.querySelectorAll(".svgObject");
  console.log(`svgObjects: ${svgObjects.length}`);

  svgObjects.forEach((objectElement) => {
    objectElement.addEventListener("load", () => {
      console.log(`${objectElement.getAttribute("aria-label")} loaded`);

      const svg = objectElement.contentDocument.querySelector("svg");
      console.log(`${objectElement.getAttribute("aria-label")} svg: ${svg}`);

      if (svg) {
        console.log(`svg: true`);
        svg.addEventListener("mouseenter", () => {
          console.log(`${objectElement.getAttribute("aria-label")} listening`);
          objectElement.style.cursor = "pointer";
        });
        svg.addEventListener("click", () => {
          console.log(`${objectElement.getAttribute("aria-label")} clicked`);
          window.location.href = objectElement.closest("a").href;
        });
      }
    });
  });
});

// Get source width to set target witth
window.onload = window.onresize = () => {
  const source = document.querySelector('.width-source');
  const targets = document.querySelectorAll('.width-target');
  targets.forEach((target) => {
    target.style.width = `${source.offsetWidth}px`;
  });  
};
