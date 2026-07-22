import domElements from "@/DOMElements/domElements.ts";
import { linkElementValue } from "@/configContainer/linkInputSliders.ts";

export function linkInputSlidersListener() {  
    domElements.bombRatioInput.addEventListener('input', linkElementValue(domElements.bombRatioSlider));
    domElements.bombRatioSlider.addEventListener('input', linkElementValue(domElements.bombRatioInput));
  
    domElements.squareWidthInput.addEventListener('input', linkElementValue(domElements.squareWidthSlider));
    domElements.squareWidthSlider.addEventListener('input', linkElementValue(domElements.squareWidthInput));
  }
