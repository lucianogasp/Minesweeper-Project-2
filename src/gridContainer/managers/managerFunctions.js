// Import modules
import HeaderTimer from '../models/HeaderTimer.js';
import Grid from '../models/Grid.js';
import Squares from '../models/Squares.js';
import Bomb from '../models/Bomb.js';
import Digit from '../models/Digit.js';
import GameOver from '../models/GameOver.js';
import ExpansionBlank from '../models/ExpansionBlank.js';
import Transcription from '../../utils/Transcription.js';
import FilterSquares from '../../utils/FilterSquares.js';
import FindNeighboringSquares from '../models/FindNeighboringSquares.js';
import FlagCounter from '../models/FlagCounter.js';
import domElements from '../../DOMElements/domElements.js';

import { fisherYatesShuffle, computeTargetCoords, patternsOperation } from '../../utils/utilitiesFunctions.js';
import { userMessage } from '../../utils/userMessage.js';
import { switchFaceToSad } from '../../headerContainer/switchSmileFace.js';

// Define Event Managers Functions

function buildGrid(currentParams) {

  // instantiate grid and config gridContainer
  const grid = new Grid(currentParams.n_row, currentParams.n_col, currentParams.width_square);
  const gridContainer = grid.createGridContainer();
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  // Indent grid at its parant container
  domElements.gameBody.appendChild(gridContainer);

  return { grid, gridContainer };
}

function setHeaderTimer() {

  // Set the timer at header
  const timer = new HeaderTimer(domElements.timerCounter);

  return { timer };
}

function resetHeaderTimer(timer) {

  // Reset the timer at header
  timer.reset();
  return;
}

function stopHeaderTimer(timer) {

  // Stop the timer at header
  timer.stop();
  return;
}

function resetCounterBombs() {
  
  // Reset the number of bombs of header
  domElements.bombCounter.textContent = '00';

  return;
};

function prepareMinefild(element, currentParams, grid, gridContainer, timer) {

  // Instantiate objects
  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(currentParams.bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares);

  const gameover = new GameOver(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);
  const flagCounter = new FlagCounter(domElements.bombCounter, squares, bomb.getN_Bomb());

  // Starting a timer at header
  timer.start();

  // Starting the bombs counter at header
  const flagsRemaining = flagCounter.countFlaggedSquares();
  flagCounter.update(flagsRemaining);

  // Setting shuffled squares list excluding the first square clicked
  const excludedFirstClickSquareList = FilterSquares.filterByNotClickedSquare(squares.getSquareList(), element);
  const localShuffledSquareList = bomb.shuffleSquareMethod(excludedFirstClickSquareList, fisherYatesShuffle);
  squares.setShuffledSquareList(localShuffledSquareList);

  // Setting bombs at squares list and implanting it at the DOM elements
  squares.setBombsList(bomb.sliceBombsList());
  bomb.setBombs();

  // Setting digits on neighboring bomb squares and implanting it at the DOM elements
  digit.applyDigitsMethod();
  digit.setDigits();

  // Return instances to save the config object gameState
  return { gameover, expansion, flagCounter };
}

function revealSquare(element) {

  // Reveal squares clicked
  element.classList.replace('hidden', 'revealed');
  return;
}

function verifyClickBomb(element, gameover, timer) {

  // Validate if bomb was clicked
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

function verifyExpansionBlank(element, expansion) {

  // Initialize expansion method to reveal neighboring blanked squares
  expansion.validateExpansionBlank(element); // Recursive Function
  return;
}

function verifyEndGame(gameover, timer) {

  // Validate if the game was ended
  const isGameOver = gameover.validateEndGame();
  if (isGameOver) {
    stopHeaderTimer(timer);
    const message = `Congrats!!! You have finished the game...`;
    userMessage(message);
  }

  return isGameOver;
}

function placeFlag(e, flagCounter) {

  // Counting number of flags remaining to place on grid
  let flagsRemaining = flagCounter.countFlaggedSquares();
  
  // Switch the flagged status' right clicked square
  switch (e.target.dataset.isFlagged) {
    case 'false':
      if ( flagsRemaining <= 0 ) { return; }

      e.target.dataset.isFlagged = 'true';
      flagsRemaining--;
      break;
    
    case 'true':
      if ( flagsRemaining >= flagCounter.n_bombs ) { return; }

      e.target.dataset.isFlagged = 'false';
      flagsRemaining++;
      break;
  }

  // Update number of bombs remainig at header
  flagCounter.update(flagsRemaining);

  return;
}

export default {
  buildGrid,
  setHeaderTimer,
  resetHeaderTimer,
  stopHeaderTimer,
  resetCounterBombs,
  prepareMinefild,
  revealSquare,
  verifyClickBomb,
  verifyExpansionBlank,
  verifyEndGame,
  placeFlag,
}