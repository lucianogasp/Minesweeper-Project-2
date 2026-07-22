import { assertDomElement } from "@/errorHandler/assertValues";
import { errorHandler } from "@/errorHandler/errorHandler.ts";

function domQuery<T extends HTMLElement>(query: string): T {
  
  const domElementOrNull = document.querySelector<T>(query);
  const domElement = errorHandler(assertDomElement<T>)(domElementOrNull, query);
  return domElement;
}

export default {
  // imported at ./app.js
  mainWrapper: domQuery<HTMLElement>('.main-wrapper'),
  gameOverModal: domQuery<HTMLDivElement>('.game-over-modal'),
  gameOverModalText: domQuery<HTMLDivElement>('#game-over-modal-text'),
  gameOverModalRestartButton: domQuery<HTMLButtonElement>('#game-over-modal-restart-button'),
  gameOverModalXMark: domQuery<HTMLDivElement>('#game-over-modal-x-mark'),
  mainContainer: domQuery<HTMLDivElement>('.main-container'),
  bombRatioInput: domQuery<HTMLInputElement>('#bomb-ratio-number'),
  bombRatioSlider: domQuery<HTMLInputElement>('#bomb-ratio-slider'),
  squareWidthInput: domQuery<HTMLInputElement>('#square-width-number'),
  squareWidthSlider: domQuery<HTMLInputElement>('#square-width-slider'),
  settingsButton: domQuery<HTMLDivElement>('#settings-button'),
  previewSquare: domQuery<HTMLDivElement>('.preview-square'),
  previewWrapper: domQuery<HTMLDivElement>('.preview-wrapper'),
  smileSpan: domQuery<HTMLSpanElement>('#smile'),

  // imported at ./headerContainer/toggleSmileFace.js
  smileFace: domQuery<HTMLImageElement>('#smile-face'),

  // imported at ./gridContainer/manager/managerFunctions.js
  timerCounter: domQuery<HTMLSpanElement>('#number-timer'),
  bombCounter: domQuery<HTMLSpanElement>('#number-count-bombs'),
  gameBody: domQuery<HTMLDivElement>('.game-body'),
  
  // imported at ./configContainer/getParams.js
  row: domQuery<HTMLInputElement>('#row'),
  column: domQuery<HTMLInputElement>('#column'),
  bombRatioNumber: domQuery<HTMLInputElement>('#bomb-ratio-number'),
  squareWidthNumber: domQuery<HTMLInputElement>('#square-width-number')
}