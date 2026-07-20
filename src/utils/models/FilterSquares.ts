import SquareElementCoordAttrError from "@/errorHandler/models/SquareElementCoordAttrError.ts";

class FilterSquares {

  // Filtering any squares list by not clicked squares
  static filterByNotClickedSquare(squaresArr, clickedSquare) {
    return squaresArr.filter(element => element !== clickedSquare);
  }

  // Filtering any squares list by neighboring squares
  static filterByNeighboringSquares(squaresArr: HTMLElement[], targetArr: string[]): HTMLElement[] {
    
    const validSquares = squaresArr.map( element => {
      const coords = element.dataset.coords;
      if(coords === undefined) {
        throw new SquareElementCoordAttrError('');
      }
      return element; 
    });

    return validSquares.filter(square => targetArr.includes(square.dataset.coords));
  }

  // Filtering any squares list by not bomb squares
  static filterByNotBombSquares(targetArr: HTMLElement[]): HTMLElement[] {
    return targetArr.filter(element => element.dataset.type !== 'bomb');
  }
}

export default FilterSquares;