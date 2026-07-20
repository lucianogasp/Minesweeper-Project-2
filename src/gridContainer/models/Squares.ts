import GetSquareListError from "@/errorHandler/models/GetSquareListError.ts";

class Squares {

  private squareList: HTMLElement[];
  private shuffledSquareList: HTMLElement[] | undefined;
  private bombsList: HTMLElement[] | undefined;

  constructor(squareList: HTMLElement[]) {
    this.squareList = squareList;
    this.shuffledSquareList = undefined;
    this.bombsList = undefined;
  }

  getSquareList(): HTMLElement[] {
    return this.squareList;
  }
  setSquaresList(newSquareList: HTMLElement[]): void {
    this.squareList = newSquareList;
  }

  getShuffledSquareList(): HTMLElement[] {
    if (this.shuffledSquareList){
      return this.shuffledSquareList;
    }
    throw new GetSquareListError('The ShuffledSquareList of the HTMLElement array is undefined.', true);
  }
  setShuffledSquareList(newShuffledList: HTMLElement[]): void {
    this.shuffledSquareList = newShuffledList;
  }

  getBombsList(): HTMLElement[] {
    if (this.bombsList){
      return this.bombsList;
    }
    throw new GetSquareListError('The BombsList of the HTMLElement array is undefined', true);

  }
  setBombsList(newBombsList: HTMLElement[]): void {
    this.bombsList = newBombsList;
  }
}

export default Squares;