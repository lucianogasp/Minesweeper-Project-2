class GameOver {

  #squares;

  constructor(squares) {
    this.#squares = squares;
  }

  validateFirstClickBomb(element) {

    if (element.dataset.type === 'bomb') {

      this.#handleBombRedSquare(element);
      this.#revealingBombSquares();
      this.#handleIncorrectFlagSquare(element);
    }
  }

  #handleBombRedSquare(element) {

    element.classList.add('bomb-square-red');
  }

  #revealingBombSquares() {

    this.#squares.getSquareList().forEach( square => {
      if(square.dataset.type === 'bomb') {
        square.classList.replace('hidden', 'revealed');
      }
    });
  }

  #handleIncorrectFlagSquare() {

    this.#squares.getSquareList().forEach( square => {
      if( square.dataset.isFlagged === 'true' && square.dataset.type !== 'bomb' ) {
        square.classList.add('incorrect-flag-square');
      }
    });
  }

}

export default GameOver;