import domElements from "@/DOMElements/domElements.ts";
import { handleSettingsToggle } from "@/configContainer/settings.ts";

export function handleSettingsToggleListener() {
    domElements.settingsButton.addEventListener('click', () => handleSettingsToggle(domElements.previewWrapper));
}
