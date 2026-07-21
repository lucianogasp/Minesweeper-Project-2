// import modules
import FlagCounter from '../models/FlagCounter.ts';
import domElements from '../../DOMElements/domElements.js';
import managerFn from './managerFunctions.js';
import RemoveGridContainerError from '../../errorHandler/models/RemoveGridContainerError.js';

import { getParams } from '../../configContainer/getParams.js';
import { switchFaceToSmile } from '../../headerContainer/switchSmileFace.ts';
import { errorHandler } from '../../errorHandler/errorHandler.js';

export function startGame() {

  // STATE & CONFIGURATIONS :===========================================================:

  // Define config object of variables and instances
  const gameState = {

    callbackStatus: 'enabled', // Enabled/Disabled the clicks callback
    currentParams: null, // Current Params captured from front-end layout
    isFirstClick: true, // Define the flow code of first click callback from listener

    grid: null,
    gridContainer: null,
    timer: null,
    gameover: null,
    endgame: null,
    expansion: null,
    flagCounter: null,

    verifyGameOver: isGameOver => {
      // Prevents the clicks callback over again
      if (isGameOver) gameState.callbackStatus = 'disabled';
      return;
    }
  };

  // CALLBACKS :========================================================================:

  const clickCallback = e => {
    let isGameOver;

    if(e.target === e.currentTarget) return; // Prevents to execute a click off the grid square
    if (gameState.callbackStatus === 'disabled') return;
    if (e.target.dataset.isFlagged === 'true') return;

    // If is the first click of grid container
    if (gameState.isFirstClick) {
      const { gameover, endgame, expansion, flagCounter } = managerFn.prepareMinefild(
        e.target,
        gameState.currentParams,
        gameState.grid,
        gameState.gridContainer,
        gameState.timer,
      );
      gameState.gameover = gameover;
      gameState.endgame = endgame;
      gameState.expansion = expansion;
      gameState.flagCounter = flagCounter;

      // Define event listener to the right clicks
      gameState.gridContainer.addEventListener('contextmenu', errorHandler(rightClickCallback));

      // Remove the first click of the flow
      gameState.isFirstClick = false;
    }

    managerFn.revealSquare(e.target);

    // Verify if the click resulted in a blank square to expand in a chain
    managerFn.verifyExpansionBlank(e.target, gameState.expansion);

    isGameOver = managerFn.verifyClickBomb(e.target, gameState.gameover, gameState.timer);
    gameState.verifyGameOver(isGameOver);

    isGameOver = managerFn.verifyEndGame(gameState.endgame, gameState.timer);
    gameState.verifyGameOver(isGameOver);
  };

  const rightClickCallback = e => {
    let isGameOver;

    // Prevents to execute a click off the grid square
    if(e.target === e.currentTarget) {
      console.error(`e.target === e.currentTarget. The first click does not captured any of squares`);
      return;
    }

    if (gameState.callbackStatus === 'disabled') return;
    if (e.target.classList.contains('revealed')) return;

    if (gameState.flagCounter instanceof FlagCounter) {
      managerFn.placeFlag(e, gameState.flagCounter);

      isGameOver = managerFn.verifyEndGame(gameState.endgame, gameState.timer);
      gameState.verifyGameOver(isGameOver);

    } else {
      console.error(`flagCounter is not instance of FlagCounter: ${gameState.flagCounter}`);
    }
  };

  // UTILITIES & CLEANUP :==============================================================:

  const removeGridContainer = () => {

    if (!gameState.gridContainer) {
      throw new RemoveGridContainerError(`gridContainer is an undefined or null DOM Element. In a standart game, the logic shold make it impossible to happen`, true);
    }
    domElements.gameBody.removeChild(gameState.gridContainer);
    return;
  }

  // INITIALIZATION :===================================================================:

  switchFaceToSmile();

  // Define object params from the app's front-end
  gameState.currentParams = getParams();

  const { grid, gridContainer } = managerFn.buildGrid(gameState.currentParams);
  gameState.grid = grid;
  gameState.gridContainer = gridContainer;

  // Set/Reset timer and bombs at header
  const { timer } = managerFn.setHeaderTimer();
  gameState.timer = timer;
  managerFn.resetHeaderTimer(timer);
  managerFn.resetCounterBombs();

  // Define event listeners to the clicks
  gameState.gridContainer.addEventListener('click', errorHandler(clickCallback));

  // EXTERNAL CONTROLLER & CONFIG OBJECT :==============================================:

  return {
    restart: () => {      
      managerFn.stopHeaderTimer(gameState.timer);
      managerFn.resetHeaderTimer(gameState.timer);
      removeGridContainer();
    }
  };
}