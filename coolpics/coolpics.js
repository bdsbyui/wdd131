// coolpics.js - Script for Unit 2's Cool Pics

const navElement = document.querySelector("nav");

document.querySelector("button").addEventListener(
    "click",
    () => navElement.classList.toggle("hide")
);

window.addEventListener(
    "resize",
    () => {
        if (window.innerWidth < 600) {navElement.classList.add("hide");}
        else {navElement.classList.remove("hide");}
    }
);
