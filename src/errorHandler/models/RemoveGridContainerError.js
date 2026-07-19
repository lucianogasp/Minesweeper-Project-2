class RemoveGridContainerError extends Error {

  constructor(message, isFatal=false) {
    super(message);
    this.name = this.constructor.name;
    this.isFatal = isFatal;
  }
}

export default RemoveGridContainerError;