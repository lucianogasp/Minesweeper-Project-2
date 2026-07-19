class DOMElementAssertError extends Error {

  constructor(message, domQuery, isFatal=false) {
    super(message);
    this.name = this.constructor.name;
    this.domQuery = domQuery;
    this.isFatal = isFatal;
  }
}

export default DOMElementAssertError;