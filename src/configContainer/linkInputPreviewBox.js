import { validateInputSliderValue } from '../utils/helpers/validateInputSliderValue.ts';
import { updateElementSize } from '../utils/helpers/updateElementSize.js';

export const linkElementSize = (squareWidthSlider, previewSquare) => {

  const validValue = validateInputSliderValue(squareWidthSlider);
  updateElementSize(previewSquare, validValue);
}