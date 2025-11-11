const gameBoard = document.querySelector(".game-board");

const gameWinArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 5, 6],
];

let gameLogicArr = new Array(9).fill("E");

let turn = "O";

let totalCount = 0;

const checkWinner = (event) => {
  const element = event.target;
  const player1 = document.querySelector('img[alt="player1"]');
  const player2 = document.querySelector('img[alt="player2"]');
  if (turn === "O" && element.textContent === "") {
    totalCount++;
    player1.style.transform = "scale(0.8)";
    player2.style.transform = "scale(1)";
    element.textContent = turn;
    turn = "X";
    gameLogicArr[element.id] = "O";
    gameWinArr.forEach(([firstId, secondId, thirdId]) => {
      if (
        gameLogicArr[firstId] != "E" &&
        gameLogicArr[firstId] === gameLogicArr[secondId] &&
        gameLogicArr[secondId] === gameLogicArr[thirdId]
      ) {
        document.querySelector(
          ".res"
        ).textContent = `Winner is player ${gameLogicArr[firstId]}`;
        gameBoard.removeEventListener("click", checkWinner);
      }
    });
  } else if (turn === "X" && element.textContent === "") {
    totalCount++;
    player2.style.transform = "scale(0.8)";
    player1.style.transform = "scale(1)";
    element.textContent = turn;
    turn = "O";
    gameLogicArr[element.id] = "X";
    gameWinArr.forEach(([firstId, secondId, thirdId]) => {
      if (
        gameLogicArr[firstId] != "E" &&
        gameLogicArr[firstId] === gameLogicArr[secondId] &&
        gameLogicArr[secondId] === gameLogicArr[thirdId]
      ) {
        document.querySelector(
          ".res"
        ).textContent = `Winner is player ${gameLogicArr[firstId]}`;
        gameBoard.removeEventListener("click", checkWinner);
      }
    });
  }
  if (totalCount === 9) {
    document.querySelector(".res").textContent = `It's a Draw.`;
    gameBoard.removeEventListener("click", checkWinner);
  }
};

gameBoard.addEventListener("click", checkWinner);

const restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
  const ui = Array.from(document.getElementsByClassName("cell"));
  ui.forEach((ele) => {
    ele.textContent = "";
  });
  totalCount = 0;
  turn = "O";
  for (let i = 0; i < 9; i++) {
    gameLogicArr[i] = "E";
  }
  document.querySelector(".res").textContent = "";
  gameBoard.addEventListener("click", checkWinner);
});
