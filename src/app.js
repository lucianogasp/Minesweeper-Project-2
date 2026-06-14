// import modules
import { startGame } from './eventManagers/eventManagerConfigs.js';

// Define variables
export const params = {
  n_row: 16,
  n_col: 12,
  width_square: 20,
  bomb_ratio: 0.1
}

document.addEventListener('DOMContentLoaded', () => {

  // Define DOM elements
  const mainContainer = document.querySelector('.main-container');

  // Define Execute Functions
  
  startGame();
});