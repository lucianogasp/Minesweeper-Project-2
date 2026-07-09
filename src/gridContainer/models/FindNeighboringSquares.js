class FindNeighboringSquares {

  #Transcription; // UTILITY CLASS Transcription 
  #FilterSquares; // UTILITY CLASS FilterSquares
  #squares; // CLASS INSTANCE of Squares
  #computeTargetCoords; // UTILITIES: compute target coords method
  #patternsOperation; // UTILITIES: patters of the compute target coords method (Options Objetc)

  constructor(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation) {
    this.#Transcription = Transcription;
    this.#FilterSquares = FilterSquares;
    this.#squares = squares;
    this.#computeTargetCoords = computeTargetCoords;
    this.#patternsOperation = patternsOperation;
  }

  // Return the neighboring squares of a square
  findNeighboringSquares = (element) => {

    let [bombRowCoords, bombColumnCoords] = this.#Transcription.transcribeDataCoordToMatrix(element.dataset.coords);
    let targetMatrix = this.#computeTargetCoords(bombRowCoords, bombColumnCoords, this.#patternsOperation); // must return a matrix of the format [[x_coord, y_coord], ...] of the computed coordinates permutation
    let targetDataCoordArr = this.#Transcription.transcribeMatrixToDataCoord(targetMatrix);
    let targetElements = this.#FilterSquares.filterByNeighboringSquares(this.#squares.getSquareList(), targetDataCoordArr);

    return targetElements;
  }

}

export default FindNeighboringSquares;