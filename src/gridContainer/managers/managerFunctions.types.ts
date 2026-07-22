// import types
import type {
  Grid,
  HeaderTimer,
  GameOver,
  EndGame,
  ExpansionBlank,
  FlagCounter
} from "@/gridContainer/models";

// export types
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