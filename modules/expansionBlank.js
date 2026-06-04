class ExpansionBlank {

  #findNeighboringSquares; // INSTANCE CLASS of FindNeighboringSquares

  constructor(findNeighboringSquares) {
    this.#findNeighboringSquares = findNeighboringSquares;
  }

  // Verify if square clicked is a blank type to initializate the expansion method
  verifyExpansionBlank(element) {

    if( element.dataset.type === 'blank' ) {
      this.#expansionBlank(element);
    }

  }

  // Recursive Function
  // Initializate expansion method to reveal neighboring blanked squares by recursion
  #expansionBlank(element) {

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
            this.#expansionBlank(square);
          }
          break;
      }
    });
  }

}

export default ExpansionBlank;