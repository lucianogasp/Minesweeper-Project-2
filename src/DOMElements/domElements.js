// import modules
import { assertDomElement } from "./assertDomElement.js";
import { errorHandler } from "../errorHandler/errorHandler.js";

export default {
  mainContainer: domQuery('.main-container'),
  bombRatioInput: domQuery('#bomb-ratio-number'),
  bombRatioSlider: domQuery('#bomb-ratio-slider'),
  squareWidthInput: domQuery('#square-width-number'),
  squareWidthSlider: domQuery('#square-width-slider'),
  previewSquare: domQuery('.preview-square'),
  settingsButton: domQuery('#settings-button'),
  previewWrapper: domQuery('.preview-wrapper'),
  smileSpan: domQuery('#smile'),
  timerCounter: domQuery('#number-timer'),
  bombCounter: domQuery('#number-count-bombs'),
  gameBody: domQuery('.game-body')
}

function domQuery(query) {
  
  const domElement = document.querySelector(query);
  errorHandler(assertDomElement)(domElement, query);
  return domElement;
}