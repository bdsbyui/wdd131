/* wdd131/blog/blog.js - Script for Unit 3's Book Reviews */

// Blog layout
const layoutThreshold = getComputedStyle(
  document.documentElement).getPropertyValue("--layout-threshold").trim();
const mediaStyle = document.createElement("style");
document.head.appendChild(mediaStyle);
mediaStyle.sheet.insertRule(
  `
    @media (min-width: ${layoutThreshold}) {
      #container {
        grid-template-columns: 1fr auto;
        grid-template-rows: auto 1fr;
      }
      #top {
        grid-column: 1/3;
      }
      #display {
        grid-column: 1/2;
        grid-row: 2/3;
        overflow-y: auto;
      }
      #filter {
        grid-column: 2/3;
        position: sticky;
        top: 0;
        bottom: 0;
      }
  `,
  0
);

// Main content
const articles = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description: "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10-14",genre: "Fantasy",
    stars: "****"
  },
  {
    id: 2,
    title: "Magnus Chase Book One: Sword of Summer",
    date: "December 12, 2021",
    description: "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
    imgSrc: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐"
  }
];


// Display script
function templateReview(object) {
  return `
    <section id="${object.id}" class="review">
      <section class="left-secondary-pane">
        <h3 class="date">${object.date}</h3>
        <h4 class="ages">${object.ages}</h4>
        <h4 class="genre">${object.genre}</h4>
        <h4 class="stars">${object.stars}</h4>
      </section>
      <section class="right-primary-pane">
        <h2 class="title">${object.title}</h2>
        <img class="cover" src="${object.imgSrc}" alt="${object.imgAlt}">
        <p class="description">${object.description}</p>
      </section>
    </section>
  `;
}

function loadReviews(reviews) {
  const templatedHtml = reviews.map((review) => templateReview(review));
  const reducedHtml = templatedHtml.reduce((acc, nxt) => {return acc + nxt;})
  document.querySelector("#display").innerHTML = reducedHtml;
}

loadReviews(articles);