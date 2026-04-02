class Digit {

  #filterSquares;
  #findNeighboringSquares;
  #squares;

  constructor(FilterSquares, FindNeighboringSquares, squares) {
    this.#filterSquares = FilterSquares;
    this.#findNeighboringSquares = FindNeighboringSquares;
    this.#squares = squares;
  }

  applyDigitsMethod() {

    this.#squares.getBombsList().forEach(elementArrBomb => {

      let targetElements = this.#findNeighboringSquares.findNeighboringSquares(elementArrBomb);
      targetElements = this.#filterSquares.filterByNotBombSquares(targetElements);

      targetElements.forEach(elementTarget => this.#incrementDigit(elementTarget));
    });

  }

  #incrementDigit(elementTarget) {
    
    elementTarget.dataset.digit = Number(elementTarget.dataset.digit) + 1;
  }

  setDigits() {

    this.#squares.getSquareList().forEach( square => {
      if (square.dataset.digit >= 1) {
        square.dataset.type = 'digit';
        square.innerHTML = `<span>${square.dataset.digit}</span>`;
      }
    });
  }

}

export default Digit;
