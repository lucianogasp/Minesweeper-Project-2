import domElements from "@/DOMElements/domElements.ts";

export type DefaultParams = {
    n_row: number,
    n_col: number,
    bomb_ratio: number,
    width_square: number
}

export const getParams = (): DefaultParams => {
  return {
    n_row: parseInt(domElements.row.value),
    n_col: parseInt(domElements.column.value),
    bomb_ratio: parseInt(domElements.bombRatioNumber.value) / 100,
    width_square: parseInt(domElements.squareWidthNumber.value),
  }
};