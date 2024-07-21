/* wdd131/7s4e/assets/js/main.mjs */

import { logoLink, menuButton } from "./icon.mjs";

/**addIcons()
 * Add icons common to all pages
 * @return {void} DOM modified
 */
const addIcons = () => {
  const headerLeft = document.querySelector(".header .left-side");
  headerLeft.innerHTML = logoLink();

  const buttonContainer = document.querySelector(".button-container");
  buttonContainer.innerHTML = menuButton();
}

/**adjustWidth()
 * Match width of header and footer to the width of main
 * @return {void} DOM modified
 */
const adjustWidth = () => {
  const source = document.querySelector('.width-source');
  const targets = document.querySelectorAll('.width-target');
  if (source) {
    const sourceWidth = source.offsetWidth;
    targets.forEach((target) => {
      target.style.width = `${sourceWidth}px`;
    });
  }
};

/**loadBody()
 * Load inner HTML to the header, main, and footer elements
 * @return {void} DOM modified
 */
const loadBody = async () => {
  const elements = ["header", "main", "footer"];
  try {
    const fetchPromises = elements.map(async (element) => {
      const response = await fetch(`/7s4e/components/${element}.html`);
      if (!response.ok) {
        throw new Error(`Error loading ${element}: ${response.statusText}`);
      }
      const data = await response.text();
      document.querySelector(element).innerHTML = data;
    });
    await Promise.all(fetchPromises);
  } catch (error) {
    console.error(error);
  }
};

/**loadBody()
 * Load page-specific scripts
 * @return {void} DOM modified
 */
const loadScript = async (url) => {
  try {
    const module = await import(url);
    return module.default();
  } catch (err) {
    return console.error(`Error loading module ${url}:`, err);
  }
}

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

/**toggleMenu()
 * Provide functionality of menu button
 * @return {void} DOM modified
 */
const toggleMenu = () => {
  const menuContainer = document.querySelector('.menu-container');
  if (menuContainer.style.display === "none" || !menuContainer.style.display) {
    menuContainer.style.display = "block";
  } else {
    menuContainer.style.display = "none";
  }
};


document.addEventListener('DOMContentLoaded', async function () {
  
  // Load content common to every page
  await loadBody();
  await addIcons();

  // Run page-specific script
  const path = window.location.pathname;
  switch (path) {
    case "/7s4e/index.html":
      await loadScript('./index.mjs');
      break;
    case "/7s4e/pages/games.html":
      await loadScript('./games.mjs');
      break;
    case "/7s4e/pages/site-plan.html":
      await loadScript('./site-plan.mjs');
      break;
    default:
      console.log('No script for this page.');
  }

  const svgIframes = document.querySelectorAll(".svgObject");
  svgIframes.forEach((iframe) => {
    iframe.addEventListener("load", () => setupSvgInteraction(iframe));
    setTimeout(() => {
      if (iframe.contentDocument) setupSvgInteraction(iframe);
    }, 1000);
  });

  // Set header and footer to width of main
  adjustWidth();
  window.onresize = adjustWidth;

  // Add event listeners  
  document.querySelector(".menu-button").addEventListener("click", toggleMenu);
});