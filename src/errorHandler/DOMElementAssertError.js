class DOMElementAssertError extends Error {

  constructor(message, domQuery) {
    super(message);
    this.name = this.constructor.name;
    this.domQuery = domQuery;
  }
}

export default DOMElementAssertError;