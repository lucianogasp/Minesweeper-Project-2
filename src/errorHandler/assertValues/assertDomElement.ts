import DOMElementAssertError from "@/errorHandler/models/DOMElementAssertError.ts";

export function assertDomElement<T extends HTMLElement>(domElement: T | null, query: string): T {

  if(!domElement) throw new DOMElementAssertError('The DOM Element is null', query);
  return domElement;
}