// import modules
import { startGame, enableRestartListener } from './eventManagers/eventManagerConfig.js';

// Define variables
export const params = {
  n_row: 16,
  n_col: 12,
  width_square: 20,
  bomb_ratio: 0.1
}

document.addEventListener('DOMContentLoaded', () => {

  debugger;
  startGame();
});