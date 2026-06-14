class FilterSquares {

  // Filtering any squares list by not clicked squares
  static filterByNotClickedSquare(squaresArr, clickedSquare) {
    return squaresArr.filter( square => square !== clickedSquare );
  }

  // Filtering any squares list by neighboring squares
  static filterByNeighboringSquares(squaresArr, targetArr) {
    return squaresArr.filter( square => targetArr.includes(square.dataset.coords) );
  }

  // Filtering any squares list by not bomb squares
  static filterByNotBombSquares(targetArr) {
    return targetArr.filter( square => square.dataset.type !== 'bomb' );
  }
}

export default FilterSquares;