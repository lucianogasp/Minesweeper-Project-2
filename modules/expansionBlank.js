class ExpansionBlank {

  #findNeighboringSquares;

  constructor(findNeighboringSquares) {
    this.#findNeighboringSquares = findNeighboringSquares;
  }

  verifyExpansionBlank(element) {

    if( element.dataset.type === 'blank' ) {
      this.#expansionBlank(element);
    }

  }

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