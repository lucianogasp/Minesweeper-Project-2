// Import modules
import domElements from "../DOMElements/domElements.js";

export async function userMessage(message) {

  await delay(0);
  popUpMessage(message);
}

function delay(ms) {
  return new Promise( resolve => {
    setTimeout(resolve, ms);
  });
}

function popUpMessage(message) {
  domElements.mainWrapper.classList.toggle('container-filter');

  const isHidden = domElements.gameOverModal.classList.toggle('hidden');
  domElements.gameOverModal.classList.toggle('revealed', !isHidden);

  domElements.gameOverModalText.innerHTML = `${message}`;
}