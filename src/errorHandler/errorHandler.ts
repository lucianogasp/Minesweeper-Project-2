import DOMElementAssertError from "./models/DOMElementAssertError.js";
import ExpansionBlankError from "./models/ExpansionBlankError.js";
import RemoveGridContainerError from "./models/RemoveGridContainerError.js";

function formatFatalError(isFatal: boolean): string {
  return isFatal ? `[FATAL ERROR]: ` : ``;
}

type errorHandlerCallback = (...args: any) => any;
export const errorHandler = <T extends errorHandlerCallback>(callback: T) => (...args: Parameters<T>): ReturnType<T> | void => {
  try {
    return callback(...args);
  } catch(err) {
    if(err instanceof ExpansionBlankError || err instanceof RemoveGridContainerError) {
      let userMessage = formatFatalError(err.isFatal);
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

    throw err;
  }
}