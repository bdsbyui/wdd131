/* wdd131/7s4e/assets/js/games.js */

import { sitePlanLink } from "./icon.mjs";
import loadMinesweeper from "./minesweeper.mjs";

const loadContent= () => {
  const gameContent = document.querySelector(".content");
  gameContent.classList.add("games");
  
  const gameTitle = document.createElement("h1");
  gameTitle.classList.add("game-title");

  const gameSpace = document.createElement("div");
  gameSpace.classList.add("game-space");

  const gameSettings = document.createElement("div");
  gameSettings.classList.add("game-settings");

  gameContent.appendChild(gameTitle);
  gameContent.appendChild(gameSpace);
  gameContent.appendChild(gameSettings);
}

export default function() {
  const navContainer = document.querySelector(".nav-container");
  navContainer.innerHTML = sitePlanLink();

  loadContent();

  loadMinesweeper();
}

export const inititializeGame = (title, className) => {
  const gameTitle = document.querySelector(".game-title");
  gameTitle.classList.add(className);
  gameTitle.innerHTML = title;

  const gameSpace = document.querySelector(".game-space");
  gameSpace.classList.add(className);

  const gameSettings = document.querySelector(".game-settings");
  gameSettings.classList.add(className);
}
