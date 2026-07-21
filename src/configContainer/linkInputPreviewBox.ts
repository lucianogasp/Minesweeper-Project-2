import { validateInputSliderValue } from '../utils/helpers/validateInputSliderValue.ts';
import { updateElementSize } from '../utils/helpers/updateElementSize.ts';

export const linkElementSize = (squareWidthSlider: HTMLInputElement, previewSquare: HTMLInputElement): void => {

  const validValue = validateInputSliderValue(squareWidthSlider);
  updateElementSize(previewSquare, validValue);
}