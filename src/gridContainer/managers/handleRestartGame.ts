import { startGame } from "./startGameManager.ts";
import type { StartGameObject } from "./startGameManager.types.ts";

export function handleRestartGame(currentGame: StartGameObject | undefined): StartGameObject {
  if(currentGame) {
    currentGame.restart();
  }
  return startGame();
}
