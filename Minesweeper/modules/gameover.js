class GameOver {

  #squares;

  constructor(squares) {
    this.#squares = squares;
  }

  validateClickBomb(element) {

    return element.dataset.type === 'bomb' ? true : false;
  }

  handleBombRedSquare(element) {
    element.classList.add('bomb-square-red');
  }

  handleIncorrectFlagSquare() {
    this.#squares.getSquareList().forEach( square => {
      if(square.dataset.isFlagged === 'true' && square.dataset.type === 'bomb') {
        square.classList.add('incorrect-flag-square');
      }
    });
  }

}

export default GameOver;