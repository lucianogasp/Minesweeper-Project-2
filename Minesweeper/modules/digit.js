class Digit {

  #squares;

  constructor(squares) {
    this.#squares = squares;
  }

  filteringByNeighboringSquares(squaresArr, targetArr) {

    return squaresArr.filter( square => targetArr.includes(square.dataset.coords) );
  }

  filteringByNotBombSquares(targetArr) {

    return targetArr.filter( square => square.dataset.type !== 'bomb' );
  }

  incrementDigit(elementTarget) {
    
    elementTarget.dataset.digit = Number(elementTarget.dataset.digit) + 1;
  }

  setDigits() {

    this.#squares.getSquareList().forEach( square => {
      if (square.dataset.digit >= 1) {
        square.dataset.type = 'digit';
        square.innerHTML = `<span>${square.dataset.digit}</span>`;
      }
    })
  }

}

export default Digit;


// BACKUP CACHORRO

  // applyDigitsMethod(method, patternSkipArr, y_patternOperationArr, x_patternOperationArr) {

  //   this.#squares.getBombsList().forEach( elementArrBomb => {

  //     let dataCoordsTargetList = [];
  //     let [bombRowCoords, bombColumnCoords] = elementArrBomb.dataset.coord.split('-').map(coords => Number(coords));
  //     let targetNumbersCoordsList = method(bombRowCoords, bombColumnCoords, patternSkipArr, y_patternOperationArr, x_patternOperationArr); // must return a matrix of the format [[x_coord, y_coord], ...] of the computed permutation
  //     // console.log(targetNumbersCoordsList); //TEST
  //     Transcription.transcribeMatrixToDataCoord()
  //     this.#squares.getSquareList()
  //       .filter( elementArrSquare => dataCoordsTargetList.includes(elementArrSquare.dataset.coords) )
  //       .filter( elementDataCoordsTarget => elementDataCoordsTarget.dataset.type !== 'bomb' )
  //       .map( elementTarget => this.#incrementDigit(elementTarget) );
  //   });
  // }