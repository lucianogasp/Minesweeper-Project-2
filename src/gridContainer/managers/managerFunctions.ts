// Import modules
import {
  HeaderTimer,
  Grid,
  Squares,
  Bomb,
  Digit,
  GameOver,
  EndGame,
  ExpansionBlank,
  FindNeighboringSquares,
  FlagCounter
} from "@/gridContainer/models";
import {
  Transcription,
  FilterSquares
} from "@/utils/models";
import {
  fisherYatesShuffle,
  patternsOperation
} from "@/utils/helpers";

import domElements from '@/DOMElements/domElements.ts';
import { userMessage } from '@/mainWrapperContainer/userMessage.ts';
import { switchFaceToSad } from '@/headerContainer/switchSmileFace.ts';

// import types
import type { DefaultParams } from '@/configContainer/getParams.ts';
import type { 
  GridBuilder, 
  Timer, 
  MinefieldObjects 
} from './managerFunctions.types.ts';

function buildGrid(currentParams: DefaultParams): GridBuilder {

  const grid = new Grid(currentParams.n_row, currentParams.n_col, currentParams.width_square);
  const gridContainer = grid.createGridContainer();
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  // Indent Grid Container at its parant container GameBody Container
  domElements.gameBody.appendChild(gridContainer);
  return { grid, gridContainer };
}

function setHeaderTimer(): Timer {

  const timer = new HeaderTimer(domElements.timerCounter);
  return { timer };
}

function resetHeaderTimer(timer: HeaderTimer): void {

  timer.reset();
  return;
}

function stopHeaderTimer(timer: HeaderTimer): void {

  timer.stop();
  return;
}

function resetCounterBombs(): void {
  
  domElements.bombCounter.textContent = '00';
  return;
};

function prepareMinefield(element: EventTarget, currentParams: DefaultParams, grid: Grid, gridContainer: HTMLDivElement, timer: HeaderTimer): MinefieldObjects {

  // Instantiate objects
  const squares = new Squares(Array.from(gridContainer.children) as HTMLElement[]);
  const bomb = new Bomb(currentParams.bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares);

  const gameover = new GameOver(squares);
  const endgame = new EndGame(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);
  const flagCounter = new FlagCounter(domElements.bombCounter, squares, bomb.getN_Bomb());

  timer.start();

  // Starting the bombs counter at header
  const flagsRemaining = flagCounter.countFlaggedSquares();
  flagCounter.update(flagsRemaining);

  // Setting shuffled squares list excluding the first square clicked
  const excludedFirstClickSquareList = FilterSquares.filterByNotClickedSquare(squares.getSquareList(), element);
  const localShuffledSquareList = bomb.shuffleSquareMethod(excludedFirstClickSquareList, fisherYatesShuffle);
  squares.setShuffledSquareList(localShuffledSquareList);

  squares.setBombsList(bomb.sliceBombsList());
  bomb.setBombs();

  digit.applyDigitsMethod();
  digit.setDigits();

  return { gameover, endgame, expansion, flagCounter };
}

function revealSquare(eventTarget: EventTarget): void {

  const element = eventTarget as HTMLElement;
  element.classList.replace('hidden', 'revealed');
  return;
}

function verifyExpansionBlank(eventTarget: EventTarget, expansion: ExpansionBlank): void {

  const element = eventTarget as HTMLElement;
  expansion.validateExpansionBlank(element); // Recursive Method
  return;
}

function verifyClickBomb(eventTarget: EventTarget, gameover: GameOver, timer: HeaderTimer): boolean {

  const element = eventTarget as HTMLElement;
  const isGameOver = gameover.validateClickBomb(element);

  if (isGameOver) {
    gameover.handleBombRedSquare(element);
    gameover.revealingBombSquares();
    gameover.handleIncorrectFlagSquare();
    stopHeaderTimer(timer);
    switchFaceToSad();
    const message = `Sorry... The game was ended. Please, try again!`;
    userMessage(message);
  }
  return isGameOver;
}

function verifyEndGame(endgame: EndGame, timer: HeaderTimer): boolean {

  const isEndGame = endgame.validateEndGame();

  if (isEndGame) {
    stopHeaderTimer(timer);
    const message = `Congrats!!! You have finished the game...`;
    userMessage(message);
  }
  return isEndGame;
}

function placeFlag(event: Event, flagCounter: FlagCounter): void {

  const eventTarget = event.target as HTMLElement;
  let flagsRemaining = flagCounter.countFlaggedSquares();
  
  switch (eventTarget.dataset.isFlagged) {
    case 'false':
      if ( flagsRemaining <= 0 ) return;

      eventTarget.dataset.isFlagged = 'true';
      flagsRemaining--;
      break;
    
    case 'true':
      if ( flagsRemaining >= flagCounter.getNBombs() ) return;

      eventTarget.dataset.isFlagged = 'false';
      flagsRemaining++;
      break;
  }

  flagCounter.update(flagsRemaining);
  return;
}

export default {
  buildGrid,
  setHeaderTimer,
  resetHeaderTimer,
  stopHeaderTimer,
  resetCounterBombs,
  prepareMinefield,
  revealSquare,
  verifyClickBomb,
  verifyExpansionBlank,
  verifyEndGame,
  placeFlag,
}