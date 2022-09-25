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

  event.target.textContent = players[activePlayer].Symbol; //player[0]
  event.target.classList.add("disabled");
  switchPlayer();
}
