// Import modules
import domElements from "../DOMElements/domElements.js";
import { toggleClassList } from "../utils/toggleClassList.js";

export function alertMessage(message) {
  toggleClassList(domElements.mainWrapper, 'container-filter');
  toggleClassList(domElements.gameOverModal, 'hidden', 'revealed');
  domElements.gameOverModalText.innerHTML = `${message}`;
}