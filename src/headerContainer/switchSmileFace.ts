// Import modules
import domElements from "../DOMElements/domElements.ts";

export function switchFaceToSmile(): void {
  domElements.smileFace.src = `./src/assets/smile-face3.png`;
}

export function switchFaceToSad(): void {
  domElements.smileFace.src = `./src/assets/sad-face2.png`;
}