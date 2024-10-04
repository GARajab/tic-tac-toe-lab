/*-------------------------------- Constants --------------------------------*/
// this is the winning combos
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
]
/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""]
let turn = "X"
let winner = false
let tie = false
let currentPlayer = "X"
let xWinCount = 0
let oWinCount = 0
let tieNumbersCounter = 0
let tries = 3
/*------------------------ Cached Element References ------------------------*/
const bodyModified = document.querySelector("body")
const toggleButton = document.getElementById("toggle-theme")
const body = document.body
const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.querySelector("#message")
const boards = document.querySelectorAll(".board")
const animatedReset = document.getElementById("reset")
const xScoreVal = document.getElementById("xScore")
const oScoreVal = document.getElementById("oScore")
const xPlayColor = document.getElementById("plX")
const oPlayColor = document.getElementById("plO")
const tieEl = document.getElementById("labelTie")
const tieNumbersCounterEl = document.getElementById("tieNumbers")
const backgroundImage = document.getElementById("background-image")
const gameOverOO = document.getElementById("gameOverO")
const gameOverXX = document.getElementById("gameOverX")
const triesEl = document.getElementById("tries")
let winningCombination = []

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ["", "", "", "", "", "", "", "", ""]
  turn = "X"
  winner = false
  tie = false
  currentPlayer = "X"
  rstWinColorBack()
  showHideResetBtn()
  render()
  xPlayColor.style.color = "white"
  xPlayColor.style.fontWeight = "bold"
  tieEl.style.color = "white"
  if (tries === 0) {
    tries = 3
  }
}

const render = () => {
  updateBoard()
  updateMessage()
}
const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    const squareEl = squareEls[i]
    squareEl.textContent = board[i]
  }
}

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.innerHTML = ""
  } else if (winner === false && tie === true) {
    messageEl.innerHTML = "It Is Tie Please Try Again!"
    showItIsTie()
    showHideResetBtn()
    tieNumbersCounter++
    tries--
    triesEl.innerHTML = tries
    tieNumbersCounterEl.innerHTML = `Score Is: ${tieNumbersCounter}`
    tieEl.style.color = "#EF476F"
    oPlayColor.style.color = "white"
    xPlayColor.style.color = "white"
  } else {
    messageEl.innerHTML = `<img src=/images/fest-bgrmvd.png>  Player ( ${turn} ) Won!  <img src=/images/fest-bgrmvd.png>`
    showHideResetBtn()
    showHideGameOver()
  }
}

const handleClick = (event) => {
  // Obtain the index of the clicked square
  const squareIndex = parseInt(event.target.id)

  // Check if the square is already taken or the game is over
  if (board[squareIndex] !== "" || winner) {
    return
  }

  // Update the board with the current player's move
  board[squareIndex] = currentPlayer

  checkForWinner()
  checkForTie()
  // switch between x and o
  currentPlayer = currentPlayer === "X" ? "O" : "X"

  updateBoard()
  placePiece(squareIndex)
  switchPlayerTurn()
  updateMessage()
}

// fill board array with the turns whither x or o
const placePiece = (index) => {
  board[index] = turn
}

// check if it is winning combination and the related function to congrats the winner
const checkForWinner = () => {
  // for if loop to get the winning criteria no blank and a=b and a=c and b=c
  for (let combo of winningCombos) {
    const [a, b, c] = combo
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = true
      winningCombination = [a, b, c]
      highlightWinningCombination()
      winnerCounter()
      confetti()
      break
    }
  }
}

const checkForTie = () => {
  tie = !winner && board.every((square) => square !== "")
}

// change the colors of the player name
const switchPlayerTurn = () => {
  if (winner) {
    return
  } else {
    if (turn === "X") {
      turn = "O"
      oPlayColor.style.color = "#EF476F"
      xPlayColor.style.color = "white"
    } else if (turn === "O") {
      turn = "X"
      xPlayColor.style.color = "#EF476F"
      oPlayColor.style.color = "white"
    }
  }
}

const winnerCounter = () => {
  if (currentPlayer === "X") {
    xWinCount++
    tries--
  } else if (currentPlayer === "O") {
    oWinCount++
    tries--
  }

  oScoreVal.innerHTML = `Score Is: ${oWinCount}`
  xScoreVal.innerHTML = `Score Is: ${xWinCount}`
  triesEl.innerHTML = tries
}

// auto hide and show the reset switch no need to keep it while playing
const showHideResetBtn = () => {
  if (animatedReset.style.display === "none") {
    animatedReset.style.display = ""
  } else {
    oPlayColor.style.color = "white"
    xPlayColor.style.color = "white"
    animatedReset.style.display = "none"
  }
}

// add show to the css property to cover the page with picture of it is tie
const showItIsTie = () => {
  if (tie) {
    backgroundImage.classList.add("show")
    setTimeout("backgroundImage.classList.remove('show')", 3000)
  } else {
    return
  }
}

// to highlight the 3 winning combination
const highlightWinningCombination = () => {
  for (let index of winningCombination) {
    const cell = document.getElementById(`${index}`)
    cell.style.backgroundColor = "lightgreen"
  }
}

// reset the default colors and contents
const rstWinColorBack = () => {
  for (let i = 0; i < board.length; i++) {
    const cell = document.getElementById(`${i}`)
    cell.style.backgroundColor = ""
    cell.textContent = ""
  }
}

const showHideGameOver = () => {
  console.log(tries)
  if (tries === 0) {
    if (currentPlayer === "X") {
      gameOverOO.classList.add("show")
      setTimeout("gameOverOO.classList.remove('show')", 3000)
      // tries = 3
    } else if (currentPlayer === "O") {
      console.log("ni")

      gameOverXX.classList.add("show")
      setTimeout("gameOverXX.classList.remove('show')", 3000)
      // tries = 3
    }
  }
}
/*----------------------------- Event Listeners -----------------------------*/
boards.forEach((cell) => {
  cell.addEventListener("click", handleClick)
})
animatedReset.addEventListener("click", init)
const setTheme = (theme) => (document.documentElement.className = theme)
/*----------------------------- random codes-----------------------------*/
