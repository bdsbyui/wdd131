/* wdd131/7s4e/assets/js/main.js */

document.addEventListener("DOMContentLoaded", () => {
  const svgObjects = document.querySelectorAll(".svgObject");
  svgObjects.forEach((objectElement, index) => {
    objectElement.addEventListener("mouseenter", () => {
      objectElement.style.cursor = "pointer";
    });
    objectElement.addEventListener("load", () => {
      const svg = objectElement.contentDocument.querySelector("svg");
      if (svg) {
        svg.style.cursor = "pointer";
        svg.addEventListener("click", () => {
          window.location.href = svgObjects[index].parentNode.href;
        });
      }
    });
  });
});
