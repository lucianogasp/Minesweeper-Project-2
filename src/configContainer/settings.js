// Import modules
import { toggleClassList } from "../utils/toggleClassList.js";

export function handleSettingsToggle(previewWrapper) {
  toggleClassList(previewWrapper, 'hidden', 'revealed');
}