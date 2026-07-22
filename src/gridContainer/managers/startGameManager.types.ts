import type EndGame from "../models/EndGame.ts";
import type ExpansionBlank from "../models/ExpansionBlank.ts";
import type FlagCounter from "../models/FlagCounter.ts";
import type GameOver from "../models/GameOver.ts";
import type Grid from "../models/Grid.ts";
import type HeaderTimer from "../models/HeaderTimer.ts";
import type { DefaultParams } from "@/configContainer/getParams.ts";

export type StartGameObject = {
  restart: Function
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