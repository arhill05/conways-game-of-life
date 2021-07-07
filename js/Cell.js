export default class Cell {
  constructor() {
    this.boundHtmlElement = document.createElement('span');
    this.boundHtmlElement.classList.add('cell');
    this.boundHtmlElement.classList.add('dead');
    this.boundHtmlElement.addEventListener('click', this.onCellClick)
  }

  _xPosition = 0;
  _yPosition = 0;
  isAlive = false;
  boundHtmlElement = null;

  set xPosition(value) {
    this._xPosition = value;
    this.updateHtmlElement();
  }

  get xPosition() {
    return this._xPosition;
  }

  set yPosition(value) {
    this._yPosition = value;
    this.updateHtmlElement();
  }

  get yPosition() {
    return this._yPosition;
  }


  updateHtmlElement = () => {
    this.boundHtmlElement.id = `x${this.xPosition}-y${this.yPosition}`
    this.boundHtmlElement.dataset.xPosition = this.xPosition;
    this.boundHtmlElement.dataset.yPosition = this.yPosition;
    // this.boundHtmlElement.innerHTML = `${this.xPosition}, ${this.yPosition}`;
  }

  kill = () => {
    this.isAlive = false;
    this.boundHtmlElement.classList.remove('alive');
    this.boundHtmlElement.classList.add('dead');
  }

  revive = () => {
    this.isAlive = true;
    this.boundHtmlElement.classList.remove('dead');
    this.boundHtmlElement.classList.add('alive');
  }

  onCellClick = () => {
    if (this.isAlive) {
      this.kill();
    } else {
      this.revive();
    }
  }
}