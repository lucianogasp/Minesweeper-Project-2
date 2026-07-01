// Import modules
import HeaderTimer from '../models/HeaderTimer.js';
import Grid from '../models/Grid.js';
import Squares from '../models/Squares.js';
import Bomb from '../models/Bomb.js';
import Digit from '../models/Digit.js';
import GameOver from '../models/GameOver.js';
import ExpansionBlank from '../models/ExpansionBlank.js';
import Transcription from '../utils/Transcription.js';
import FilterSquares from '../utils/FilterSquares.js';
import FindNeighboringSquares from '../models/FindNeighboringSquares.js';
import FlagCounter from '../models/FlagCounter.js';
import { fisherYatesShuffle, computeTargetCoords, patternsOperation } from '../utils/utilitiesFunctions.js';
import { params } from '../app.js';

// Define DOM elements
const timerCounter = document.querySelector('#number-timer');
const bombCounter = document.querySelector('#number-count-bombs');

// Define Event Managers Functions

export function buildGrid() {

  // Build grid container and reset it
  const gridContainer = document.querySelector('.grid');
  const grid = new Grid(params.n_row, params.n_col, params.width_square); 
  gridContainer.replaceChildren();
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  return { grid, gridContainer };
}

export function setHeaderTimer() {

  // Set the timer at header
  const timer = new HeaderTimer(timerCounter);

  return { timer };
}

export function resetHeaderTimer(timer) {

  // Reset the timer at header
  timer.reset();
  return;
}

export function stopHeaderTimer(timer) {

  // Stop the timer at header
  timer.stop();
  return;
}

export function resetCounterBombs() {
  
  // Reset the number of bombs of header
  bombCounter.textContent = '00';

  return;
};

export function prepareMinefild(e, grid, gridContainer, timer) {

  // Prevents to execute a click off the grid square
  if(e.target === e.currentTarget) {
    console.error(`e.target === e.currentTarget. The first click does not captured any of squares`);
    return;
  }
    
  // Instantiate objects
  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(params.bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares);

  const gameover = new GameOver(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);
  const flagCounter = new FlagCounter(bombCounter, squares, bomb.getN_Bomb());

  // Starting a timer at header
  timer.start();

  // Starting the bombs counter at header
  const flagsRemaining = flagCounter.countFlags();
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

export function revealSquare(e) {

  // Reveal squares clicked
  e.target.classList.replace('hidden', 'revealed');
  return;
}

export function verifyGameOver(e, gameover, timer) {

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

export function verifyExpansionBlank(e, expansion) {

  // Initialize expansion method to reveal neighboring blanked squares
  expansion.validateExpansionBlank(e.target); // Recursive Function
  return;
}

export function verifyEndGame(gameover) {

  // Validate if the game is ended
  gameover.validateEndGame();
  return;
}

export function placeFlag(e, flagCounter) {

  // Counting number of flags remaining to place on grid
  let flagsRemaining = flagCounter.countFlags();
  
  // Switch the flagged status' right clicked square
  switch (e.target.dataset.isFlagged) {
    case 'false':
      if (flagsRemaining <= 0) { return; }

      e.target.dataset.isFlagged = 'true';
      flagsRemaining--;
      break;
    
    case 'true':
      e.target.dataset.isFlagged = 'false';
      flagsRemaining++;
      break;
  }

  // Update number of bombs remainig at header
  flagCounter.update(flagsRemaining);

  return;
}
