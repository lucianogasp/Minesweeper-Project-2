class Bomb {

  #bomb_ratio; // Ratio of bombs
  #n_bomb; // Number of bombs
  #squares; // CLASS INSTANCE of Squares

  constructor(bomb_ratio, n_square, squares) {
    this.#bomb_ratio = bomb_ratio;
    this.#n_bomb = Math.round(this.#bomb_ratio * n_square);
    this.#squares = squares;
  }

  // Suffle squares list using a shuffled method
  shuffleSquareMethod(arr, method) {

    return method(arr);
  }

  // Slicing shuffled squares list into a bombs list by the Ratio of bombs
  sliceBombsList() {

    return this.#squares.getShuffledSquareList().slice(0, this.#n_bomb);
  }

  // Implanting bombs at the shuffled list of squares
  setBombs() {

    this.#squares.getBombsList().forEach( square => {
      square.dataset.type = 'bomb';
    })
  }

}

export default Bomb;