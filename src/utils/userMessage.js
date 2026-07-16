// Import modules
import { delay } from "./delay.js";
import { alertMessage } from '../mainWrapperContainer/alertMessage.js';

export async function userMessage(message) {

  await delay(0);
  alertMessage(message);
}