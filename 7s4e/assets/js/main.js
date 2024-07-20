/* wdd131/7s4e/assets/js/main.js */

import loadSVG from "./hero.mjs";

const toggleMenu = () => {
  const menuContainer = document.querySelector('.menu-container');
  if (menuContainer.style.display === "none" || !menuContainer.style.display) {
    menuContainer.style.display = "block";
  } else {
    menuContainer.style.display = "none";
  }
};



// Make icons clickable
const setupSvgInteraction = (iframe) => {
  try {
    const svgDocument = iframe.contentDocument;
    if (!svgDocument) {
      console.error("Cannot access contentDocument");
      return;
    }
    const svg = svgDocument.querySelector("svg");
    if (!svg) {
      console.error("SVG element not found within iframe");
      return;
    }
    svg.addEventListener("mouseenter", () => {
      iframe.style.cursor = "pointer";
    });
    svg.addEventListener("click", () => {
      const anchor = iframe.closest("a");
      if (anchor) window.location.href = anchor.href;
    });
  } catch (error) {
    console.error("Error accessing SVG inside iframe:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const svgIframes = document.querySelectorAll(".svgObject");
  svgIframes.forEach((iframe) => {
    iframe.addEventListener("load", () => setupSvgInteraction(iframe));
    setTimeout(() => {
      if (iframe.contentDocument) setupSvgInteraction(iframe);
    }, 1000);
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

// Hero SVG
document.addEventListener("DOMContentLoaded", loadSVG);
document.querySelector(".menu-button").addEventListener("click", toggleMenu);


