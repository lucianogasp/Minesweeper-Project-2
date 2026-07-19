// Import modules
import DOMElementAssertError from "../errorHandler/models/DOMElementAssertError.js";

export function assertDomElement(domElement, query) {

  if(!domElement) throw new DOMElementAssertError('The DOM Element is undefined or null', query);
  return;
}