import SquareElementCoordAttrError from '@/errorHandler/models/SquareElementCoordAttrError.ts';

import type Transcription from "@/utils/models/Transcription.ts";
import type FilterSquares from "@/utils/models/FilterSquares.ts";
import type Squares from "./Squares";
import type { patternsOperation } from "@/utils/helpers/patternsOperation";

class FindNeighboringSquares {

  private TranscriptionClass: typeof Transcription;
  private FilterSquaresClass: typeof FilterSquares;
  private squares: Squares;
  private patternsOperationObject: typeof patternsOperation;

  constructor(TranscriptionClass: typeof Transcription, FilterSquaresClass: typeof FilterSquares, squares: Squares, patternsOperationObject: typeof patternsOperation) {
    this.TranscriptionClass = TranscriptionClass;
    this.FilterSquaresClass = FilterSquaresClass;
    this.squares = squares;
    this.patternsOperationObject = patternsOperationObject;
  }

  findNeighboringSquares(element: HTMLElement): HTMLElement[] {

    const elementCoordsAttr = element.dataset.coords;
    if (elementCoordsAttr === undefined) {
      throw new SquareElementCoordAttrError("The coords attribute of the square element is undefined. Must be a string of the type: 'row-column'", true);
    }
    
    let [bombRowCoords, bombColumnCoords] = this.TranscriptionClass.transcribeDataCoordToMatrix(elementCoordsAttr);
    let targetMatrix = this.computeTargetCoords(bombRowCoords, bombColumnCoords); // must return a matrix of the format [[x_coord, y_coord], ...] of the computed coordinates permutation
    let targetDataCoordArr = this.TranscriptionClass.transcribeMatrixToDataCoord(targetMatrix);
    let targetElements = this.FilterSquaresClass.filterByNeighboringSquares(this.squares.getSquareList(), targetDataCoordArr);

    return targetElements;
  }

  private computeTargetCoords(y_coord: number, x_coord: number): number[][] {

    const arr = [];
    for (let i of this.patternsOperationObject.y_patternOperation) {
      for (let j of this.patternsOperationObject.x_patternOperation) {

        if ( this.patternsOperationObject.y_patternSkip.includes(i) && this.patternsOperationObject.x_patternSkip.includes(j) ) {
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