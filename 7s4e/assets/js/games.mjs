/* wdd131/7s4e/assets/js/games.js */

import { sitePlanLink } from "./icon.mjs";
import loadMinesweeper from "./minesweeper.mjs";

export default function() {
  const navContainer = document.querySelector(".nav-container");
  navContainer.innerHTML = sitePlanLink();

  const content = document.querySelector(".content");
  content.classList.add("minesweeper");
  loadMinesweeper();
}
