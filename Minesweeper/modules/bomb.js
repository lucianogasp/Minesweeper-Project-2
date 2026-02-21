class Bomb {

  #bomb_ratio;
  #n_bomb;
  #squares;

  constructor(bomb_ratio, n_square, squares) {
    this.#bomb_ratio = bomb_ratio;
    this.#n_bomb = Math.round(this.#bomb_ratio * n_square);
    this.#squares = squares;
  }

  // Using to aply bombs at the squares by randomized method
  shuffleSquareMethod(arr, method) { // PARAMETERS: Iterrable of squares, shuffle method

    return method(arr);
  }

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