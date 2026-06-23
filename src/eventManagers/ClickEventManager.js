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
  #returnPrepareMinefield; // Save first click function content
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
    this.#returnPrepareMinefield = null;
    this.#isFirstClick = true;
  }

  getGridContainer() {
    
    return this.#gridContainer;
  }

  #clickCallback = e => {
    if (this.#isFirstClick) {
      this.#returnPrepareMinefield = this.prepareMinefild(e, {
        ...this.#returnBuildGrid,
        ...this.#returnSetHeaderTimer
      });

      this.#gridContainer.addEventListener('contextmenu', this.#rightClickCallback); 

      this.#isFirstClick = false;
    }
      
    this.executeMove(e);
    this.verifyGameOver(e, { 
      ...this.#returnPrepareMinefield,
      ...this.#returnSetHeaderTimer
    });
    this.verifyExpansionBlank(e, this.#returnPrepareMinefield);
  }

  #rightClickCallback = e => {
    debugger;
      e.preventDefault();
      if (this.#returnPrepareMinefield) {
        this.placeFlag(e, this.#returnPrepareMinefield);
      } else {
        console.error(`#returnPrepareMinefield is unefined: ${this.#returnPrepareMinefield}`);
      }
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