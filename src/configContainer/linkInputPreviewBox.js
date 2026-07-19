import { validateInputSliderValue } from '../utils/helpers/validateInputSliderValue.js';
import { updateElementSize } from '../utils/helpers/updateElementSize.js';

export const linkElementSize = (squareWidthSlider, previewSquare) => {

  const validValue = validateInputSliderValue(squareWidthSlider);
  updateElementSize(previewSquare, validValue);
}