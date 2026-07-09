// import modules
import { startGame } from './managers/startGameManager.js';
import { linkBombRatioInputSlider, linkSquareWidthInputSlider } from './managers/configSliderManager.js';

// Define variables
// export const params = {
//   n_row: 16,
//   n_col: 24,
//   width_square: 15,
//   bomb_ratio: 0.1
// }

document.addEventListener('DOMContentLoaded', () => {

  // Define DOM Elements
  const smileSpan = document.querySelector('#smile');


  // Define the listener to restart the game
  function enableRestartListener() {

    // Enable click listener of restart game
    smileSpan.addEventListener('click', handleRestart);
  }

  // Define a method to handle the restart game method
  let currentGame;
  function handleRestart() {

    if(currentGame) {
      currentGame.restart(); // Restart Game
    }
    currentGame = startGame(); // Start a new game
  }

  // Initialize Application

  enableRestartListener(); // Enable the first smile button listener
  linkBombRatioInputSlider(); // Link and validate the input value of Bomb Ratio Config to its slider
  linkSquareWidthInputSlider(); // Link and validate the input value of Square Width Config to its slider
  currentGame = startGame(); // Start the first game

});