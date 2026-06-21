// import modules
import ClickEventManager from './ClickEventManager.js';
import { buildGrid, prepareMinefild, executeMove, verifyGameOver, verifyExpansionBlank, placeFlag } from './eventManagerFunctions.js';

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
    verifyGameOver,
    verifyExpansionBlank,
    placeFlag
  );

  console.log('new manager');
  console.log(clickManager);
  
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
  debugger;

  console.log('restartGame');
  console.log(clickManager); 

  disableClickListeners();
  disableRightClickListener();
  disableRestartListener();
  
  startGame();
}