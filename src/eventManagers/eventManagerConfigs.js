// import modules
import ClickEventManager from './ClickEventManager.js';
import { buildGrid, prepareMinefild, executeMove, placeFlag } from './eventManagerFunctions.js';

// Define DOM elements
const smileSpan = document.querySelector('#smile');

// Define local variables
export let clickManager = undefined;

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
  smileSpan.addEventListener('click', () => {
    startGame();
  });
}
