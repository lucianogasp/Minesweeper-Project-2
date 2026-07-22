// import types
import type {
  EndGame,
  ExpansionBlank,
  FlagCounter,
  GameOver,
  Grid,
  HeaderTimer
} from "@/gridContainer/models";
import type {
  DefaultParams
} from "@/configContainer/getParams.ts";

// export types
export type StartGameObject = {
  restart: () => void;
}

export type GameStateObject = {
    callbackStatus: 'enabled' | 'disabled',
    currentParams: DefaultParams | null,
    isFirstClick: boolean,

    grid: Grid | null,
    gridContainer: HTMLDivElement | null,
    timer: HeaderTimer | null,
    gameover: GameOver | null,
    endgame: EndGame | null,
    expansion: ExpansionBlank | null,
    flagCounter: FlagCounter | null,

    verifyGameOver: (isGameOver: boolean) => void
}