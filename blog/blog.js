/* wdd131/blog/blog.js - Script for Unit 3's Book Reviews */

// Layout script
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

// Data
const articles = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description: "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
    imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10-14",
    genre: "Fantasy",
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
  },
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his \"Aunt Pol\" and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐"
  }
];


// Display script
document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.querySelector("#display").innerHTML = articles.map(
      review => {return `
        <section id="${review.id}" class="review">
          <section class="right-primary-pane">
            <h2 class="title">${review.title}</h2>
            <img class="cover" src="${review.imgSrc}" alt="${review.imgAlt}">
            <p class="description">${review.description}</p>
          </section>
          <section class="left-secondary-pane">
            <h3 class="date">${review.date}</h3>
            <h4 class="ages">${review.ages}</h4>
            <h4 class="genre">${review.genre}</h4>
            <h4 class="stars">${review.stars}</h4>
          </section>
        </section>
      `;}
    ).join("");
  }
);
