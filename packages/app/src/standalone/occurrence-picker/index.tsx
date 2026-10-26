import { createRoot, type Root } from "react-dom/client";
import { OccurrencePicker, type OccurrencePickerConfig } from "./occurrence-picker";

const roots = new Map<HTMLElement, { root: Root; element: HTMLElement }>();
const scan = () => {
  for (const [host, mounted] of roots) {
    if (!host.isConnected) {
      roots.delete(host);
      mounted.root.unmount();
    }
  }
  document.querySelectorAll<HTMLElement>("[data-calendar-occurrence-picker]").forEach((host) => {
    if (roots.has(host)) return;
    const input = host.querySelector<HTMLElement>(":scope > .input");
    if (!input) return;
    const config: OccurrencePickerConfig = JSON.parse(host.dataset.calendarOccurrencePicker!);
    const element = document.createElement("div");
    element.dataset.pickerRoot = "";
    input.append(element);
    const root = createRoot(element);
    roots.set(host, { root, element });
    root.render(<OccurrencePicker host={host} config={config} />);
  });
};
const start = () => {
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
};
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
