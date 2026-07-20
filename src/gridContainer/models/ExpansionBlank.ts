import ExpansionBlankError from "../../errorHandler/models/ExpansionBlankError.ts";

import type FindNeighboringSquares from "./FindNeighboringSquares.ts";

class ExpansionBlank {

  private findNeighboringSquares: FindNeighboringSquares;

  constructor(findNeighboringSquares: FindNeighboringSquares) {
    this.findNeighboringSquares = findNeighboringSquares;
  }

  validateExpansionBlank(element: HTMLElement): void {

    if(element.dataset.type === 'blank') {
      this.executeExpansion(element);
    }

  }

  // Recursive Function
  // Initializate expansion method to reveal neighboring blanked squares by recursion
  private executeExpansion(element: HTMLElement): void {

    let targetElements = this.findNeighboringSquares.findNeighboringSquares(element);
    
    targetElements.forEach(square => {

      if (square.classList.contains('revealed') || square.dataset.isFlagged === 'true') return;
      
      switch (square.dataset.type) {
        case 'bomb':
          throw new ExpansionBlankError(`Bomb around a blank square... In a standart game, the logic should make it impossible to happen`, true);
          break;

        case 'digit':
          if (square.dataset.isFlagged === 'false') {
            square.classList.replace('hidden', 'revealed');
          }
          break;

        case 'blank':
          if (square.dataset.isFlagged === 'false') {
            square.classList.replace('hidden', 'revealed');
            this.executeExpansion(square);
          }
          break;

        default:
          throw new ExpansionBlankError(`Switch default statment >> square is not a valid case or is undefined. Must be 'bomb' | 'digit' | 'blank'`, true);
      }
    });
  }
}

export default ExpansionBlank;