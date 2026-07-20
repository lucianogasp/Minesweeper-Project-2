class IncrementDigitError extends Error {

  public name: string;
  public isFatal: boolean;

  constructor(message: string, isFatal: boolean = false) {
    super(message)
    this.name = this.constructor.name;
    this.isFatal = isFatal;
  }
}

export default IncrementDigitError;