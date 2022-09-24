function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid; //+'1' => 1
  console.log(editedPlayer);
  overlayConfigElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  overlayConfigElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function confirmPlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("userName").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorElement.textContent = "Entered name is not valid";
    return;
  }
  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
