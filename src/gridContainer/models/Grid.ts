class Grid {

  private n_row: number;
  private n_col: number;
  private n_square: number;
  private width_square: number;

  constructor (n_row: number, n_col: number, width_square: number) {
    this.n_row = n_row;
    this.n_col = n_col;
    this.n_square = this.n_col * this.n_row;
    this.width_square = width_square;
  }

  getN_Square(): number {
    
    return this.n_square;
  }

  createGridContainer(): HTMLDivElement {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid');
    return gridContainer;
  }

  setTemplateGrid(gridContainer: HTMLDivElement): void {
    gridContainer.style.gridTemplateColumns = `repeat(${this.n_col}, ${this.width_square}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${this.n_row}, ${this.width_square}px)`;
  }

  createGrid(gridContainer: HTMLDivElement): void {

    for (let i = 0; i < this.n_row; i++) {
      for (let j = 0; j < this.n_col; j++) {

        let square = this.createSquares();
        this.setGridDataCoords(square, i, j);
        gridContainer.appendChild(square);
      }
    }
  }

  private createSquares(): HTMLDivElement {
    let newDiv = document.createElement('div');

    newDiv.classList.add('square');
    newDiv.classList.add('hidden');

    newDiv.dataset.type = 'blank';
    newDiv.dataset.isFlagged = 'false';
    newDiv.dataset.digit = "";
    
    return newDiv;
  }

  private setGridDataCoords(square: HTMLDivElement, y_coord: number, x_coord: number): void {
    square.setAttribute('data-coords', `${y_coord + 1}-${x_coord + 1}`);
  }

}

export default Grid;