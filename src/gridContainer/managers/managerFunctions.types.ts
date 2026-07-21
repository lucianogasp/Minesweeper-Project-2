import type Grid from "../models/Grid.ts";
import type HeaderTimer from "../models/HeaderTimer.ts";
import type GameOver from "../models/GameOver.ts";
import type EndGame from "../models/EndGame.ts";
import type ExpansionBlank from "../models/ExpansionBlank.ts";
import type FlagCounter from "../models/FlagCounter.ts";

export type GridBuilder = {
  grid: Grid,
  gridContainer: HTMLDivElement
}

export type Timer = {
  timer: HeaderTimer
}

export type MinefieldObjects = {
  gameover: GameOver,
  endgame: EndGame,
  expansion: ExpansionBlank,
  flagCounter: FlagCounter
}