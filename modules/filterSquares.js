class FilterSquares {

  static filterByNotClickedSquare(squaresArr, clickedSquare) {

    return squaresArr.filter( square => square !== clickedSquare );
  }

  static filterByNeighboringSquares(squaresArr, targetArr) {

    return squaresArr.filter( square => targetArr.includes(square.dataset.coords) );
  }

  static filterByNotBombSquares(targetArr) {

    return targetArr.filter( square => square.dataset.type !== 'bomb' );
  }
}

export default FilterSquares;