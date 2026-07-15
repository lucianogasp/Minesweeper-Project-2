import DOMElementAssertError from "./DOMElementAssertError.js";
import ExpansionBlankError from "./ExpansionBlankError.js";

export const errorHandler = (callback) => (...args) => {
  try {
    return callback(...args);
  } catch(err) {
    if(err instanceof ExpansionBlankError) {
      const userMessage = `${err.name}: ${err.message}`;
      console.error(userMessage);
      return; 
    }
    if(err instanceof DOMElementAssertError) {
      const userMessage = `${err.name}: ${err.message}. The query was '${err.domQuery}'`;
      console.error(userMessage);
      return;
    }

    throw err;
  }
}