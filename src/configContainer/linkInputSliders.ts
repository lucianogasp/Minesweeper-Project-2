import { validateInputSliderValue, updateElementValue } from '@/utils/helpers';

export const linkElementValue = (domElement: HTMLInputElement) => (e: Event): void => {

  const target = e.target as HTMLInputElement;
  const validValue = validateInputSliderValue(target);
  updateElementValue(domElement, validValue);
}