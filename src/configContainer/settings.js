// Import modules
import { toggleClassList } from "../utils/helpers/toggleClassList.js";

export function handleSettingsToggle(previewWrapper) {
  toggleClassList(previewWrapper, 'hidden', 'revealed');
}