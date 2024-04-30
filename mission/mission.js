// wdd131/mission/mission.js - Script for Unit 1's Mission Statement

const themeSelector = document.getElementById(`theme`);

console.log(`The display theme is '${themeSelector.value}.'`);

themeSelector.addEventListener(`change`, function(event) {
    const logo = document.getElementById(`logo`);

    if (themeSelector.value === `dark`) {
        document.body.classList.add(`dark`);
        logo.src = `byui-logo_white.png`;
    }

    else {
        document.body.classList.remove(`dark`);
        logo.src = `byui-logo_blue.webp`;
    }

    console.log(`The display theme was changed to '${themeSelector.value}.'`);
});
