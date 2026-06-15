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
    targetElements.forEach(square => {
      
      switch (square.dataset.type) {
        case 'bomb':
          console.error('Unexpected Error - bomb around a blank square...');
          break;

        case 'digit':
          square.classList.replace('hidden', 'revealed');
          break;

        case 'blank':
          if (square.classList.contains('hidden')) {
            square.classList.replace('hidden', 'revealed');
            this.#executeExpansion(square);
          }
          break;
      }
    });
  }

}

export default ExpansionBlank;