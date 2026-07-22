import GameStatePropAssertError from "../models/GameStatePropAssertError.ts";

export function assertGameStateProp<T>(gameStateProp: T | null): T {

  if(!gameStateProp) throw new GameStatePropAssertError(`The GameState Property is null`);
  return gameStateProp;

}