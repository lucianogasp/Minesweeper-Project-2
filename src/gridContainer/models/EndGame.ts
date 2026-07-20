import type Squares from "./Squares";

class EndGame {

  private squares: Squares

  constructor(squares: Squares) {
    this.squares = squares;
  }

  validateEndGame(): boolean {

    for (let square of this.squares.getSquareList()) {
      if(square.dataset.type !== 'bomb' && square.classList.contains('hidden')) return false;
      if(square.dataset.type === 'bomb' && square.dataset.isFlagged === 'false') return false;
    }
    return true;
  }
}

export default EndGame;