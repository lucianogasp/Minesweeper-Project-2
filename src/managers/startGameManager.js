// import modules
import FlagCounter from '../models/FlagCounter.js';
import { buildGrid, setHeaderTimer, resetHeaderTimer, stopHeaderTimer, resetCounterBombs, prepareMinefild, executeMove, verifyGameOver, verifyExpansionBlank, placeFlag } from './managerFunctions.js';

export function startGame() {

  // Define local variables
  const gameState = {
    enableClick: true,
    isFirstClick: true,
    grid: null,
    gridContainer: null,
    timer: null,
    gameover: null,
    expansion: null,
    flagCounter: null
  };

  const clickCallback = e => {

    // if event clicks of grid container is enabled
    if (!gameState.enableClick) { return; }
      
    // if is the first click of grid container
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

      gameState.isFirstClick = false;
    }

    executeMove(e);
    gameState.enableClick = verifyGameOver(e, gameState.gameover, gameState.timer);
    verifyExpansionBlank(e, gameState.expansion);
  };

  const rightClickCallback = e => {

    e.preventDefault();

    // if event clicks of grid container is enabled
    if (!gameState.enableClick) { return; }

    if (gameState.flagCounter instanceof FlagCounter) {

      placeFlag(e, gameState.flagCounter);

    } else {
      console.error(`flagCounter is not instance of FlagCounter: ${gameState.flagCounter}`);
    }

    return;
  };

  const disableClickListener = () => {

    gameState.gridContainer.removeEventListener('click', clickCallback);
  };

  const disableRightClickListener = () => {

    gameState.gridContainer.removeEventListener('click', rightClickCallback);
  };

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
      disableClickListener();
      disableRightClickListener();
      resetHeaderTimer(gameState.timer);
      stopHeaderTimer(gameState.timer);

      console.log('Listeners removed successfully...');
    }
  };
}