// import modules
import { startGame } from './managers/startGameManager.js';

// Define variables
export const params = {
  n_row: 5,
  n_col: 5,
  width_square: 20,
  bomb_ratio: 0.1
}

document.addEventListener('DOMContentLoaded', () => {

  // Define DOM elements
  const smileSpan = document.querySelector('#smile');

  function enableRestartListener() {

    // Enable click listener of restart game
    smileSpan.addEventListener('click', handleRestart);
  }

  function disableRestartListener() {

    // Disable click listener of restart game
    smileSpan.removeEventListener('click', handleRestart);
  }

  let currentGame;

  function handleRestart() {

    if(currentGame) {
      currentGame.restart(); // Restart Game
    }

    currentGame = startGame(); // Start a new game
  }

  enableRestartListener(); // Enable the first smile button listener
  currentGame = startGame(); // Start the first game
    
});