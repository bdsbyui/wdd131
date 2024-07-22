/* wdd131/7s4e/assets/js/games.js */

import { sitePlanLink } from "./icon.mjs";
import loadMinesweeper from "./minesweeper.mjs";

const loadContent= () => {
  const pageContent = document.querySelector(".content");
  
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");

  const gameSpace = document.createElement("div");
  gameSpace.classList.add("game-space");

  pageContent.appendChild(gameTitle);
  pageContent.appendChild(gameSpace);
}

export default function() {
  const navContainer = document.querySelector(".nav-container");
  navContainer.innerHTML = sitePlanLink();

  loadContent();

  loadMinesweeper();
}
