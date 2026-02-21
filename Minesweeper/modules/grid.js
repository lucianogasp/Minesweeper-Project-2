class Grid {

  #n_row;
  #n_col;
  #n_square;
  #width_square;

  constructor (n_row, n_col, width_square) {
    this.#n_row = n_row;
    this.#n_col = n_col;
    this.#n_square = this.#n_col * this.#n_row;
    this.#width_square = width_square;
  }

  getN_Square() {
    
    return this.#n_square;
  }

  setTemplateGrid(gridContainer) {
    gridContainer.style.gridTemplateColumns = `repeat(${this.#n_col}, ${this.#width_square}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${this.#n_row}, ${this.#width_square}px)`;
  }

  createGrid(gridContainer) {

    for (let i = 0; i < this.#n_row; i++) {
      for (let j = 0; j < this.#n_col; j++) {

        let square = this.#setSquares();
        this.#setGridDataCoords(square, i, j);
        gridContainer.appendChild(square);
      }
    }
  
  }

  #setSquares() {

    let newDiv = document.createElement('div');
    newDiv.classList.add('square');
    newDiv.classList.add('revealed');
    newDiv.dataset.type = 'blank';
    newDiv.dataset.isFlagged = 'false';
    newDiv.dataset.digit = "";
    
    return newDiv;
  }

  #setGridDataCoords(square, y_coord, x_coord) {
    square.setAttribute('data-coords', `${y_coord + 1}-${x_coord + 1}`);
  }

}

export default Grid;