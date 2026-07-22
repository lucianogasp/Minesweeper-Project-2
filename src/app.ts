// import modules
import domElements from './DOMElements/domElements.ts';

import { startGame } from './gridContainer/managers/startGameManager.ts';
import { linkElementSize } from './configContainer/linkInputPreviewBox.ts';
import { errorHandler } from './errorHandler/errorHandler.ts';
import { dismissAlertMessage } from './mainWrapperContainer/dismissAlertMessage.ts';
import { handleRestartGame } from './gridContainer/handleRestartGame.ts';
import { 
  linkInputSlidersListener, 
  linkInputPreviewBoxListener,
  handleSettingsToggleListener,
  alertMessageCloseButtonListener
} from './eventListeners';

// import types
import type { StartGameObject } from './gridContainer/managers/startGameManager.types.ts';

document.addEventListener('DOMContentLoaded', () => {

  let currentGame: StartGameObject | undefined;

  domElements.mainContainer.addEventListener('contextmenu', e => { e.preventDefault(); });

  linkInputSlidersListener(); // Link bombRatio / squarewidth inputs values to its slider
  linkInputPreviewBoxListener(); // Link squareWidth input value to its box preview
  handleSettingsToggleListener(); // Enable Settings Button
  alertMessageCloseButtonListener(); // Enable Game Over Modal window Close Button
 
  // Enable Restart Game
  domElements.smileSpan.addEventListener('click', () => {
    currentGame = errorHandler(handleRestartGame)(currentGame)
  });
  // Enable Retart Game by the Game Over Modal window
  domElements.gameOverModalRestartButton.addEventListener('click', () => {
    dismissAlertMessage();
    currentGame = errorHandler(handleRestartGame)(currentGame);
  });

  linkElementSize(domElements.squareWidthInput, domElements.previewSquare) // Link the first squareWidth input value to its box preview

  currentGame = startGame();
});