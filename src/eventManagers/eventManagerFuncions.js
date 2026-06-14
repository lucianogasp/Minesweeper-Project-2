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

import { disableClickListeners, disableRightClickListener, enableRestartListener } from './eventManagerConfigs.js';

// Define DOM elements
const timerCounter = document.querySelector('#number-timer');

// Define Event Managers Functions

export function buildGrid() {

  // Create grid
  let gridContainer = document.querySelector('.grid');
  let grid = new Grid(params.n_row, params.n_col, params.width_square); 
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  return { grid, gridContainer };
}

export function prepareMinefild(e, grid, gridContainer) {
    
  // Instantiate objects
  const timer = new HeaderTimer();
  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(params.bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares); 

  // Starting a timer at header
  timer.start(timerCounter);

  // Setting shuffled squares list excluding the first square clicked
  const excludedFirstClickSquareList = FilterSquares.filterByNotClickedSquare(squares.getSquareList(), e.target);
  const localShuffledSquareList = bomb.shuffleSquareMethod(excludedFirstClickSquareList, fisherYatesShuffle);
  squares.setShuffledSquareList(localShuffledSquareList);

  // Setting bombs squares list
  squares.setBombsList(bomb.sliceBombsList());

  // Implanting bombs at the DOM elements
  bomb.setBombs();

  // Setting digits at the neighboring bomb squares
  digit.applyDigitsMethod();

  // Implanting digits at the DOM elements
  digit.setDigits();

  return { squares, findNeighboringSquares, timer };
}

export function executeMove(e, squares, findNeighboringSquares, timer) {

  // instantiate objects
  const gameover = new GameOver(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);

  // Reveal squares clicked
  e.target.classList.replace('hidden', 'revealed');

  // Validate if bomb was clicked
  const isGameover = gameover.validateClickBomb(e.target);
  if (isGameover) {
    gameover.handleBombRedSquare(e.target);
    gameover.revealingBombSquares();
    gameover.handleIncorrectFlagSquare();
    gameover.stopTimer(timer);

    disableClickListeners();
    disableRightClickListener();
    enableRestartListener();
    return;
  }

  // Initialize expansion method to reveal neighboring blanked squares
  expansion.verifyExpansionBlank(e.target); // Recursive Function
  return;
}

export function placeFlag(e) {

  // Switch the flagged status' right clicked square
  e.target.dataset.isFlagged = e.target.dataset.isFlagged === 'false' ? 'true' : 'false';
  return;
}
