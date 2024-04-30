// wdd131/mission/mission.js - Script for Unit 1's Mission Statement

const themeSelector = document.getElementById("theme");
themeSelector.addEventListener("change", changeTheme);

function changeTheme(event) {
    const logo = document.getElementById("logo");
    if (themeSelector.value = "dark") {
        document.body.classList.add("dark");
        logo.src = "byui-logo_white.png";
    }
    else {
        document.body.classList.remove("dark");
        logo.src = "byui-logo_blue.webp;"
    }
};
