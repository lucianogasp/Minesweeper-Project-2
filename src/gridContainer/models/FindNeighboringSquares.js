class FindNeighboringSquares {

  #Transcription; // UTILITY CLASS Transcription 
  #FilterSquares; // UTILITY CLASS FilterSquares
  #squares; // CLASS INSTANCE of Squares
  #patternsOperation; // UTILITIES: patters of the compute target coords method (Options Objetc)

  constructor(Transcription, FilterSquares, squares, patternsOperation) {
    this.#Transcription = Transcription;
    this.#FilterSquares = FilterSquares;
    this.#squares = squares;
    this.#patternsOperation = patternsOperation;
  }

  // Return the neighboring squares of a square
  findNeighboringSquares(element) {

    let [bombRowCoords, bombColumnCoords] = this.#Transcription.transcribeDataCoordToMatrix(element.dataset.coords);
    let targetMatrix = this.#computeTargetCoords(bombRowCoords, bombColumnCoords, this.#patternsOperation); // must return a matrix of the format [[x_coord, y_coord], ...] of the computed coordinates permutation
    let targetDataCoordArr = this.#Transcription.transcribeMatrixToDataCoord(targetMatrix);
    let targetElements = this.#FilterSquares.filterByNeighboringSquares(this.#squares.getSquareList(), targetDataCoordArr);

    return targetElements;
  }

  #computeTargetCoords(y_coord, x_coord, patternsOperation) {

    const arr = [];
    for (let i of patternsOperation.y_patternOperation) {
      for (let j of patternsOperation.x_patternOperation) {

        if ( patternsOperation.y_patternSkip.includes(i) && patternsOperation.x_patternSkip.includes(j) ) {
          continue;
        }
        let [targetYCoords, targetXCoords] = [y_coord + i, x_coord + j];
        arr.push([targetYCoords, targetXCoords]);
      }
    }

    return arr;
  };

}

export default FindNeighboringSquares;