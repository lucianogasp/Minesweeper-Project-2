import SquareElementCoordAttrError from "@/errorHandler/models/SquareElementCoordAttrError.ts";

class FilterSquares {

  // Filtering any squares list by not clicked squares
  static filterByNotClickedSquare(squaresArr, clickedSquare) {
    return squaresArr.filter(element => element !== clickedSquare);
  }

  private static handleUndefinedCoords(coords: string | undefined): string {
    if(coords === undefined) throw new SquareElementCoordAttrError(``);
    return coords;
  }

  // Filtering any squares list by neighboring squares
  static filterByNeighboringSquares(squaresArr: HTMLElement[], targetArr: string[]): HTMLElement[] {

    return squaresArr.filter(square => targetArr.includes(FilterSquares.handleUndefinedCoords(square.dataset.coords)));
  }

  // Filtering any squares list by not bomb squares
  static filterByNotBombSquares(targetArr: HTMLElement[]): HTMLElement[] {
    return targetArr.filter(element => element.dataset.type !== 'bomb');
  }
}

export default FilterSquares;