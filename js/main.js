import GameBoard from './GameBoard.js';'./GameBoard.js';

const onStartClick = () => {
  window.gameBoard.start();
}

const onStopClick = () => {
  window.gameBoard.stop();
}

const onTickRateSliderInput = (e) => {
  window.gameBoard.tickRateInMs = e.target.value;
  document.querySelector("#tick-rate-value").innerHTML = `Tick Rate in ms: ${e.target.value}`
}

const init = () => {
  const gameBoard = new GameBoard();
  window.gameBoard = gameBoard;
  gameBoard.createGameBoardElement();

  document.querySelector('#start-button').addEventListener('click', onStartClick);
  document.querySelector('#stop-button').addEventListener('click', onStopClick);
  document.querySelector('#tick-rate-slider').addEventListener('input', onTickRateSliderInput);
}

init();