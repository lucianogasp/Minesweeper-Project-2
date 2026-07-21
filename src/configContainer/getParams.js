// Import modules
import domElements from "../DOMElements/domElements.ts";

export const getParams = () => ({
  n_row: parseInt(domElements.row.value),
  n_col: parseInt(domElements.column.value),
  bomb_ratio: parseInt(domElements.bombRatioNumber.value) / 100,
  width_square: parseInt(domElements.squareWidthNumber.value),
});