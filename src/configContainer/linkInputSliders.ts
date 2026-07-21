import { validateInputSliderValue } from '../utils/helpers/validateInputSliderValue.ts';
import { updateElementValue } from '../utils/helpers/updateElementValue.ts';

export const linkElementValue = (domElement: HTMLInputElement) => (e: Event): void => {

  const target = e.target as HTMLInputElement;
  const validValue = validateInputSliderValue(target);
  updateElementValue(domElement, validValue);
}