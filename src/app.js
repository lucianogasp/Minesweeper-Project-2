// import modules
import domElements from './DOMElements/domElements.ts';

import { startGame } from './gridContainer/managers/startGameManager.js';
import { linkElementValue } from './configContainer/linkInputSliders.ts';
import { linkElementSize } from './configContainer/linkInputPreviewBox.ts';
import { handleSettingsToggle } from './configContainer/settings.ts';
import { errorHandler } from './errorHandler/errorHandler.js';
import { dismissAlertMessage } from './mainWrapperContainer/dismissAlertMessage.ts';

document.addEventListener('DOMContentLoaded', () => {

  domElements.mainContainer.addEventListener('contextmenu', e => { e.preventDefault(); });

  // Link bombRatio input value to its slider
  domElements.bombRatioInput.addEventListener('input', linkElementValue(domElements.bombRatioSlider));
  domElements.bombRatioSlider.addEventListener('input', linkElementValue(domElements.bombRatioInput));

  // Link squareWidth input value to its slider
  domElements.squareWidthInput.addEventListener('input', linkElementValue(domElements.squareWidthSlider));
  domElements.squareWidthSlider.addEventListener('input', linkElementValue(domElements.squareWidthInput));

  // Link squareWidth input value to its box preview
  domElements.squareWidthInput.addEventListener('change', () => linkElementSize(domElements.squareWidthInput, domElements.previewSquare));
  domElements.squareWidthSlider.addEventListener('change', () => linkElementSize(domElements.squareWidthSlider, domElements.previewSquare));

  // Enable listener to settings button
  domElements.settingsButton.addEventListener('click', () => handleSettingsToggle(domElements.previewWrapper));

  // Enable click listener to restart game
  domElements.smileSpan.addEventListener('click', errorHandler(handleRestart));

  // Enable click listener to close game over modal window and/or restart game
  domElements.gameOverModalXMark.addEventListener('click', e => {
    dismissAlertMessage();
  });

  domElements.gameOverModalRestartButton.addEventListener('click', e => {
    dismissAlertMessage();
    errorHandler(handleRestart)(e);
  });

  // Define a method to handle the restart game method
  let currentGame;
  function handleRestart() {
    if(currentGame) {
      currentGame.restart();
    }
    currentGame = startGame(); // Start a New Game
  }

  linkElementSize(domElements.squareWidthInput, domElements.previewSquare) // Link the first squareWidth input value to its box preview
  currentGame = startGame(); // Start the First Game
});