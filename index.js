// Import modules
import Timer from './modules/timer.js';
import Grid from './modules/grid.js';
import Squares from './modules/squares.js';
import Bomb from './modules/bomb.js';
import Digit from './modules/digit.js';
import GameOver from './modules/gameover.js';
import ExpansionBlank from './modules/expansionBlank.js';
import FilterSquares from './modules/filterSquares.js';
import Transcription from './modules/transcription.js';
import FindNeighboringSquares from './modules/findNeighboringSquares.js';
import { shuffle, computeTargetCoords, patternsOperation } from './modules/functionsModules.js';

// Define variables
const nRow = 16;
const nCol = 12;
const widthSquare = 20;
const bombRatio = 0.1;

document.addEventListener('DOMContentLoaded', () => {

  // Define objects
  const mainContainer = document.querySelector('.main-container');
  const gridContainer = document.querySelector('.grid');

  const timer = new Timer(true);
  const grid = new Grid(nRow, nCol, widthSquare); // PARAMETERS: number of columns; rows; pixels of width for each square
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(bombRatio, grid.getN_Square(), squares); // PARAMETER: ratio of bombs; number of bombs; object of Squares()
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation); // PARAMETER: FilterSquares(); Transcription(); object of Squares(); compute target coords method; patterns of the compute target coords method;
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares); // PARAMETER: FilterSquares(); object of findNeighboringSquares(); object of Squares()
  const gameover = new GameOver(squares); // PARAMETER: object of Squares()
  const expansion = new ExpansionBlank(findNeighboringSquares); // PARAMETER: object of findNeighboringSquares();

  // Event Listeners

  // First click => start game
  gridContainer.addEventListener('click', e => {

    timer.start(document.querySelector('#timer'));

    const excludedFirstClickSquareList = FilterSquares.filterByNotClickedSquare(squares.getSquareList(), e.target);
    squares.setShuffledSquareList(bomb.shuffleSquareMethod(excludedFirstClickSquareList, shuffle));
    squares.setBombsList(bomb.sliceBombsList());

    bomb.setBombs();
    digit.applyDigitsMethod();
    digit.setDigits();

    // Subsequent clicks => reveal squares
    gridContainer.addEventListener('click', e => {

      e.target.classList.replace('hidden', 'revealed');
  
      gameover.validateFirstClickBomb(e.target);
      expansion.verifyExpansionBlank(e.target);
    });
  }, {once: true});

  gridContainer.addEventListener('contextmenu', e => {

    e.preventDefault();
    e.target.dataset.isFlagged = e.target.dataset.isFlagged === 'false' ? 'true' : 'false';
  });

});