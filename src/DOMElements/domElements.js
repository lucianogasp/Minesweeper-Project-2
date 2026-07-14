// import modules
import { assertDomElement } from "./assertDomElement.js";

export default {
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
  assertDomElement(domElement);
  return domElement;
}