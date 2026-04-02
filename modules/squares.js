class Squares {

  #squareList;
  #shuffledSquareList;
  #bombsList;

  constructor(squareList) {
    this.#squareList = squareList;
    this.#shuffledSquareList = undefined;
    this.#bombsList = undefined;
  }

  getSquareList() {
    return this.#squareList;
  }
  setSquaresList(newSquareList) {
    this.#squareList = newSquareList;
  }

  getShuffledSquareList() {
    return this.#shuffledSquareList;
  }
  setShuffledSquareList(newShuffledList) {
    this.#shuffledSquareList = newShuffledList;
  }

  getBombsList() {
    return this.#bombsList;
  }
  setBombsList(newBombsList) {
    this.#bombsList = newBombsList;
  }
}

export default Squares;