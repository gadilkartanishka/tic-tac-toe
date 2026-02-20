const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
let currentPlayer = "X";
let gameStatus = true;
const winningCells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let scores = JSON.parse(localStorage.getItem("gameScores")) || {
  X: 0,
  O: 0,
};
xScore.innerText = scores.X;
oScore.innerText = scores.O;
restartBtn.addEventListener("click", () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  const oldMessage = document.querySelector(".message");
  if (oldMessage) oldMessage.remove();
  currentPlayer = "X";
  gameStatus = true;
});
const checkDraw = () => {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      return false;
    }
  }
  return true;
};

const checkWinner = () => {
  for (let i = 0; i < winningCells.length; i++) {
    let winner = true;
    for (let j = 0; j < winningCells[i].length; j++) {
      let currentCell = winningCells[i][j];
      if (cells[currentCell].textContent !== currentPlayer) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return true;
    }
  }

  return false;
};
const handleClick = (cell) => {
  if (cell.textContent !== "" || !gameStatus) return;
  cell.textContent = currentPlayer;
  if (checkWinner()) {
    scores[currentPlayer] += 1;
    localStorage.setItem("gameScores", JSON.stringify(scores));
    xScore.innerText = scores.X;
    oScore.innerText = scores.O;
    const winnerLine = document.createElement("h3");
    winnerLine.classList.add("message");
    winnerLine.innerText = `${currentPlayer} WINS!!`;
    const heading = document.querySelector(".wrapper h1");
    heading.insertAdjacentElement("afterend", winnerLine);
    gameStatus = false;
    return;
  }
  if (checkDraw()) {
    const drawLine = document.createElement("h3");
    drawLine.innerText = "Its a draw :|";
    drawLine.classList.add("message");
    const heading = document.querySelector(".wrapper h1");
    heading.insertAdjacentElement("afterend", drawLine);
    gameStatus = false;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleClick(cell));
});
