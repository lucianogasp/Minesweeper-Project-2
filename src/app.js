// import modules
import domElements from './DOMElements/domElements.js';

import { startGame } from './gridContainer/managers/startGameManager.js';
import { linkElementValue } from './configContainer/linkInputSliders.js';
import { linkElementSize } from './configContainer/linkInputPreviewBox.js';
import { handleSettingsToggle } from './configContainer/settings.js';

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
  domElements.smileSpan.addEventListener('click', handleRestart);

  // Define a method to handle the restart game method
  let currentGame;
  function handleRestart() {
    if(currentGame) {
      currentGame.restart(); // Restart Game
    }
    currentGame = startGame();
  }

  linkElementSize(domElements.squareWidthInput, domElements.previewSquare) // Link the first squareWidth input value to its box preview
  currentGame = startGame(); // Start the first game
});