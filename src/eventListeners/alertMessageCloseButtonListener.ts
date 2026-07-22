import domElements from "@/DOMElements/domElements.ts";
import { dismissAlertMessage } from "@/mainWrapperContainer/dismissAlertMessage.ts";

export function alertMessageCloseButtonListener() {
  domElements.gameOverModalXMark.addEventListener('click', () => {
    dismissAlertMessage();
  });
}