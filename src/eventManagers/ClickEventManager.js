// import modules
import { enableRestartListener } from "./eventManagerConfig.js";

class ClickEventManager {

  #gridContainer; // DOM OBJECT to listen an event. Default: undefined

  buildGrid; // Function to configurate the grid, with header params. Return a grid instance
  prepareMinefild; // Function to execute the first click. Return {squares, findNeighboringSquares}, instances
  executeMove; // Function to execute the subsequet clicks. Return void
  verifyGameOver; // Function to verify the cases of gameover
  placeFlag; // Funciton to execute the right click. Return void

  #returnBuildGrid // Save config grid function content
  #returnPrepareMinefild; // Save first click function content
  #isFirstClick; // Verify the first click
  
  constructor(buildGrid, prepareMinefild, executeMove, verifyGameOver, verifyExpansionBlank, placeFlag) {
    this.#gridContainer = undefined;

    this.buildGrid = buildGrid;
    this.prepareMinefild = prepareMinefild;
    this.executeMove = executeMove;
    this.verifyGameOver = verifyGameOver;
    this.verifyExpansionBlank = verifyExpansionBlank;
    this.placeFlag = placeFlag;

    this.#returnBuildGrid = null;
    this.#returnPrepareMinefild = null;
    this.#isFirstClick = true;
  }

  getGridContainer() {
    
    return this.#gridContainer;
  }

  #clickCallback = e => {
    debugger;
    if (this.#isFirstClick) {
      this.#returnPrepareMinefild = this.prepareMinefild(e, this.#returnBuildGrid);

      this.#isFirstClick = false;
    }
      
    this.executeMove(e);
    this.verifyGameOver(e, this.#returnPrepareMinefild);
    this.verifyExpansionBlank(e, this.#returnPrepareMinefild);
  }

  #rightClickCallback = e => {
      e.preventDefault();
      debugger;
      this.placeFlag(e);
  }

  // Setup the module responsable for start the grid's click events
  setup() {

    try {
      // Build grid and gridContainer
      this.#returnBuildGrid = this.buildGrid();
      const { gridContainer } = this.#returnBuildGrid;
      this.#gridContainer = gridContainer;

      // Enable restart game button
      enableRestartListener();
      
      // Define event listeners at grid container
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