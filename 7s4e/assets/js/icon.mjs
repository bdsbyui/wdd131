/* wdd131/7s4e/assets/js/icon.js */

import * as html from "./html.mjs";
import * as svg from "./svg.mjs";

export const gamePageLink = () => {

  const centerTopEdges = svg.createPolyline("90,175 90,58 7,35 90,15 173,35 90,58");
  const outerEdges = svg.createPolyline("6,35 9,125 90,175 171,125 174,35");
  const fiveDots1 = svg.createEllipse(90, 26, 7, 3);
  const fiveDots2 = svg.createEllipse(90, 36, 8, 4);
  const fiveDots3 = svg.createEllipse(55, 36, 8, 4);
  const fiveDots4 = svg.createEllipse(125, 36, 8, 4);
  const fiveDots5 = svg.createEllipse(90, 46, 9, 4);
  const fourDots1 = svg.createEllipse(30, 67, 6, 8);
  const fourDots2 = svg.createEllipse(65, 80, 7, 9);
  const fourDots3 = svg.createEllipse(30, 110, 6, 8);
  const fourDots4 = svg.createEllipse(65, 130, 7, 9);
  const threeDots1 = svg.createEllipse(115, 130, 8, 10);
  const threeDots2 = svg.createEllipse(135, 95, 7, 9);
  const threeDots3 = svg.createEllipse(155, 65, 6, 8);

  const dots = [
    fiveDots1, fiveDots2, fiveDots3, fiveDots4, fiveDots5, 
    fourDots1, fourDots2, fourDots3, fourDots4, 
    threeDots1, threeDots2, threeDots3
  ];
  const allElements = [...dots, centerTopEdges, outerEdges];
  allElements.forEach(element => element.classList.add("logos"));
  dots.forEach(element => element.classList.add("logos__die"));

  const gamePageIcon = svg.createSVG(null, "100%", "100%", 0, 0, 180, 180);
  allElements.forEach(element => gamePageIcon.appendChild(element));
  
  return html.linkContainer(
    "game page", gamePageIcon, "pages/games.html"
  );
}

export const logoLink = (pathPrefix) => {
  const title = "home page";
  const logo = html.iframe(title, `${pathPrefix}assets/images/logo.svg`);
  return html.linkContainer(title, logo, `${pathPrefix}index.html`);
}

export const menuButton = () => {
  const hamburger = svg.createPath("M 25,45 H 155 M 25,90 H 155 M 25,135 H 155");
  hamburger.classList.add("logos","logos--round-linecap","logos__menu");
  const menuIcon = svg.createSVG(null, "100%", "100%", 0, 0, 180, 180);
  menuIcon.appendChild(hamburger);
  return html.button("menu-button", "toggle menu", menuIcon);
}

export const sitePlanLink = (isIndex=false) => {
  const pathPrefix = isIndex ? "pages/" : "";

  const siteBorder = svg.createRectangle(5, 5, 170, 170);
  const siteBar = svg.createPath("M 5,20 H 175 M 160,5 V 20");
  const heroBorder = svg.createRectangle(25, 40, 130, 40);
  const heroX = svg.createPath("M 25,40 L 155,80 M 25,80 L 155,40");
  const imageBorder = svg.createRectangle(25, 95, 45, 45);
  const imageX = svg.createPath("M 25,95 L 70,140 M 25,140 L 70,95");
  const textLines = svg.createPath(
    "M 85,95 H 155 M 85,110 H 155 M 85,125 H 155 M 85,140 H 155 M 25,155 H 155"
  );
  
  const enhancedElements = [heroBorder, imageBorder, textLines];
  const allElements = [...enhancedElements, siteBorder, siteBar, heroX, imageX];
  allElements.forEach(element => element.classList.add("logos"));
  enhancedElements.forEach(element => {
    element.classList.add("logos--fill--light-accent","logos--linecap--round")}
  );

  const sitePlanIcon = svg.createSVG(null, "100%", "100%", 0, 0, 180, 180);
  allElements.forEach(element => sitePlanIcon.appendChild(element));

  return html.linkContainer(
    "site plan", sitePlanIcon, `${pathPrefix}site-plan.html`
  );
}