import ExpansionBlankError from "../../errorHandler/ExpansionBlankError.js";

class ExpansionBlank {

  #findNeighboringSquares; // INSTANCE CLASS of FindNeighboringSquares

  constructor(findNeighboringSquares) {
    this.#findNeighboringSquares = findNeighboringSquares;
  }

  // Validate if clicked square is a blank type to initialize the expansion method
  validateExpansionBlank(element) {

    if( element.dataset.type === 'blank' ) {
      this.#executeExpansion(element);
    }

  }

  // Recursive Function
  // Initializate expansion method to reveal neighboring blanked squares by recursion
  #executeExpansion(element) {

    let targetElements = this.#findNeighboringSquares.findNeighboringSquares(element);
    
    targetElements.forEach( square => {

      if ( square.classList.contains('revealed') || square.dataset.isFlagged === 'true') { return; }
      
      switch ( square.dataset.type ) {
        case 'bomb':
          throw new ExpansionBlankError(`Bomb around a blank square... In a standart game, the logic should make it impossible to happen.`);
          break;

        case 'digit':
          if ( square.dataset.isFlagged === 'false' ) {
            square.classList.replace('hidden', 'revealed');
          }
          break;

        case 'blank':
          if ( square.dataset.isFlagged === 'false' ) {
            square.classList.replace('hidden', 'revealed');
            this.#executeExpansion(square);
          }
          break;
      }
    });
  }

}

export default ExpansionBlank;