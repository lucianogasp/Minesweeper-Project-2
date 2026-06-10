class ClickEventManager {

  gridContainer; // DOM OBJECT to listen an event
  configGrid; // Function to configurate the grid, with header params. Return a grid instance
  onFirstClick; // Function to execute the first click. Return {squares, findNeighboringSquares}, instances
  onSubsequentClick; // Function to execute the subsequet clicks. Return void
  onContextMenu; // Funciton to execute the right click. Return void

  #returnConfigGrid // Save config grid function content
  #returnFirstClick; // Save first click function content
  #isFirstClick; // Verify the first click
  
  constructor(gridContainer, configGrid, onFirstClick, onSubsequentClick, onContextMenu) {
    this.gridContainer = gridContainer;
    this.configGrid = configGrid;
    this.onFirstClick = onFirstClick;
    this.onSubsequentClick = onSubsequentClick;
    this.onContextMenu = onContextMenu;

    this.#returnConfigGrid = null;
    this.#returnFirstClick = null;
    this.#isFirstClick = true;
  }

  #clickCallback = e => {
    if (this.#isFirstClick) {
      const { grid, timer } = this.#returnConfigGrid
      this.#returnFirstClick = this.onFirstClick(e, grid, timer);
      this.#isFirstClick = false;

    } else {
      const { squares, findNeighboringSquares } = this.#returnFirstClick;
      this.onSubsequentClick(e, squares, findNeighboringSquares);
    }
  }

  #contextmenuCallback = e => {
      e.preventDefault();
      this.onContextMenu(e);
  }

  // Setup the module responsable for start the grid's click events
  setup() {

    this.#returnConfigGrid = this.configGrid(this.gridContainer);

    this.gridContainer.addEventListener('click', this.#clickCallback);

    this.gridContainer.addEventListener('contextmenu', this.#contextmenuCallback);
  }

}

export default ClickEventManager;