class GameStatePropAssertError extends Error {

  public name: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default GameStatePropAssertError;