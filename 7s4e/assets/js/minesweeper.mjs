/* wdd131/7s4e/assets/js/minesweeper.js */

// const buildConsole = () = {

// }

const init = (title, className) => {
  const gameTitle = document.querySelector(".game-title");
  gameTitle.classList.add(className);
  gameTitle.innerHTML = title;

  const gameSpace = document.querySelector(".game-space");
  gameSpace.classList.add(className);
}

export const loadMinesweeper = () => {
  const title = "Minesweeper";
  const className = title.replace(/\s+/g, '-').toLowerCase();

  init(title, className);

  // build

  // const console = document.createElement("div");

}

export default loadMinesweeper;

// div class="container"
//     div class="grid" /div 
//     div Flags left: span id='flags-left' /span /div 
//     div id="result" /div 
//   /div 



// document.addEventListener("DOMContentLoaded", () => {
//   const grid = document.querySelector(".grid");
//   let width = 8;
//   let height = width;
//   const squares = [];
//   let bombTotal = 10;
//   let flags = 0;
//   let isGameOver = false;

//   function createBoard() {
//     const bombArray = Array(bombTotal).fill("bomb");
//     const emptyArray = Array(height * width - bombTotal).fill("valid");
//     const gameArray = emptyArray.concat(bombArray);
//     const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

//     for (let i = 0; i < height * width; i++) {
//       const square = document.createElement("div");
//       square.setAttribute("id", i);
//       square.classList.add(shuffledArray[i]);
//       grid.appendChild(square);
//       squares.push(square);

//       square.addEventListener("click", (e) => {
//         click(square)
//       })

//       square.oncontextmenu = function(e) {
//         e.preventDefault();
//         addFlag(square);
//       }
//     }

//     for (let i = 0; i < squares.length; i++) {
//       let count = 0;
//       const isOnLft = i % width === 0;
//       const isOnRgt = i % width === 9;
//       const isOnTop = i < width;
//       const isOnBtm = i >= squares.length - width;

//       if (!isOnTop && !isOnLft && squares[i - width - 1].classList.contains("bomb")) count++;
//       if (!isOnTop && squares[i - width].classList.contains("bomb")) count++;
//       if (!isOnTop && !isOnRgt && squares[i - width + 1].classList.contains("bomb")) count++;
//       if (!isOnLft && squares[i - 1].classList.contains("bomb")) count++;
//       if (!isOnRgt && squares[i + 1].classList.contains("bomb")) count++;
//       if (!isOnBtm && !isOnLft && squares[i + width - 1].classList.contains("bomb")) count++;
//       if (!isOnBtm && squares[i + width].classList.contains("bomb")) count++;
//       if (!isOnBtm && !isOnRgt && squares[i + width + 1].classList.contains("bomb")) count++;
//       squares[i].setAttribute("data", count);

//     }

//   }

//   createBoard();

//   function addFlag(square) {
//     if (isGameOver) return;
//     if (square.classList.contains("checked") && (flags < bombTotal)) {
//       if (!square.classList.contains("flag")) {
//         square.classList.add("flag");
//         square.innterHTML = "flag emoticon";
//         flags++;
//         checkWin();
//       } else {
//         square.classList.remove("flag");
//         square.innterHTML = "";
//         flags--;
//       }
//     }
//   }

//   function click(square) {
//     let currentId = square.id;
//     if (isGameOver) return;
//     if (square.classList.contains("checked") || square.classList.contains("flag")) return;
//     if (square.classList.contains("bomb")) endGame();
//     else {
//       let count = square.getAttribute("data");
//       if (count != 0) {
//         square.classList.add("checked");
//         square.innterHTML = count;
//         return;
//       }
//       checkSquare(square, currentId);
//     }
//     square.classList.add("checked");

//   }
  
//   function checkSquare(square, currentId) {
//     const isOnLft = i % currentId === 0;
//     const isOnRgt = i % currentId === 9;
//     const isOnTop = i < currentId;
//     const isOnBtm = i >= squares.length - currentId;

//     setTimeout(() => {
//       if (currentId > 0 && !isOnLft) {
//         const newId = squares[parseInt(currentId) - 1].id;
//       }
//       if (currentId > 0 && !isOnLft) {
//         const newId = squares[parseInt(currentId) - 1].id;
//       }
//       if (currentId > 0 && !isOnLft) {
//         const newId = squares[parseInt(currentId) - 1].id;
//       }
//       const newSquare = document.querySelector("#newId");
//       click(newSquare);

//     }, 10)
//   }

//   function endGame(square) {
//     isGameOver = true;

//     square.forEach(square => {
//       if (square.classList.contains("bomb")) {
//         square.innterHTML = "bomb emoticon";
//       }
      
//     });
//   }

//   function checkWin() {
//     let matches = 0;
//     for (let i = 0; i < squares.length; i++) {
//       if (squares[i].classList.contains("flag") && squares[i].classList.contains("bomb")) {
//         matches++;
//       }
//       if (matches === bombTotal) console.log("WIN");
//       isGameOver = true;
//     }
//   }

// });


/*
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')
  let width = 10
  let bombAmount = 20
  let flags = 0
  let squares = []
  let isGameOver = false

  //create Board
  function createBoard() {
    flagsLeft.innerHTML = bombAmount

    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normal click
      square.addEventListener('click', function(e) {
        click(square)
      })

      //cntrl and left click
      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width -1)

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
        if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
        if (i > 10 && squares[i -width].classList.contains('bomb')) total ++
        if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
        if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
        if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
        if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
        if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
        squares[i].setAttribute('data', total)
      }
    }
  }
  createBoard()

  //add Flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags ++
        flagsLeft.innerHTML = bombAmount- flags
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
        flagsLeft.innerHTML = bombAmount- flags
      }
    }
  }

  //click on square actions
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
      gameOver(square)
    } else {
      let total = square.getAttribute('data')
      if (total !=0) {
        square.classList.add('checked')
        if (total == 1) square.classList.add('one')
        if (total == 2) square.classList.add('two')
        if (total == 3) square.classList.add('three')
        if (total == 4) square.classList.add('four')
        square.innerHTML = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }


  //check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width -1)

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1].id
        //const newId = parseInt(currentId) - 1   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 -width].id
        //const newId = parseInt(currentId) +1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId -width)].id
        //const newId = parseInt(currentId) -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 -width].id
        //const newId = parseInt(currentId) -1 -width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1].id
        //const newId = parseInt(currentId) +1   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1 +width].id
        //const newId = parseInt(currentId) -1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) +1 +width].id
        //const newId = parseInt(currentId) +1 +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) +width].id
        //const newId = parseInt(currentId) +width   ....refactor
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

  //game over
  function gameOver(square) {
    result.innerHTML = 'BOOM! Game Over!'
    isGameOver = true

    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣'
        square.classList.remove('bomb')
        square.classList.add('checked')
      }
    })
  }

  //check for win
  function checkForWin() {
    ///simplified win argument
  let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bombAmount) {
        result.innerHTML = 'YOU WIN!'
        isGameOver = true
      }
    }
  }
})

*/