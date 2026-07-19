// Import modules
import { toggleClassList } from "../utils/helpers/toggleClassList.ts";

export function handleSettingsToggle(previewWrapper) {
  toggleClassList(previewWrapper, 'hidden', 'revealed');
}