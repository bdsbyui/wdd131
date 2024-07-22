/* wdd131/7s4e/assets/js/index.mjs */

import { gamePageLink, sitePlanLink } from "./icon.mjs";
import loadHero from "./hero.mjs";

export default function() {
  const footerRight = document.querySelector(".footer .hf__right-side");
  footerRight.innerHTML = sitePlanLink(true);

  const navContainer = document.querySelector(".nav-container");
  navContainer.innerHTML = gamePageLink();

  const content = document.querySelector(".content");
  content.classList.add("hero");
  loadHero();
}
