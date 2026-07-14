export class ExpansionBlankError extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}