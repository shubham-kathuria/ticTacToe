function resetGameStatus() {
  activePlayer = 0;
  turn = 1;
  gameIsOver = false;
  gameResultElement.firstElementChild.innerHTML =
    'You won, <span id="winnerName">Player Name</span>!';
  gameResultElement.style.display = "none";
  turnDisplayElement.style.display = "block";


  let gameBoardIndex = 0;
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData.length; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players");
    return;
  }
  resetGameStatus();
  gameAreaElement.style.display = "Block";
  activePlayerElement.textContent = players[activePlayer].name;
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerElement.textContent = players[activePlayer].name;
}

function selectGameTile(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedTile = event.target;
  const colNum = selectedTile.dataset.col;
  const rowNum = selectedTile.dataset.row;

  if (gameData[rowNum][colNum] > 0) {
    alert("Please select empty tile");
    return;
  }

  selectedTile.textContent = players[activePlayer].Symbol; //player[0]
  selectedTile.classList.add("disabled");

  gameData[rowNum][colNum] = activePlayer + 1;

  const winnerId = checkWinner(rowNum, colNum);
  if (winnerId != 0) {
    endGame(winnerId);
  }
  turn++;
  switchPlayer();
}

function checkWinner(rowNum, colNum) {
  //checking for diagonal
  if (rowNum === colNum) {
    let colIndex = 0;
    for (let arr of gameData) {
      if (activePlayer + 1 === arr[colIndex]) {
        if (colIndex < gameData.length) {
          colIndex++;
        }
      } else {
        break;
      }
    }
    if (colIndex > gameData.length - 1) {
      return activePlayer + 1;
    }
  }
  //checking for inverted diagonal

  if (colNum == gameData.length - rowNum - 1) {
    let colIndex = gameData.length - 1;
    for (let arr of gameData) {
      if (activePlayer + 1 === arr[colIndex]) {
        if (colIndex >= 0) {
          colIndex--;
        }
      } else {
        break;
      }
    }

    if (colIndex < 0) {
      return activePlayer + 1;
    }
  }

  //checking for vertical

  for (let i = 0; i < gameData.length; i++) {
    if (activePlayer + 1 !== gameData[i][colNum]) {
      break;
    }
    if (i >= 2) {
      return activePlayer + 1;
    }
  }
  //checking for horizontal
  for (let i = 0; i < gameData.length; i++) {
    if (activePlayer + 1 !== gameData[rowNum][i]) {
      break;
    }
    if (i >= gameData.length - 1) {
      return activePlayer + 1;
    }
  }

  if (turn === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameResultElement.style.display = "block";
  turnDisplayElement.style.display = "none";

  if (winnerId > 0) {
    winner.textContent = players[winnerId - 1].name;
  } else {
    gameResultElement.firstElementChild.textContent = "It's a draw!";
  }
}
