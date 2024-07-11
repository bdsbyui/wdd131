/* wdd131/7s4e/assets/js/main.js */

import loadSVG from "./svg.mjs";
// import * as svg from "./svg.mjs";

// Hero SVG
document.addEventListener("DOMContentLoaded", loadSVG);

// Make icons clickable
document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOMContentLoaded");

  const svgObjects = document.querySelectorAll(".svgObject");
  // console.log(`svgObjects: ${svgObjects.length}`);

  svgObjects.forEach((objectElement) => {
    objectElement.addEventListener("load", () => {
      // console.log(`${objectElement.getAttribute("aria-label")} loaded`);

      const svg = objectElement.contentDocument.querySelector("svg");
      // console.log(`${objectElement.getAttribute("aria-label")} svg: ${svg}`);

      if (svg) {
        // console.log(`svg: true`);
        svg.addEventListener("mouseenter", () => {
          // console.log(`${objectElement.getAttribute("aria-label")} listening`);
          objectElement.style.cursor = "pointer";
        });
        svg.addEventListener("click", () => {
          // console.log(`${objectElement.getAttribute("aria-label")} clicked`);
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
