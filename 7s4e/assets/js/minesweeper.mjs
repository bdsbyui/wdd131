/* wdd131/7s4e/assets/js/minesweeper.js */

import { makeClassStyle } from "./utils.mjs";
import { inititializeGame } from "./games.mjs";

const title = "Minesweeper";
const className = makeClassStyle(title);
const gameWidth = 16;
const gameHeight = gameWidth;
const bombQuantity = 40;
let flagsLeft = bombQuantity;
let isGameOver = false;
let seconds = 0;
const squares = [];

const buildBoard = () => {

  const gameSpace = document.querySelector(".game-space");

  const container = document.createElement("div");
  container.classList.add(className, "container");
  gameSpace.appendChild(container);
  
  const board = document.createElement("div");
  board.classList.add(className, "board");
  container.appendChild(board);

  const dashboard = document.createElement("div");
  dashboard.classList.add(className, "dashboard");
  board.appendChild(dashboard);

  const flagsSection = document.createElement("div");
  flagsSection.classList.add(className, "flags-section");
  dashboard.appendChild(flagsSection);

  const flagsLabel = document.createElement("div");
  flagsLabel.classList.add(className, "dashboard-label");
  flagsLabel.innerHTML = "🚩";
  flagsSection.appendChild(flagsLabel);

  const flagsDisplay = document.createElement("div");
  flagsDisplay.classList.add(className, "dashboard-display", "flags-display");
  flagsSection.appendChild(flagsDisplay);

  const resetButton = document.createElement("button");
  resetButton.classList.add(className, "reset-button");
  resetButton.innerHTML = "🙂";
  dashboard.appendChild(resetButton);

  const timeSection = document.createElement("div");
  timeSection.classList.add(className, "time-section");
  dashboard.appendChild(timeSection);

  const timeLabel = document.createElement("div");
  timeLabel.classList.add(className, "dashboard-label");
  timeLabel.innerHTML = "⏱️";
  timeSection.appendChild(timeLabel);

  const timeDisplay = document.createElement("div");
  timeDisplay.classList.add(className, "dashboard-display", "time-display");
  timeSection.appendChild(timeDisplay);

  const grid = document.createElement("div");
  grid.classList.add(className, "grid");
  board.appendChild(grid);

  resetBoard();
}

const checkWin = () => {

  const flags = document.querySelectorAll(".flag");
  flags.forEach(flag => {

    if (!flag.classList.contains("bomb")) {
      endGame();
      return;
    }
  });

  isGameOver = true;
  document.querySelector(".container").classList.add("win");
}

const checkSquares = (square) => {

  const w = parseInt(gameWidth)
  const i = parseInt(square.id);
  const l = i % w === 0;             // square is on left edge of board
  const r = i % w === w - 1;         // square is on right edge of board
  const t = i < w;                   // square is on top edge of board
  const b = i >= w * gameHeight - w; // square is on bottom edge of board

  setTimeout(() => {

    if (!t && !l) clickSquare(squares[i - w - 1]); // NW
    if (!t)       clickSquare(squares[i - w]);     // N
    if (!t && !r) clickSquare(squares[i - w + 1]); // NE
    if (!l)       clickSquare(squares[i - 1]);     // W
    if (!r)       clickSquare(squares[i + 1]);     // E
    if (!b && !l) clickSquare(squares[i + w - 1]); // SW
    if (!b)       clickSquare(squares[i + w]);     // S
    if (!b && !r) clickSquare(squares[i + w + 1]); // SE

    }, 10);
}

const clickSquare = (square) => {

  if (
    square.classList.contains("checked") || 
    square.classList.contains("flag") || 
    square.classList.contains("maybe") || 
    isGameOver
  ) return;

  square.classList.add("checked");
  labelSquare(square);
  
  if (square.classList.contains("bomb")) endGame();
  else if (square.getAttribute("data") == 0) checkSquares(square);
}

const countBombs = () => {

  squares.map(square => {

    let count = 0;
    const w = parseInt(gameWidth)
    const i = parseInt(square.id);
    const l = i % w === 0;             // square is on left edge of board
    const r = i % w === w - 1;         // square is on right edge of board
    const t = i < w;                   // square is on top edge of board
    const b = i >= squares.length - w; // square is on bottom edge of board

    if (!square.classList.contains("bomb")) {
      if (!t && !l && squares[i - w - 1].classList.contains("bomb")) count++;
      if (!t &&       squares[i - w].classList.contains("bomb"))     count++;
      if (!t && !r && squares[i - w + 1].classList.contains("bomb")) count++;
      if (!l &&       squares[i - 1].classList.contains("bomb"))     count++;
      if (!r &&       squares[i + 1].classList.contains("bomb"))     count++;
      if (!b && !l && squares[i + w - 1].classList.contains("bomb")) count++;
      if (!b &&       squares[i + w].classList.contains("bomb"))     count++;
      if (!b && !r && squares[i + w + 1].classList.contains("bomb")) count++;
      square.setAttribute("data", count);
    }
  });
}

const endGame = () => {
  isGameOver = true;
  const bombs = document.querySelectorAll(".bomb");
  bombs.forEach(bomb => labelSquare(bomb));
  document.querySelector(".container").classList.add("lost");
}

const labelSquare = (square) => {

  if (square.classList.contains("bomb")) square.innerHTML = "💣"
  else {

    const count = square.getAttribute("data");
    square.innerHTML = count != 0 ? count : "";

    switch (count) {
      case "1":
        square.classList.add("one");
        break;
      case "2":
        square.classList.add("two");
        break;
      case "3":
        square.classList.add("three");
        break;
      case "4":
        square.classList.add("four");
        break;
      case "5":
        square.classList.add("five");
        break;
      case "6":
        square.classList.add("six");
        break;
      case "7":
        square.classList.add("seven");
        break;
      case "8":
        square.classList.add("eight");
        break;
    }
  }
}

const resetBoard = () => {

  isGameOver = false;
  document.querySelector(".container").classList.remove("lost");
  document.querySelector(".container").classList.remove("won");
  
  flagsLeft = bombQuantity;
  document.querySelector(".flags-display").innerHTML = flagsLeft;
  
  seconds = 0;
  document.querySelector(".time-display").innerHTML = seconds;

  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  const bombArray = Array(bombQuantity).fill("bomb");
  const emptyArray = Array(gameHeight * gameWidth - bombQuantity).fill("valid");
  const concatenatedArray = emptyArray.concat(bombArray);
  const shuffledArray = concatenatedArray.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < shuffledArray.length; i++) {

    const square = document.createElement("div");
    square.classList.add(className, "square", shuffledArray[i]);
    square.setAttribute("id", i);
    grid.appendChild(square);
    squares.push(square);

    square.addEventListener("click", () => clickSquare(square));
    square.oncontextmenu = function(e) {
      e.preventDefault();
      toggleFlag(square);
    }
  }

  countBombs();
}

const toggleFlag = (square) => {
  
  if (isGameOver || square.classList.contains("checked")) return;
  if (square.classList.contains("flag")) {
    square.classList.remove("flag");
    square.classList.add("maybe");
    square.innerHTML = "❓";
    flagsLeft++;
    document.querySelector(".flags-display").innerHTML = flagsLeft;
  } else if (square.classList.contains("maybe")) {
    square.classList.remove("maybe");
    square.innerHTML = "";
  } else {
    square.classList.add("flag");
    square.innerHTML = "🚩";
    flagsLeft--;
    document.querySelector(".flags-display").innerHTML = flagsLeft;
    if (flagsLeft === bombQuantity) checkWin();
  }
}

const updateTimer = () => {
  seconds++;
  document.querySelector(".time-display").innerHTML = seconds;
}

export const loadMinesweeper = () => {
  inititializeGame(title, className);
  buildBoard();
  document.querySelector(".reset-button").addEventListener("click", resetBoard);
  setInterval(updateTimer, 1000);
}

export default loadMinesweeper;
