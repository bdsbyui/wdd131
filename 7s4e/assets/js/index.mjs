/* wdd131/7s4e/assets/js/index.mjs */

import { gamePageLink, sitePlanLink } from "./icon.mjs";
import loadHero from "./hero.mjs";

export default function() {
  const footerRight = document.querySelector(".footer .hf__right-side");
  footerRight.innerHTML = sitePlanLink();

  const navContainer = document.querySelector(".nav-container");
  navContainer.innerHTML = gamePageLink();

  const main = document.querySelector(".main");
  main.id = "hero";
  loadHero();
}
