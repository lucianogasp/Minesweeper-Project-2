function validateInputValue(element) {

  let inputValue = Math.round(element.value);
  inputValue = Math.max(element.min, Math.min(element.max, element.value));
  return inputValue;
}

export function linkBombRatioInputSlider() {

  const bombRatioInput = document.querySelector('#bomb-ratio-number');
  const bombRatioSlider = document.querySelector('#bomb-ratio-slider');

  bombRatioInput.addEventListener('input', e => {

    const inputValue = validateInputValue(e.target);
    bombRatioSlider.value = inputValue;
  });

  bombRatioSlider.addEventListener('input', e => {

    bombRatioInput.value = bombRatioSlider.value;
  });
}

export function linkSquareWidthInputSlider() {

  const squareWidthInput = document.querySelector('#square-width-number');
  const squareWidthSlider = document.querySelector('#square-width-slider');

  squareWidthInput.addEventListener('input', e => {

    const inputValue = validateInputValue(e.target);
    squareWidthSlider.value = inputValue;
  });

  squareWidthSlider.addEventListener('input', e => {

    squareWidthInput.value = squareWidthSlider.value;
  });
}