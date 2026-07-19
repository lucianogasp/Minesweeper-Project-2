export function validateInputSliderValue(element) {

  const inputValue = Math.round(element.value);
  const validValue = Math.max(element.min, Math.min(element.max, element.value));
  return validValue;
}
