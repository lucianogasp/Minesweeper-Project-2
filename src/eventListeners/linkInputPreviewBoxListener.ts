import domElements from "@/DOMElements/domElements.ts";
import { linkElementSize } from "@/configContainer/linkInputPreviewBox.ts";

export function linkInputPreviewBoxListener() {
  domElements.squareWidthInput.addEventListener('change', () => linkElementSize(domElements.squareWidthInput, domElements.previewSquare));
  domElements.squareWidthSlider.addEventListener('change', () => linkElementSize(domElements.squareWidthSlider, domElements.previewSquare));
}
