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
  const colorStyles = getComputedStyle(document.documentElement);
  const lightColor = colorStyles.getPropertyValue("--light-color");
  const darkAccent = colorStyles.getPropertyValue("--dark-accent");
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", 1000);
  svg.setAttribute("height", 1000);
  svg.setAttribute("viewBox", "-500 -500 1000 1000")
  const defs = document.createElementNS(svgNS, "defs");
  const radialGradient = document.createElementNS(svgNS, "radialGradient");
  radialGradient.setAttribute("id", "gradient");
  defs.appendChild(radialGradient);
  const stop1 = document.createElementNS(svgNS, "stop");
  radialGradient.appendChild(stop1);
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", lightColor);
  const stop2 = document.createElementNS(svgNS, "stop");
  radialGradient.appendChild(stop2);
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", darkAccent);
  const background = document.createElementNS(svgNS, "rect");
  svg.appendChild(background);
  background.setAttribute("x", -168);
  background.setAttribute("y", -168);
  background.setAttribute("width", 450);
  background.setAttribute("height", 336);
  background.setAttribute("cx", 0.5);
  background.setAttribute("cy", 0.5);
  background.setAttribute("fx", 0.373);
  background.setAttribute("fy", 0.5);
  background.setAttribute("fill", "black");
  // background.setAttribute("fill", "url(#gradient)");


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
  svg.appendChild(infinityLoop);
  svg.appendChild(circle);
  document.querySelector("#hero").appendChild(svg);
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
