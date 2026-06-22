// import modules
import { enableRestartListener } from "./eventManagerConfig.js";

class ClickEventManager {

  #gridContainer; // DOM OBJECT to listen an event. Default: undefined

  buildGrid; // Function to configurate the grid, with header params. Return a grid instance
  setHeaderTimer; // Function to set head timer config. Return {timer}
  prepareMinefild; // Function to execute the first click. Return {squares, findNeighboringSquares}, instances
  executeMove; // Function to execute the subsequet clicks. Return void
  verifyGameOver; // Function to verify the cases of gameover
  placeFlag; // Funciton to execute the right click. Return void

  #returnBuildGrid // Save config grid function content
  #returnSetHeaderTimer // Save config timer function content
  #returnPrepareMinefild; // Save first click function content
  #isFirstClick; // Verify the first click
  
  constructor(buildGrid, setHeaderTimer, prepareMinefild, executeMove, verifyGameOver, verifyExpansionBlank, placeFlag) {
    this.#gridContainer = undefined;

    this.buildGrid = buildGrid;
    this.setHeaderTimer = setHeaderTimer;
    this.prepareMinefild = prepareMinefild;
    this.executeMove = executeMove;
    this.verifyGameOver = verifyGameOver;
    this.verifyExpansionBlank = verifyExpansionBlank;
    this.placeFlag = placeFlag;

    this.#returnBuildGrid = null;
    this.#returnSetHeaderTimer = null;
    this.#returnPrepareMinefild = null;
    this.#isFirstClick = true;
  }

  getGridContainer() {
    
    return this.#gridContainer;
  }

  #clickCallback = e => {
    if (this.#isFirstClick) {
      this.#returnPrepareMinefild = this.prepareMinefild(e, {
        ...this.#returnBuildGrid,
        ...this.#returnSetHeaderTimer
      });

      this.#isFirstClick = false;
    }
      
    this.executeMove(e);
    this.verifyGameOver(e, this.#returnPrepareMinefild);
    this.verifyExpansionBlank(e, this.#returnPrepareMinefild);
  }

  #rightClickCallback = e => {
      e.preventDefault();
      this.placeFlag(e);
  }

  // Setup the module responsable for start the grid's click events
  setup() {

    try {
      // Build grid and gridContainer
      this.#returnBuildGrid = this.buildGrid();
      const { gridContainer } = this.#returnBuildGrid;
      this.#gridContainer = gridContainer;

      // Set/Reset the timer at header
      this.#returnSetHeaderTimer = this.setHeaderTimer();

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