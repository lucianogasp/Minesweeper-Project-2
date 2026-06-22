class GameOver {

  #squares; // INSTANCE CLASS of Squares

  constructor(squares) {
    this.#squares = squares;  
  }

  // Validate first click bomb: handle cases
  validateClickBomb(element) {

    return element.dataset.type === 'bomb'? true: false;
  }

  handleBombRedSquare(element) {

    element.classList.add('bomb-square-red');
  }

  revealingBombSquares() {

    this.#squares.getSquareList().forEach( square => {
      if(square.dataset.type === 'bomb') {
        square.classList.replace('hidden', 'revealed');
      }
    });
  }

  handleIncorrectFlagSquare() {

    this.#squares.getSquareList().forEach( square => {
      if( square.dataset.isFlagged === 'true' && square.dataset.type !== 'bomb' ) {
        square.classList.add('incorrect-flag-square');
      }
    });
  }

  stopTimer(timer) {

    timer.stop();
  }
}

export default GameOver;