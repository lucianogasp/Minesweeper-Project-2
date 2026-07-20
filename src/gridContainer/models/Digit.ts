import IncrementDigitError from "@/errorHandler/models/IncrementDigitError.ts";

import type FilterSquares from "@/utils/models/FilterSquares.ts";
import type FindNeighboringSquares from "./FindNeighboringSquares.ts";
import type Squares from "./Squares.ts";

class Digit {

  private filterSquaresClass: typeof FilterSquares;
  private findNeighboringSquares: FindNeighboringSquares;
  private squares: Squares;

  constructor(FilterSquaresClass: typeof FilterSquares, FindNeighboringSquares: FindNeighboringSquares, squares: Squares) {
    this.filterSquaresClass = FilterSquaresClass;
    this.findNeighboringSquares = FindNeighboringSquares;
    this.squares = squares;
  }

  applyDigitsMethod(): void {

    this.squares.getBombsList().forEach(elementArrBomb => {

      let targetElements = this.findNeighboringSquares.findNeighboringSquares(elementArrBomb);
      targetElements = this.filterSquaresClass.filterByNotBombSquares(targetElements);

      targetElements.forEach(elementTarget => this.incrementDigit(elementTarget));
    });

  }

  private incrementDigit(elementTarget: HTMLElement): void {

    const elementDigitAttr = elementTarget.dataset.digit;

    if (elementDigitAttr === undefined) {
      throw new IncrementDigitError('The digit attribute of the square element is undefined. Must be a string "" to increment a digit by the method incrementDigit()', true);
    }

    const elementDigit = Number(elementDigitAttr) + 1;
    elementTarget.dataset.digit = elementDigit.toString();
  }

  setDigits(): void {

    this.squares.getSquareList().forEach( square => {
      const squareDigitAttr = square.dataset.digit;

      if (squareDigitAttr === undefined) {
        throw new Error('charlesJonhson');
      }
      if (Number(squareDigitAttr) >= 1) {
        square.dataset.type = 'digit';
        square.innerHTML = `<span>${squareDigitAttr}</span>`;
      }
    });
  }

}

export default Digit;
