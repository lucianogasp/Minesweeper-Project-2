export function toggleClassList(domElement, firstClass, secondClass=false) {
  if(secondClass) {
    const hasFirstClass = domElement.classList.toggle(firstClass);
    domElement.classList.toggle(secondClass, !hasFirstClass);    
    return;
  }
  domElement.classList.toggle(firstClass);
}