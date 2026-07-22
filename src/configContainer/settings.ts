import { toggleClassList } from "@/utils/helpers";

export function handleSettingsToggle(previewWrapper: HTMLElement): void {
  toggleClassList(previewWrapper, 'hidden', 'revealed');
}