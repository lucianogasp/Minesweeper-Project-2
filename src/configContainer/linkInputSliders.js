import { validateInputSliderValue } from '../utils/helpers/validateInputSliderValue.ts';
import { updateElementValue } from '../utils/helpers/updateElementValue.js';

export const linkElementValue = domElement => e => {

  const validValue = validateInputSliderValue(e.target);
  updateElementValue(domElement, validValue);
}