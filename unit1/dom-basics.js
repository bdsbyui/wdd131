// dom-basics.js

// Activity 2 Step 1
const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

// Activity 2 Step 2
const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "image");
document.body.appendChild(newImage);

// Activity 2 Step 3
const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

// Activity 2 Step 4
const newSectionElement = document.createElement("section");
const newHeadingElement = document.createElement("h2");
newHeadingElement.textContent = "DOM Basics";
newSectionElement.appendChild(newHeadingElement);
const newParagraphElement = document.createElement("p");
newParagraphElement.textContent = "This was added through Javascript";
newSectionElement.appendChild(newParagraphElement);
document.body.appendChild(newSectionElement);
