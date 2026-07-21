// Import modules
import domElements from "../DOMElements/domElements.ts";
import { toggleClassList } from "../utils/helpers/toggleClassList.ts";

export function dismissAlertMessage(): void {
  toggleClassList(domElements.mainWrapper, 'container-filter');
  toggleClassList(domElements.gameOverModal, 'hidden', 'revealed');  
}