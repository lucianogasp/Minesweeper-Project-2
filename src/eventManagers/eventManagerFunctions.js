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
import { fisherYatesShuffle, computeTargetCoords, patternsOperation } from '../utils/utilitiesFunctions.js';
import { params } from '../app.js';

import { disableClickListeners, disableRightClickListener, enableRestartListener } from './eventManagerConfig.js';

// Define DOM elements
const timerCounter = document.querySelector('#number-timer');

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

  // Reset the timer at header
  const timer = new HeaderTimer();
  timer.reset(timerCounter);

  return { timer };
}

export function prepareMinefild(e, objectResultParams) {
    
  // Destructuring Assignments of params
  const { grid, gridContainer, timer } = objectResultParams;

  // Instantiate objects
  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(params.bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares);

  const gameover = new GameOver(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);

  // Starting a timer at header
  timer.start(timerCounter);

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

  return { gameover, expansion, timer };
}

export function executeMove(e) {

  // Reveal squares clicked
  e.target.classList.replace('hidden', 'revealed');
  return;
}

export function verifyGameOver(e, objectResultParams) {

  // Destructuring Assignments of params
  const { gameover, timer } = objectResultParams;

  // Validate if bomb was clicked
  const isGameOver = gameover.validateClickBomb(e.target);

  if (isGameOver) {
    // Handle cases of game over
    gameover.handleBombRedSquare(e.target);
    gameover.revealingBombSquares();
    gameover.handleIncorrectFlagSquare();
    gameover.stopTimer(timer);

    // Disable event listeners of click
    disableClickListeners();
    disableRightClickListener();
    return;
  }
  return;
}

export function verifyExpansionBlank(e, objectResultParams) {

  // Destructuring Assignments of params
  const { expansion } = objectResultParams;

  // Initialize expansion method to reveal neighboring blanked squares
  expansion.validateExpansionBlank(e.target); // Recursive Function
  return;

}

export function placeFlag(e) {

  // Switch the flagged status' right clicked square
  e.target.dataset.isFlagged = e.target.dataset.isFlagged === 'false' ? 'true' : 'false';
  return;
}
