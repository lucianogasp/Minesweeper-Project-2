import DOMElementAssertError from "./models/DOMElementAssertError.js";
import ExpansionBlankError from "./models/ExpansionBlankError.js";
import RemoveGridContainerError from "./models/RemoveGridContainerError.js";

function formatFatalError(isFatal) {
  return isFatal ? `[FATAL ERROR]: ` : ``;
}

export const errorHandler = (callback) => (...args) => {
  try {
    return callback(...args);
  } catch(err) {
    if(err instanceof ExpansionBlankError) {
      let userMessage = formatFatalError(err);
      userMessage += err.stack;

      console.error(userMessage);
      return;
    }
    if(err instanceof DOMElementAssertError) {
      let userMessage = formatFatalError(err.isFatal);
      userMessage += `${err}\n`;
      userMessage += `Query: [${err.domQuery}]\n`;
      userMessage += err.stack;

      console.error(userMessage);
      return;
    }
    if(err instanceof RemoveGridContainerError) {
      let userMessage = formatFatalError(err);
      userMessage += err.stack;

      console.error(userMessage);
      return;
    }

    throw err;
  }
}