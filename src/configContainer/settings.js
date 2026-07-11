export function handleSettingsToggle(sizePreviewBox) {

  const isHidden = sizePreviewBox.classList.toggle('d-none');
  sizePreviewBox.classList.toggle('d-flex', !isHidden);
}