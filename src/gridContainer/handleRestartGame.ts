import { startGame } from "./managers/startGameManager.ts";
import type { StartGameObject } from "./managers/startGameManager.types.ts";

export function handleRestartGame(currentGame: StartGameObject | undefined): StartGameObject {
  if(currentGame) {
    currentGame.restart();
  }
  return startGame();
}
