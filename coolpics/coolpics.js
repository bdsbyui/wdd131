// coolpics.js - Script for Unit 2's Cool Pics

// Menu script
const navElement = document.querySelector("nav");
document.querySelector("#menu-button").addEventListener(
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

// Gallery script
document.querySelector(".gallery").addEventListener(
    "click",
    (event) => {
        const label = event.target.closest("img").src.split("-", 1);
        const path = label + "-full.jpeg";
        const html = `
            <div class="viewer">
                <div class="title-bar"><div class="button-container">
                    <button id="close-button">X</button>
                </div></div>
                <img class="modal" alt="${label}" src="${path}">
            </div>
        `
        document.body.insertAdjacentHTML("afterbegin", html);
        document.querySelector("#close-button").addEventListener(
            "click",
            () => document.querySelector(".viewer").remove()
        );
    }
);
