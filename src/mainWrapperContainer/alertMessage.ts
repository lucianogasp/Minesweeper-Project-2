// Import modules
import domElements from "../DOMElements/domElements.ts";
import { toggleClassList } from "../utils/helpers/toggleClassList.ts";

export function alertMessage(message: string): void {
  toggleClassList(domElements.mainWrapper, 'container-filter');
  toggleClassList(domElements.gameOverModal, 'hidden', 'revealed');
  domElements.gameOverModalText.innerHTML = `${message}`;
}