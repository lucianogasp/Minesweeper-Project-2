import type Squares from "./Squares.ts";

class Bomb {

  private bomb_ratio: number;
  private n_bomb: number;
  private squares: Squares;

  constructor(bomb_ratio: number, n_square: number, squares: Squares) {
    this.bomb_ratio = bomb_ratio;
    this.n_bomb = Math.round(this.bomb_ratio * n_square);
    this.squares = squares;
  }

  getN_Bomb(): number {

    return this.n_bomb;
  }

  // Suffle squares list using a shuffled method
  shuffleSquareMethod<T>(arr: T[], method: (args: T[]) => T[] ): T[] {

    return method(arr);
  }

  // Slicing shuffled squares list into a bombs list by the Ratio of bombs
  sliceBombsList(): HTMLElement[] {

    return this.squares.getShuffledSquareList().slice(0, this.n_bomb);
  }

  // Implanting bombs at the shuffled list of squares
  setBombs(): void {

    this.squares.getBombsList().forEach( (square: HTMLElement) => {
      square.dataset.type = 'bomb';
    })
  }

}

export default Bomb;