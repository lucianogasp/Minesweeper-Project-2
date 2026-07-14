class Grid {

  #n_row; // Number of columns
  #n_col; // Number of rows
  #n_square; // Total of square
  #width_square; // Pixels of width for each square

  constructor (n_row, n_col, width_square) {
    this.#n_row = n_row;
    this.#n_col = n_col;
    this.#n_square = this.#n_col * this.#n_row;
    this.#width_square = width_square;
  }

  getN_Square() {
    
    return this.#n_square;
  }

  createGridContainer() {
    const gridContainer = document.createElement('div');

    // Define css classes
    gridContainer.classList.add('grid');

    return gridContainer;
  }

  // Set template HTML to create grid
  setTemplateGrid(gridContainer) {
    gridContainer.style.gridTemplateColumns = `repeat(${this.#n_col}, ${this.#width_square}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${this.#n_row}, ${this.#width_square}px)`;
  }

  // Create HTML grid with squares associated
  createGrid(gridContainer) {

    for (let i = 0; i < this.#n_row; i++) {
      for (let j = 0; j < this.#n_col; j++) {

        let square = this.#createSquares();
        this.#setGridDataCoords(square, i, j);
        gridContainer.appendChild(square);
      }
    }
  }

  // Set each square with classes and data attributes associated 
  #createSquares() {
    let newDiv = document.createElement('div');

    // Define css styles
    newDiv.classList.add('square');
    newDiv.classList.add('hidden');

    // Define css data attributes
    newDiv.dataset.type = 'blank';
    newDiv.dataset.isFlagged = 'false';
    newDiv.dataset.digit = "";
    
    return newDiv;
  }

  // Set Data Coords at the data attributes' square associated
  #setGridDataCoords(square, y_coord, x_coord) {
    square.setAttribute('data-coords', `${y_coord + 1}-${x_coord + 1}`);
  }

}

export default Grid;