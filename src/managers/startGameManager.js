// import modules
import FlagCounter from '../models/FlagCounter.js';
import { buildGrid, setHeaderTimer, resetHeaderTimer, stopHeaderTimer, resetCounterBombs, prepareMinefild, revealSquare, verifyClickBomb, verifyExpansionBlank, verifyEndGame, placeFlag } from './managerFunctions.js';

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

    verifyGameOver: (isGameOver) => {
      if (isGameOver) {
        // Prevents the clicks callback again
        gameState.callbackStatus = 'disabled';
      }
    }
  };

  const clickCallback = e => {

    let isGameOver;

    // If event clicks of grid container is enabled
    if (gameState.callbackStatus === 'disabled') { return; }
      
    // If is the first click of grid container
    if (gameState.isFirstClick) {

      const { gameover, expansion, flagCounter } = prepareMinefild(
        e,
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
    revealSquare(e);

    // Verify if the click resulted in a game over
    isGameOver = verifyClickBomb(e, gameState.gameover, gameState.timer);
    gameState.verifyGameOver(isGameOver);

    // Verify if the click resulted in a blank to expand in a chain
    verifyExpansionBlank(e, gameState.expansion);

    // Verify if the click resulted in a end game
    isGameOver = verifyEndGame(gameState.gameover, gameState.timer);
    gameState.verifyGameOver(isGameOver);
  };

  const rightClickCallback = e => {

    e.preventDefault();

    let isGameOver;

    // If event clicks of grid container is enabled
    if (gameState.callbackStatus === 'disabled') { return; }

    if (gameState.flagCounter instanceof FlagCounter) {

      // Place the flags at the squares of grid
      placeFlag(e, gameState.flagCounter);

      // Verify if the click resulted in a end game
      isGameOver = verifyEndGame(gameState.gameover, gameState.timer);
      gameState.verifyGameOver(isGameOver);

    } else {
      console.error(`flagCounter is not instance of FlagCounter: ${gameState.flagCounter}`);
    }

    return;
  };

  const removeContainer = () => {

    if (gameState.gridContainer) {

      const configContainer = document.querySelector('.config-container');
      configContainer.removeChild(gameState.gridContainer);

    } else {
      console.error(`gridContainer is not reference of a DOM element: ${gridContainer}`);
    }
  }

  // Build grid and gridContainer
  const { grid, gridContainer } = buildGrid();

  // Set/Reset timer at header
  const { timer } = setHeaderTimer();
  resetHeaderTimer(timer);

  // Set/Reset number of bombs at header
  resetCounterBombs();

  gameState.grid = grid;
  gameState.gridContainer = gridContainer;
  gameState.timer = timer;

  // Define event listeners at grid container to the clicks
  gameState.gridContainer.addEventListener('click', clickCallback);

  // Return config object to restart game
  return {
    restart: () => {      
      stopHeaderTimer(gameState.timer);
      resetHeaderTimer(gameState.timer);
      removeContainer();      
    }
  };
}