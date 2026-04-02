class FindNeighboringSquares {

  #Transcription;
  #FilterSquares;
  #squares;
  #computeTargetCoords;
  #patternsOperation;

  constructor(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation) {
    this.#Transcription = Transcription;
    this.#FilterSquares = FilterSquares;
    this.#squares = squares;
    this.#computeTargetCoords = computeTargetCoords;
    this.#patternsOperation = patternsOperation;
  }

  findNeighboringSquares = (element) => {

    let [bombRowCoords, bombColumnCoords] = this.#Transcription.transcribeDataCoordToMatrix(element.dataset.coords);
    let targetMatrix = this.#computeTargetCoords(bombRowCoords, bombColumnCoords, this.#patternsOperation); // must return a matrix of the format [[x_coord, y_coord], ...] of the computed coordinates permutation
    let targetDataCoordArr = this.#Transcription.transcribeMatrixToDataCoord(targetMatrix);
    let targetElements = this.#FilterSquares.filterByNeighboringSquares(this.#squares.getSquareList(), targetDataCoordArr);

    return targetElements;
  }

}

export default FindNeighboringSquares;