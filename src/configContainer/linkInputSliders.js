import { validateInputSliderValue } from '../utils/helpers/validateInputSliderValue.js';
import { updateElementValue } from '../utils/helpers/updateElementValue.js';

export const linkElementValue = domElement => e => {

  const validValue = validateInputSliderValue(e.target);
  updateElementValue(domElement, validValue);
}