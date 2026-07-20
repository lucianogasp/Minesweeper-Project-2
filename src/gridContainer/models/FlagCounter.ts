import type Squares from "./Squares.ts";

class FlagCounter {

  private bombDiv: HTMLDivElement;
  private squares: Squares;
  private n_bombs: number;

  constructor(bombDiv: HTMLDivElement, squares: Squares, n_bombs: number) {
    this.bombDiv = bombDiv;
    this.squares = squares;
    this.n_bombs = n_bombs;
  }

  countFlaggedSquares(): number {

    let flagsPlaced = 0;
    this.squares.getSquareList().forEach( square => {

      if (square.dataset.isFlagged === 'true') {
        flagsPlaced++;
      }
    });

    const flagsRemaining = this.n_bombs - flagsPlaced;
    return flagsRemaining;
  }

  update(flagsRemaining: number): void {

    let totalFlagsRemaining = flagsRemaining.toString().padStart(2, "0");
    this.bombDiv.textContent = `${totalFlagsRemaining}`;
  }
}

export default FlagCounter;