// import modules
import DOMElementAssertError from "../errorHandler/DOMElementAssertError.js";

export function assertDomElement(domElement) {

  if(!domElement) throw new DOMElementAssertError('the DOM Element is undefined or null');
  return;
}