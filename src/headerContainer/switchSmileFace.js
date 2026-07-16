// Import modules
import domElements from "../DOMElements/domElements.js";

export function switchFaceToSmile() {
  domElements.smileFace.src = `./assets/smile-face3.png`;
}

export function switchFaceToSad() {
  domElements.smileFace.src = `./assets/sad-face2.png`;
}