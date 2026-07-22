import { validateInputSliderValue, updateElementSize } from '@/utils/helpers';

export const linkElementSize = (squareWidthSlider: HTMLInputElement, previewSquare: HTMLDivElement): void => {

  const validValue = validateInputSliderValue(squareWidthSlider);
  updateElementSize(previewSquare, validValue);
}