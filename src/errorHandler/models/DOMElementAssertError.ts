class DOMElementAssertError extends Error {

  public name: string;
  public domQuery: string;
  public isFatal: boolean;

  constructor(message: string, domQuery: string, isFatal: boolean = false) {
    super(message);
    this.name = this.constructor.name;
    this.domQuery = domQuery;
    this.isFatal = isFatal;
  }
}

export default DOMElementAssertError;