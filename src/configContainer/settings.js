export function handleSettingsToggle(previewWrapper) {

  const isHidden = previewWrapper.classList.toggle('hidden');
  previewWrapper.classList.toggle('revealed', !isHidden);
}