import DOMElementAssertError from "./DOMElementAssertError.js";
import ExpansionBlankError from "./ExpansionBlankError.js";
import RemoveGridContainerError from "./removeGridContainerError.js";

function handleCatchError(err) {
  let userMessage = '';

  if(err.isFatal) {
    userMessage += ` FATAL ERROR: \n`;
  }
  userMessage += `${err.stack}:`;
  
  console.error(userMessage);
}

export const errorHandler = (callback) => (...args) => {
  try {
    return callback(...args);
  } catch(err) {
    if(err instanceof ExpansionBlankError) {
      handleCatchError(err);
      return;
    }
    if(err instanceof DOMElementAssertError) {
      handleCatchError(err);
      return;
    }
    if(err instanceof RemoveGridContainerError) {
      handleCatchError(err);
      return;
    }

    throw err;
  }
}