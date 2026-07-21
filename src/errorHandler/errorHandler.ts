import DOMElementAssertError from "./models/DOMElementAssertError.ts";
import ExpansionBlankError from "./models/ExpansionBlankError.ts";
import SquareElementCoordAttrError from "./models/SquareElementCoordAttrError.ts";
import GetSquareListError from "./models/GetSquareListError.ts";
import IncrementDigitError from "./models/IncrementDigitError.ts";
import RemoveGridContainerError from "./models/RemoveGridContainerError.ts";

function formatFatalError(isFatal: boolean): string {
  return isFatal ? `[FATAL ERROR]: ` : ``;
}

type errorHandlerCallback = (...args: any) => any;
export const errorHandler = <T extends errorHandlerCallback>(callback: T) => (...args: Parameters<T>): ReturnType<T> => {
  try {
    return callback(...args);
  } catch(err) {
    let userMessage: string = '';
    switch(true) {
      case err instanceof ExpansionBlankError:
      case err instanceof RemoveGridContainerError:
      case err instanceof IncrementDigitError:
      case err instanceof SquareElementCoordAttrError:
      case err instanceof GetSquareListError:
        userMessage = formatFatalError(err.isFatal);
        userMessage += err.stack;

        console.error(userMessage);
        break;
      
      case err instanceof DOMElementAssertError:
        userMessage = formatFatalError(err.isFatal);
        userMessage += `${err}\n`;
        userMessage += `Query: [${err.domQuery}]\n`;
        userMessage += err.stack;

        console.error(userMessage);
        break;
    }
    
    throw err;
  }
}