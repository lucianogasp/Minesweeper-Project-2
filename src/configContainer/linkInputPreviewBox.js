import { validateInputSliderValue } from '../utils/validateInputSliderValue.js';
import { updateElementSize } from '../utils/updateElementSize.js';

export const linkElementSize = (squareWidthSlider, previewSquare) => {

  const validValue = validateInputSliderValue(squareWidthSlider);
  updateElementSize(previewSquare, validValue);
}