// import modules
import FlagCounter from '../models/FlagCounter.js';
import managerFn from './managerFunctions.js';
import { getParams } from '../../configContainer/getParams.js';

export function startGame() {

  // Define config object of variables and instances
  const gameState = {
    callbackStatus: 'enabled', // Enabled/Disabled the clicks callback
    isFirstClick: true,

    grid: null,
    gridContainer: null,
    timer: null,
    gameover: null,
    expansion: null,
    flagCounter: null,

    currentParams: {},

    verifyGameOver: (isGameOver) => {
      if (isGameOver) {
        // Prevents the clicks callback over again
        gameState.callbackStatus = 'disabled';
      }
    }
  };

  const clickCallback = e => {
    let isGameOver;

    // Prevents to execute a click off the grid square
    if(e.target === e.currentTarget) {
      console.error(`e.target === e.currentTarget. The first click does not captured any of squares`);
      return;
    }
    
    // If event clicks of grid container is enabled
    if (gameState.callbackStatus === 'disabled') { return; }

    // Prevents the click callback over a flagged square
    if (e.target.dataset.isFlagged === 'true') { return; }
      
    // If is the first click of grid container
    if (gameState.isFirstClick) {

      const { gameover, expansion, flagCounter } = managerFn.prepareMinefild(
        e,
        gameState.currentParams,
        gameState.grid,
        gameState.gridContainer,
        gameState.timer,
      );
      gameState.gameover = gameover;
      gameState.expansion = expansion;
      gameState.flagCounter = flagCounter;

      // Define event listeners at grid container to the right clicks
      gameState.gridContainer.addEventListener('contextmenu', rightClickCallback);

      // Remove the first click of the flow
      gameState.isFirstClick = false;
    }

    // Reveal clicked square
    managerFn.revealSquare(e);

    // Verify if the click resulted in a game over
    isGameOver = managerFn.verifyClickBomb(e, gameState.gameover, gameState.timer);
    gameState.verifyGameOver(isGameOver);

    // Verify if the click resulted in a blank to expand in a chain
    managerFn.verifyExpansionBlank(e, gameState.expansion);

    // Verify if the click resulted in a end game
    isGameOver = managerFn.verifyEndGame(gameState.gameover, gameState.timer);
    gameState.verifyGameOver(isGameOver);
  };

  const rightClickCallback = e => {
    e.preventDefault();
    let isGameOver;

    // If event clicks of grid container is enabled
    if (gameState.callbackStatus === 'disabled') { return; }

    // Prevents the right click callback over a revealed square
    if (e.target.classList.contains('revealed')) { return; }

    if (gameState.flagCounter instanceof FlagCounter) {

      // Place the flags at the squares of grid
      managerFn.placeFlag(e, gameState.flagCounter);

      // Verify if the click resulted in a end game
      isGameOver = managerFn.verifyEndGame(gameState.gameover, gameState.timer);
      gameState.verifyGameOver(isGameOver);

    } else {
      console.error(`flagCounter is not instance of FlagCounter: ${gameState.flagCounter}`);
    }
  };

  const removeGridContainer = () => {

    if (gameState.gridContainer) {

      // Revome gridContainer from de config container DOM element
      const gameBody = document.querySelector('.game-body');
      gameBody.removeChild(gameState.gridContainer);

    } else {
      console.error(`gridContainer is not reference of a DOM element: ${gridContainer}`);
    }
  }

  // Define object params from the app's front-end
  gameState.currentParams = getParams();

  // Build grid and gridContainer
  const { grid, gridContainer } = managerFn.buildGrid(gameState.currentParams);
  gameState.grid = grid;
  gameState.gridContainer = gridContainer;

  // Set/Reset timer at header
  const { timer } = managerFn.setHeaderTimer();
  gameState.timer = timer;
  managerFn.resetHeaderTimer(timer);

  // Set/Reset number of bombs at header
  managerFn.resetCounterBombs();

  // Define event listeners at grid container to the clicks
  gameState.gridContainer.addEventListener('click', clickCallback);

  // Return config object to restart game
  return {
    restart: () => {      
      managerFn.stopHeaderTimer(gameState.timer);
      managerFn.resetHeaderTimer(gameState.timer);
      removeGridContainer();      
    }
  };
}