export function validateInputSliderValue(element: HTMLInputElement): number {

  const value = parseInt(element.value);
  const min = parseInt(element.min);
  const max = parseInt(element.max);

  const inputValue = Math.round(value);
  const validValue = Math.max(min, Math.min(max, inputValue));
  return validValue;
}
