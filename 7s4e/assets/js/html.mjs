/* wdd131/7s4e/assets/js/html.js */

import { makeClassStyle } from "./utils.mjs";

export const anchor = (className, title, content, href) => {
  return `
    <a class="${className}" href="${href}" title="${title}">
        ${content}
        <span class="tooltip">${title}</span>
      </a>
  `;  
}

export const button = (className, label, element) => {
  const content = typeof element === "string" ? element : element.outerHTML;
  return `
    <button class="${className}" aria-label="${label}">${content}</button>
  `;
}

export const iframe = (label, src) => {
  return `
    <iframe 
      class="svgObject" 
      aria-label="${label}" 
      src="${src}" 
      frameborder="0" 
      scrolling="no" 
    ></iframe>
  `;
}

export const linkContainer = (title, element, href) => {
  const content = typeof element === "string" ? element : element.outerHTML;
  const link = anchor(
    `link-container__icon-link ${makeClassStyle(title)}`, title, content, href
  );
  return `<div class="link-container ">${link}</div>`;
}
