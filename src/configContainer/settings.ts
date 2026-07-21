// Import modules
import { toggleClassList } from "../utils/helpers/toggleClassList.ts";

export function handleSettingsToggle(previewWrapper: HTMLElement): void {
  toggleClassList(previewWrapper, 'hidden', 'revealed');
}