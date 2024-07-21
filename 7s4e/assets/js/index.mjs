/* wdd131/7s4e/assets/js/index.mjs */

import { gamePageLink, sitePlanLink } from "./icon.mjs";
import loadHero from "./hero.mjs";

export default function() {
  const footerRight = document.querySelector(".footer .right-side");
  footerRight.innerHTML = sitePlanLink();

  const menuContainer = document.querySelector(".menu-container");
  menuContainer.innerHTML = gamePageLink();

  const main = document.querySelector(".main");
  main.id = "hero";
  loadHero();
}
