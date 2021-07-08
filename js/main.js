import GameBoard from "./GameBoard.js";

const onStartClick = () => {
  window.gameBoard.start();
};

const onStopClick = () => {
  window.gameBoard.stop();
};

const onClearClick = () => {
  window.gameBoard.clear();
};

const onTickRateSliderInput = (e) => {
  window.gameBoard.tickRateInMs = e.target.value;
  document.querySelector("#tick-rate-value").innerHTML = `${e.target.value}`;
};

const onGridSizeSliderInput = (e) => {
  window.gameBoard.xAxisSize = e.target.value;
  window.gameBoard.yAxisSize = e.target.value;
  document.querySelector("#grid-size-value").innerHTML = `${e.target.value}`;
  window.gameBoard.createGameBoardElement();
};

const init = () => {
  const gameBoard = new GameBoard();
  window.gameBoard = gameBoard;
  window.gameBoard.createGameBoardElement();

  document.querySelector("#stop-button").addEventListener("click", onStopClick);

  document
    .querySelector("#start-button")
    .addEventListener("click", onStartClick);

  document
    .querySelector("#clear-button")
    .addEventListener("click", onClearClick);

  document
    .querySelector("#tick-rate-slider")
    .addEventListener("input", onTickRateSliderInput);

  document
    .querySelector("#grid-size-slider")
    .addEventListener("change", onGridSizeSliderInput);
};

init();
