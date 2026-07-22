import { startGame } from "./startGameManager";
import type { StartGameObject } from "./startGameManager.types";

export function handleRestartGame(currentGame: StartGameObject | undefined): StartGameObject {
  if(currentGame) {
    currentGame.restart();
  }
  return startGame();
}
