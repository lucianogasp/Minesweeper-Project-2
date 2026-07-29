// Import modules
import domElements from "@/DOMElements/domElements.ts";

import smileFaceSource from '@/assets/smile-face3.png';
import sadFaceSource from '@/assets/sad-face2.png';

export function switchFaceToSmile(): void {
  domElements.smileFace.src = smileFaceSource;
}
export function switchFaceToSad(): void {
  domElements.smileFace.src = sadFaceSource;
}