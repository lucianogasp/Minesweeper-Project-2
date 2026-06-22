// import modules
import ClickEventManager from './ClickEventManager.js';
import { buildGrid, setHeaderTimer, prepareMinefild, executeMove, verifyGameOver, verifyExpansionBlank, placeFlag } from './eventManagerFunctions.js';

// Define DOM elements
const smileSpan = document.querySelector('#smile');

// Define local variables
let clickManager = undefined;

// Define Starting Game Managers functions

export function startGame() {
  
  // Instantiate the event manager of event listeners 
  clickManager = new ClickEventManager(
    buildGrid,
    setHeaderTimer,
    prepareMinefild,
    executeMove,
    verifyGameOver,
    verifyExpansionBlank,
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

  // Enable click listener of restart game
  smileSpan.addEventListener('click', restartGame);
}

export function disableRestartListener() {

  // Disable click listener of restart game
  smileSpan.removeEventListener('click', restartGame);
}

export function restartGame() {

  disableClickListeners();
  disableRightClickListener();
  disableRestartListener();
  
  // debugger;
  startGame();
}