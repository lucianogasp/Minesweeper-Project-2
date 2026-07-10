import { validateInputSliderValue } from '../utils/validateInputSliderValue.js';
import { updateElementValue } from '../utils/updateElementValue.js';

export const linkElementValue = domElement => e => {

  const validValue = validateInputSliderValue(e.target);
  updateElementValue(domElement, validValue);
}