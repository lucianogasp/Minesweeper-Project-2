export function toggleClassList(domElement: HTMLElement, firstClass: string, secondClass: string | false = false): void {
  if(secondClass) {
    const hasFirstClass = domElement.classList.toggle(firstClass);
    domElement.classList.toggle(secondClass, !hasFirstClass);    
    return;
  }
  domElement.classList.toggle(firstClass);
}