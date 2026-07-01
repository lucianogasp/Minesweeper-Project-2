class GameOver {

  #squares; // INSTANCE CLASS of Squares

  constructor(squares) {
    this.#squares = squares;  
  }

  // Validate first click bomb: handle cases
  validateClickBomb(element) {

    return element.dataset.type === 'bomb' ? true: false;
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

  validateEndGame() {

    for ( let [index, square] of this.#squares.getSquareList().entries() ) {
      if ( square.dataset.type !== 'bomb' && square.classList.contains('hidden') ) { return; }
      if ( square.dataset.type === 'bomb' && square.dataset.isFlagged === 'false' ) { return; }

      if ( index === this.#squares.getSquareList().length - 1 ) alert('The game was ended!!!');
    }
  }
}

export default GameOver;