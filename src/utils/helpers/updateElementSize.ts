export const updateElementSize = (domElement: HTMLInputElement, value: number) => {

  domElement.style.width = `${value.toString()}px`;
  domElement.style.height = `${value.toString()}px`;
}