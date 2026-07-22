export const updateElementSize = (domElement: HTMLDivElement, value: number) => {

  domElement.style.width = `${value.toString()}px`;
  domElement.style.height = `${value.toString()}px`;
}