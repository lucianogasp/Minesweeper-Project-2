// import modules
import ClickEventManager from './ClickEventManager.js';
import { buildGrid, prepareMinefild, executeMove, placeFlag } from './eventManagerFuncions.js';
import { params } from '../app.js';

// Define DOM elements
const smileSpan = document.querySelector('#smile');

// Define local variables
let clickManager = undefined;

// Define Starting Game Managers functions

export function startGame() {

  // Instantiate the event manager of event listeners 
  clickManager = new ClickEventManager(
    buildGrid,
    prepareMinefild,
    executeMove,
    placeFlag
  );
  
  clickManager.setup();
}

export function disableClickListeners() {

  // Disable clicks listeners of grid
  if (clickManager) {
    clickManager.disableClickCallbackListener();
  } else {
    console.error(`clickManager is undefined: ${clickManager}`);
  }
}

export function disableRightClickListener() {
  
  // Disable clicks listeners of grid
  if (clickManager) {
    clickManager.disableRightClickCallbackListener();
  } else {
    console.error(`clickManager is undefined: ${clickManager}`);
  }
}

export function enableRestartListener() {

  // Enable the smile listener from the header to restart game
  if (clickManager) {
    smileSpan.addEventListener('click', () => {
  
      clickManager.getGridContainer().replaceChildren();
      startGame();
    });
  } else {
    console.error(`clickManager is undefined: ${clickManager}`);
  }
}