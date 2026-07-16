// Import modules
import { assertDomElement } from "./assertDomElement.js";
import { errorHandler } from "../errorHandler/errorHandler.js";

export default {
  // At ./app.js
  mainWrapper: domQuery('.main-wrapper'),
  gameOverModal: domQuery('.game-over-modal'),
  gameOverModalText: domQuery('#game-over-modal-text'),
  gameOverModalRestartButton: domQuery('#game-over-modal-restart-button'),
  mainContainer: domQuery('.main-container'),
  bombRatioInput: domQuery('#bomb-ratio-number'),
  bombRatioSlider: domQuery('#bomb-ratio-slider'),
  squareWidthInput: domQuery('#square-width-number'),
  squareWidthSlider: domQuery('#square-width-slider'),
  settingsButton: domQuery('#settings-button'),
  previewSquare: domQuery('.preview-square'),
  previewWrapper: domQuery('.preview-wrapper'),
  smileSpan: domQuery('#smile'),

  //At ./headerContainer/toggleSmileFace.js
  smileFace: domQuery('#smile-face'),

  // At ./gridContainer/manager/managerFunctions.js
  timerCounter: domQuery('#number-timer'),
  bombCounter: domQuery('#number-count-bombs'),
  gameBody: domQuery('.game-body'),
  
  // At ./configContainer/getParams.js
  row: domQuery('#row'),
  column: domQuery('#column'),
  bombRatioNumber: domQuery('#bomb-ratio-number'),
  squareWidthNumber: domQuery('#square-width-number')
}

function domQuery(query) {
  
  const domElement = document.querySelector(query);
  errorHandler(assertDomElement)(domElement, query);
  return domElement;
}