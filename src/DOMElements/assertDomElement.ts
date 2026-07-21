import DOMElementAssertError from "../errorHandler/models/DOMElementAssertError.js";

export function assertDomElement(domElement: HTMLElement | null, query: string): HTMLElement {

  if(!domElement) throw new DOMElementAssertError('The DOM Element is null', query);
  return domElement;
}