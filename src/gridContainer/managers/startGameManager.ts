// import modules
import domElements from '@/DOMElements/domElements.ts';
import managerFn from './managerFunctions.ts';

import { FlagCounter } from "@/gridContainer/models";
import { getParams } from '@/configContainer/getParams.ts';
import { switchFaceToSmile } from '@/headerContainer/switchSmileFace.ts';
import { errorHandler } from "@/errorHandler/errorHandler.ts";
import { assertGameStateProp } from '@/errorHandler/assertValues';

// import types
import type { GameStateObject, StartGameObject } from './startGameManager.types.ts';
import type { DefaultParams } from "@/configContainer/getParams.ts";
import type {
  HeaderTimer,
  ExpansionBlank,
  GameOver,
  EndGame,
  Grid
} from "@/gridContainer/models";

export function startGame(): StartGameObject {

  // STATE & CONFIGURATIONS :===========================================================:

  const gameState: GameStateObject = {

    callbackStatus: 'enabled',
    currentParams: null,
    isFirstClick: true,

    grid: null,
    gridContainer: null,
    timer: null,
    gameover: null,
    endgame: null,
    expansion: null,
    flagCounter: null,

    verifyGameOver: (isGameOver: boolean): void => {
      if (isGameOver) gameState.callbackStatus = 'disabled';    
    }
  };

  // CALLBACKS :========================================================================:

  const clickCallback = (e: Event): void => {
    let isGameOver: boolean;
    const eventTarget = assertGameStateProp(e.target) as HTMLDivElement;
    const currentParams = assertGameStateProp(gameState.currentParams) as DefaultParams;
    const grid = assertGameStateProp(gameState.grid) as Grid;
    const gridContainer = assertGameStateProp(gameState.gridContainer) as HTMLDivElement;
    const timer = assertGameStateProp(gameState.timer) as HeaderTimer;

    if(eventTarget === e.currentTarget) return; // Prevents to execute a click off the grid square
    if (gameState.callbackStatus === 'disabled') return;
    if (eventTarget.dataset.isFlagged === 'true') return;

    // If is the first click of grid container
    if (gameState.isFirstClick) {
      const { gameover, endgame, expansion, flagCounter } = managerFn.prepareMinefield(
        eventTarget,
        currentParams,
        grid,
        gridContainer,
        timer,
      );
      gameState.gameover = gameover;
      gameState.endgame = endgame;
      gameState.expansion = expansion;
      gameState.flagCounter = flagCounter;

      gridContainer.addEventListener('contextmenu', errorHandler(rightClickCallback));

      gameState.isFirstClick = false;
    }

    const expansion = gameState.expansion as ExpansionBlank;
    const gameover = gameState.gameover as GameOver;
    const endgame = gameState.endgame as EndGame;

    managerFn.revealSquare(eventTarget);

    managerFn.verifyExpansionBlank(eventTarget, expansion); // Recursive Method
    
    isGameOver = managerFn.verifyClickBomb(eventTarget, gameover, timer);
    gameState.verifyGameOver(isGameOver);

    isGameOver = managerFn.verifyEndGame(endgame, timer);
    gameState.verifyGameOver(isGameOver);
  };

  const rightClickCallback = (e: Event): void => {
    let isGameOver: boolean;
    const eventTarget = assertGameStateProp(e.target) as HTMLDivElement;
    const flagCounter = assertGameStateProp(gameState.flagCounter) as FlagCounter;
    const endgame = assertGameStateProp(gameState.endgame) as EndGame;
    const timer =  assertGameStateProp(gameState.timer) as HeaderTimer;

    if(eventTarget === e.currentTarget) return; // Prevents to execute a right click off the grid square
    if (gameState.callbackStatus === 'disabled') return;
    if (eventTarget.classList.contains('revealed')) return;

    managerFn.placeFlag(e, flagCounter);

    isGameOver = managerFn.verifyEndGame(endgame, timer);
    gameState.verifyGameOver(isGameOver);

  };

  // UTILITIES & CLEANUP :==============================================================:

  const removeGridContainer = (): void => {
    const gridContainer = assertGameStateProp(gameState.gridContainer) as HTMLDivElement;

    domElements.gameBody.removeChild(gridContainer);
  }

  // INITIALIZATION :===================================================================:

  switchFaceToSmile();

  gameState.currentParams = assertGameStateProp(getParams());
  const currentParams = gameState.currentParams as DefaultParams;

  const { grid, gridContainer } = managerFn.buildGrid(currentParams);
  gameState.grid = grid;
  gameState.gridContainer = gridContainer;

  const { timer } = managerFn.setHeaderTimer();
  gameState.timer = timer;

  managerFn.resetHeaderTimer(timer);
  managerFn.resetCounterBombs();

  gridContainer.addEventListener('click', errorHandler(clickCallback));

  // EXTERNAL CONTROLLER & CONFIG OBJECT :==============================================:

  return {
    restart: () => {
      const timer = assertGameStateProp(gameState.timer);
      managerFn.stopHeaderTimer(timer);
      managerFn.resetHeaderTimer(timer);
      removeGridContainer();
    }
  };
}