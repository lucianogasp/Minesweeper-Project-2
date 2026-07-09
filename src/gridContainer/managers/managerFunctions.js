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
import { fisherYatesShuffle, computeTargetCoords, patternsOperation } from '../../utils/utilitiesFunctions.js';

// Define DOM elements
const timerCounter = document.querySelector('#number-timer');
const bombCounter = document.querySelector('#number-count-bombs');

// Define Event Managers Functions

function buildGrid(currentParams) {

  // instantiate grid and config gridContainer
  const grid = new Grid(currentParams.n_row, currentParams.n_col, currentParams.width_square);
  const gridContainer = grid.createGridContainer();
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);
  
  // Indent grid at gameBody
  const gameBody = document.querySelector('.game-body');
  gameBody.appendChild(gridContainer);

  return { grid, gridContainer };
}

function setHeaderTimer() {

  // Set the timer at header
  const timer = new HeaderTimer(timerCounter);

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
  bombCounter.textContent = '00';

  return;
};

function prepareMinefild(e, currentParams, grid, gridContainer, timer) {
    
  // Instantiate objects
  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(currentParams.bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares);

  const gameover = new GameOver(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);
  const flagCounter = new FlagCounter(bombCounter, squares, bomb.getN_Bomb());

  // Starting a timer at header
  timer.start();

  // Starting the bombs counter at header
  const flagsRemaining = flagCounter.countFlaggedSquares();
  flagCounter.update(flagsRemaining);

  // Setting shuffled squares list excluding the first square clicked
  const excludedFirstClickSquareList = FilterSquares.filterByNotClickedSquare(squares.getSquareList(), e.target);
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

function revealSquare(e) {

  // Reveal squares clicked
  e.target.classList.replace('hidden', 'revealed');
  return;
}

function verifyClickBomb(e, gameover, timer) {

  // Validate if bomb was clicked
  const isGameOver = gameover.validateClickBomb(e.target);

  if (isGameOver) {
    // Handle cases of game over
    gameover.handleBombRedSquare(e.target);
    gameover.revealingBombSquares();
    gameover.handleIncorrectFlagSquare();
    stopHeaderTimer(timer);
  }
  
  return isGameOver;
}

function verifyExpansionBlank(e, expansion) {

  // Initialize expansion method to reveal neighboring blanked squares
  expansion.validateExpansionBlank(e.target); // Recursive Function
  return;
}

function verifyEndGame(gameover, timer) {

  // Validate if the game is ended
  const isGameOver = gameover.validateEndGame();
  if (isGameOver) {
    stopHeaderTimer(timer);
    alert('The game was ended!!!');
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