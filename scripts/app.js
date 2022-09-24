let editedPlayer = 0;

const players = [
    {
        name: '',
        Symbol: 'X'
    },
    {
        name: '',
        Symbol: 'O'
    },
];

const overlayConfigElement = document.getElementById("overlay-config");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorElement = document.getElementById("input-error");

const editPlayer1BtnElement = document.getElementById("edit-player1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player2-btn");
const overlayCancelBtnElement = document.getElementById("overlay-cancel-btn");
const overlayConfirmBtnElement = document.getElementById("overlay-confirm-btn");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

overlayCancelBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", confirmPlayerConfig);
