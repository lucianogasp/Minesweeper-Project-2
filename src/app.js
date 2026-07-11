// import modules
import { startGame } from './gridContainer/managers/startGameManager.js';
import { linkElementValue } from './configContainer/linkInputSliders.js';
import { linkElementSize } from './configContainer/linkInputPreviewBox.js';
import { handleSettingsToggle } from './configContainer/settings.js';

document.addEventListener('DOMContentLoaded', () => {

  // Define DOM Elements
  const bombRatioInput = document.querySelector('#bomb-ratio-number');
  const bombRatioSlider = document.querySelector('#bomb-ratio-slider');
  const squareWidthInput = document.querySelector('#square-width-number');
  const squareWidthSlider = document.querySelector('#square-width-slider');
  const previewSquare = document.querySelector('.preview-square');
  
  const settingsButton = document.querySelector('#settings-button');
  const previewWrapper= document.querySelector('.preview-wrapper');
  const smileSpan = document.querySelector('#smile');

  // Link bombRatio input value to its slider
  bombRatioInput.addEventListener('input', linkElementValue(bombRatioSlider));
  bombRatioSlider.addEventListener('input', linkElementValue(bombRatioInput));

  // Link squareWidth input value to its slider
  squareWidthInput.addEventListener('input', linkElementValue(squareWidthSlider));
  squareWidthSlider.addEventListener('input', linkElementValue(squareWidthInput));

  // Link squareWidth input value to its box preview
  squareWidthInput.addEventListener('change', () => linkElementSize(squareWidthInput, previewSquare));
  squareWidthSlider.addEventListener('change', () => linkElementSize(squareWidthSlider, previewSquare));

  // Enable listener to settings button
  settingsButton.addEventListener('click', () => handleSettingsToggle(previewWrapper));

  // Enable click listener to restart game
  function enableRestartListener() {
    smileSpan.addEventListener('click', handleRestart);
  }

  // Define a method to handle the restart game method
  let currentGame;
  function handleRestart() {
    if(currentGame) {
      currentGame.restart(); // Restart Game
    }
  }

  linkElementSize(squareWidthInput, previewSquare) // Link the first squareWidth input value to its box preview
  enableRestartListener(); // Enable the first smile button listener

  currentGame = startGame(); // Start the first game
});