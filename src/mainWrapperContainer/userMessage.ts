// Import modules
import { delay } from "@/utils/helpers";
import { alertMessage } from './alertMessage.ts';

export async function userMessage(message: string): Promise<void> {

  await delay(0);
  alertMessage(message);
}