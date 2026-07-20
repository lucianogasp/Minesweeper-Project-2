import type Squares from "./Squares.ts";

class GameOver {

  private squares: Squares;

  constructor(squares: Squares) {
    this.squares = squares;  
  }

  // Validate first click bomb: handle cases
  validateClickBomb(element: HTMLElement): boolean {

    return element.dataset.type === 'bomb' ? true: false;
  }

  handleBombRedSquare(element: HTMLElement): void {

    element.classList.add('bomb-square-red');
  }

  revealingBombSquares(): void {

    this.squares.getSquareList().forEach(square => {
      if(square.dataset.type === 'bomb') {
        square.classList.replace('hidden', 'revealed');
      }
    });
  }

  handleIncorrectFlagSquare(): void {

    this.squares.getSquareList().forEach(square => {
      if(square.dataset.isFlagged === 'true' && square.dataset.type !== 'bomb') {
        square.classList.add('incorrect-flag-square');
      }
    });
  }

  validateEndGame(): boolean {

    for (let square of this.squares.getSquareList()) {
      if(square.dataset.type !== 'bomb' && square.classList.contains('hidden')) return false;
      if(square.dataset.type === 'bomb' && square.dataset.isFlagged === 'false') return false;
    }
    return true;
  }
}

export default GameOver;