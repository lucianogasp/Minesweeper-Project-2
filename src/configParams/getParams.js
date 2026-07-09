// Define params from the app's front-end
const row = document.querySelector('#row');
const column = document.querySelector('#column');
const bombRatioNumber = document.querySelector('#bomb-ratio-number');
const squareWidthNumber = document.querySelector('#square-width-number');

// Define a method to get the params from the app's front-end
export const getParams = () => ({
  n_row: parseInt(row.value),
  n_col: parseInt(column.value),
  bomb_ratio: parseInt(bombRatioNumber.value) / 100,
  width_square: parseInt(squareWidthNumber.value),
});