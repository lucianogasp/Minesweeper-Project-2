class FlagCounter {

  #bombDiv; // DOM of bomb counter's container
  #squares; // INSTANCE CLASS of Squares
  #n_bombs; // Number of total of bombs remaining

  constructor(bombDiv, squares, n_bombs) {
    this.#bombDiv = bombDiv;
    this.#squares = squares;
    this.#n_bombs = n_bombs;
  }

  countFlags() {

    let flagsPlaced = 0;
    this.#squares.getSquareList().forEach( square => {

      if (square.dataset.isFlagged === 'true') {
        flagsPlaced++;
      }
    });

    const flagsRemaining = this.#n_bombs - flagsPlaced;
    return flagsRemaining;
  }

  update(flagsRemaining) {

    let counterFlagsRemaining = flagsRemaining.toString().padStart(2, "0");
    this.#bombDiv.textContent = `${counterFlagsRemaining}`;
  }
}

export default FlagCounter;