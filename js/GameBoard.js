import Cell from "./Cell.js";
import RuleEvaluator from "./ConwayRulesEvaluator.js";

export default class GameBoard {
  _defaultTickRate = 250;
  _defaultXAxisSize = 50;
  _defaultYAxisSize = 50;
  _boundHtmlElement;
  _cells = [];
  _gameInterval = null;
  _tickRateInMs = this._defaultTickRate;
  _isStarted = false;

  constructor() {
    this._boundHtmlElement = document.getElementById("game-board");
  }

  xAxisSize = this._defaultXAxisSize;
  yAxisSize = this._defaultYAxisSize;

  set tickRateInMs(value) {
    this._tickRateInMs = value;
    if (this._isStarted) {
      this.stop();
      this.start();
    }
  }

  createGameBoardElement = () => {
    this.updateCssVariablesForAxisSizes();
    const gameBoardContainer = this._boundHtmlElement;
    for (let xAxis = 0; xAxis < this.xAxisSize; xAxis++) {
      for (let yAxis = 0; yAxis < this.yAxisSize; yAxis++) {
        const cell = new Cell();
        cell.xPosition = xAxis;
        cell.yPosition = yAxis;
        gameBoardContainer.appendChild(cell.boundHtmlElement);
        this._cells.push(cell);
      }
    }

    this._cells.forEach((cell) => (cell.neighbors = this.getNeighbors(cell)));
  };

  updateCssVariablesForAxisSizes = () => {
    let root = document.documentElement;
    root.style.setProperty("--xAxisSize", this.xAxisSize);
    root.style.setProperty("--yAxisSize", this.yAxisSize);
  };

  evaluateCells = () => {
    const ruleEvaluator = new RuleEvaluator();

    const cellsToKill = this._cells.filter(
      (cell) =>
        cell.isAlive && ruleEvaluator.shouldDie(cell, this.getNeighbors(cell))
    );
    const cellsToRevive = this._cells.filter(
      (cell) =>
        !cell.isAlive &&
        ruleEvaluator.shouldRevive(cell, this.getNeighbors(cell))
    );

    cellsToKill.forEach((cell) => cell.kill());
    cellsToRevive.forEach((cell) => cell.revive());
  };

  start = () => {
    this._gameInterval = setInterval(this.evaluateCells, this._tickRateInMs);
    this._isStarted = true;
  };

  stop = () => {
    clearInterval(this._gameInterval);
    this._isStarted = false;
  };

  clear = () => {
    if (this._gameInterval) {
      clearInterval(this._gameInterval);
    }
    this._cells.forEach((cell) => cell.kill());
  };

  getNeighbors = (cell) => {
    if (cell.neighbors && cell.neighbors.length) {
      return cell.neighbors;
    }

    const minimumXPosition = cell.xPosition - 1;
    const maximumXPosition = cell.xPosition + 1;
    const minimumYPosition = cell.yPosition - 1;
    const maximumYPosition = cell.yPosition + 1;

    const neighbors = this._cells.filter(
      (c) =>
        c.xPosition >= minimumXPosition &&
        c.xPosition <= maximumXPosition &&
        c.yPosition >= minimumYPosition &&
        c.yPosition <= maximumYPosition &&
        c !== cell
    );

    cell.neighbors = neighbors;

    return neighbors;
  };
}
