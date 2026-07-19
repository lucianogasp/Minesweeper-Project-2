// Import modules
import { delay } from "../utils/helpers/delay.js";
import { alertMessage } from './alertMessage.js';

export async function userMessage(message) {

  await delay(0);
  alertMessage(message);
}