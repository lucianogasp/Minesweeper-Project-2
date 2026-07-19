// Import modules
import domElements from "../DOMElements/domElements.js";
import { toggleClassList } from "../utils/helpers/toggleClassList.js";

export function dismissAlertMessage() {
  toggleClassList(domElements.mainWrapper, 'container-filter');
  toggleClassList(domElements.gameOverModal, 'hidden', 'revealed');  
}