  // Import modules
import Grid from './modules/grid.js';
import Squares from './modules/squares.js';
import Bomb from './modules/bomb.js';
import Digit from './modules/digit.js';
import GameOver from './modules/gameover.js';
import FilterSquares from './modules/filterSquares.js';
import Transcription from './modules/transcription.js';
import FindNeighboringSquares from './modules/findNeighboringSquares.js';
import { shuffle, computeTargetCoords, patternsOperation } from './modules/functionsModules.js';

// Define variables
const nRow = 5;
const nCol = 4;
const widthSquare = 20;
const bombRatio = 0.2;

document.addEventListener('DOMContentLoaded', () => {

  // Define objects
  const mainContainer = document.querySelector('.main-container');
  const gridContainer = document.querySelector('.grid-container');

  const grid = new Grid(nRow, nCol, widthSquare); // PARAMETERS: number of columns; rows; pixels of width for each square
  grid.setTemplateGrid(gridContainer);
  grid.createGrid(gridContainer);

  const squares = new Squares(Array.from(gridContainer.children));
  const bomb = new Bomb(bombRatio, grid.getN_Square(), squares); // PARAMETER: ratio of bombs; number of bombs; object of Squares()
  const findNeighboringSquares = new FindNeighboringSquares(Transcription, FilterSquares, squares, computeTargetCoords, patternsOperation); // PARAMETER: FilterSquares(); Transcription(); compute target coords method; patterns of the compute target coords method; object of Squares()
  const digit = new Digit(FilterSquares, findNeighboringSquares, squares); // PARAMETER: FilterSquares(); object of findNeightboringSquares(); object of Squares()
  const gameover = new GameOver(squares); // PARAMETER: object of Squares()

  // Event Listeners

  // First click => start game
  gridContainer.addEventListener('click', e => {

    const excludedFirstClickSquareList = FilterSquares.filterByNotClickedSquare(squares.getSquareList(), e.target);
    squares.setShuffledSquareList(bomb.shuffleSquareMethod(excludedFirstClickSquareList, shuffle));
    squares.setBombsList(bomb.sliceBombsList());
    bomb.setBombs();

    digit.applyDigitsMethod();

    digit.setDigits();

    // for (let print of squares.getSquareList()) {
    //   console.log(print);
    // }

  }, {once: true});

  // Subsequent clicks => reveal squares
  gridContainer.addEventListener('click', e => {
    e.target.classList.replace('hidden', 'revealed');

    if (gameover.validateClickBomb(e.target)) {
      gameover.handleBombRedSquare(e.target);
      gameover.handleIncorrectFlagSquare();
    }
  });


  gridContainer.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.target.dataset.isFlagged = e.target.dataset.isFlagged === 'false' ? 'true' : 'false';
  });

});