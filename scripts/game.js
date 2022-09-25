function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players");
    return;
  }
  gameBoardElement.style.display = "Block";
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

  if (event.target.tagName !== "LI") {
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
  console.log(gameData);

  checkWinner(rowNum, colNum);
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
    if (colIndex > gameData.length-1) {
      gameResultElement.style.display = "block";
      winner.textContent = players[activePlayer].name;
      return;
    }
  }
//checking for inverted diagonal

  if (colNum == gameData.length-rowNum-1) {

    let colIndex = gameData.length-1;
    for (let arr of gameData) {
      if (activePlayer +1 === arr[colIndex]) {
        if (colIndex >= 0) {
          colIndex--;
        }
      } else {
        break;
      }
    }
    
    if (colIndex < 0) {
        gameResultElement.style.display = "block";
        winner.textContent = players[activePlayer].name;
        return;
    }
  }

  //checking for vertical

  for (let i = 0; i < gameData.length; i++) {
    if (activePlayer+1 !== gameData[i][colNum]) {
      break;
    }
    if (i >= 2) {
        gameResultElement.style.display = "block";
        winner.textContent = players[activePlayer].name;
        return;
    }
  }
  //checking for horizontal
  for (let i = 0; i < gameData.length; i++) {
    if (activePlayer +1 !== gameData[rowNum][i]) {
      break;
    }
    if (i >= gameData.length-1) {
        gameResultElement.style.display = "block";
        winner.textContent = players[activePlayer].name;
        return;
    }
  }
  
  if (turn === 9) {
    console.log("Draw");
  }
}
