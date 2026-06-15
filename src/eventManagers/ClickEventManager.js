class ClickEventManager {

  #gridContainer; // DOM OBJECT to listen an event. Default: undefined

  buildGrid; // Function to configurate the grid, with header params. Return a grid instance
  prepareMinefild; // Function to execute the first click. Return {squares, findNeighboringSquares}, instances
  executeMove; // Function to execute the subsequet clicks. Return void
  placeFlag; // Funciton to execute the right click. Return void

  #returnBuildGrid // Save config grid function content
  #returnPrepareMinefild; // Save first click function content
  #isFirstClick; // Verify the first click
  
  constructor(buildGrid, prepareMinefild, executeMove, placeFlag) {
    this.#gridContainer = undefined;

    this.buildGrid = buildGrid;
    this.prepareMinefild = prepareMinefild;
    this.executeMove = executeMove;
    this.placeFlag = placeFlag;

    this.#returnBuildGrid = null;
    this.#returnPrepareMinefild = null;
    this.#isFirstClick = true;
  }

  getGridContainer() {
    
    return this.#gridContainer;
  }

  #clickCallback = e => {

    if (this.#isFirstClick) {
      this.#returnPrepareMinefild = this.prepareMinefild(e, this.#returnBuildGrid);

      this.#isFirstClick = false;
    }
      
    // debugger;
    this.executeMove(e, this.#returnPrepareMinefild);
  }

  #rightClickCallback = e => {
      e.preventDefault();
      this.placeFlag(e);
  }

  // Setup the module responsable for start the grid's click events
  setup() {

    try {
      this.#returnBuildGrid = this.buildGrid();
      
      const { gridContainer } = this.#returnBuildGrid;
      this.#gridContainer = gridContainer;
  
      this.#gridContainer.addEventListener('click', this.#clickCallback);
  
      this.#gridContainer.addEventListener('contextmenu', this.#rightClickCallback); 
           
    } catch(err) {
      console.error(err);
    }
    
  }

  disableClickCallbackListener() {
    this.#gridContainer.removeEventListener('click', this.#clickCallback);
  }

  disableRightClickCallbackListener() {
    this.#gridContainer.removeEventListener('contextmenu', this.#rightClickCallback);
  }

}

export default ClickEventManager;