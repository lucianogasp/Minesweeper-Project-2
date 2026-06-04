// Import modules
import Timer from './modules/timer.js';
import Grid from './modules/grid.js';
import Squares from './modules/squares.js';
import Bomb from './modules/bomb.js';
import Digit from './modules/digit.js';
import GameOver from './modules/gameover.js';
import ExpansionBlank from './modules/expansionBlank.js';
import Transcription from './modules/transcription.js';
import FilterSquares from './modules/filterSquares.js';
import FindNeighboringSquares from './modules/findNeighboringSquares.js';
import { fisherYatesShuffle, computeTargetCoords, patternsOperation } from './modules/utilitiesFunctions.js';

// Define variables
const n_row = 16;
const n_col = 12;
const width_square = 20;
const bomb_ratio = 0.1;

document.addEventListener('DOMContentLoaded', () => {

  // Define DOM elements
  const mainContainer = document.querySelector('.main-container');
  const gridContainer = document.querySelector('.grid');

  // Starting timer at config container
  const timer = new Timer(true);

  // Create grid
  const grid = new Grid(n_row, n_col, width_square); 
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  // Instantiate other objects
  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(bomb_ratio, grid.getN_Square(), squares);
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation);
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares); 
  const gameover = new GameOver(squares);
  const expansion = new ExpansionBlank(findNeighboringSquares);

  // Event Listeners

  // First click => start game
  gridContainer.addEventListener('click', e => {

    // Starting a timer at config container
    timer.start(document.querySelector('#timer'));

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

    // Subsequent clicks => reveal squares
    gridContainer.addEventListener('click', e => {

      // Reveal squares clicked
      e.target.classList.replace('hidden', 'revealed');
  
      // Validate if bomb was clicked at first click
      gameover.validateFirstClickBomb(e.target);

      // Initializate expansion method to reveal neighboring blanked squares
      expansion.verifyExpansionBlank(e.target); // Recursive Function
    });
  }, {once: true});

  gridContainer.addEventListener('contextmenu', e => {

    e.preventDefault();

    // Switch the flagged status' right clicked square
    e.target.dataset.isFlagged = e.target.dataset.isFlagged === 'false' ? 'true' : 'false';
  });

});