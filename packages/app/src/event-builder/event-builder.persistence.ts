import type { EventBuilderStore } from "./store/store";

export const persistStateToInputs = (store: EventBuilderStore, container: HTMLElement) => {
  const { start, end, until, allDay, rrule, repeatType, repeatEndType } = store.getState().event;

  updateInputValue(container, "start", start);
  updateInputValue(container, "end", end);
  updateInputValue(container, "until", until ?? "");
  updateInputValue(container, "allDay", allDay ? "1" : "0");
  updateInputValue(container, "repeatType", repeatType ?? "NEVER");
  updateInputValue(container, "repeatEndType", repeatEndType ?? "NEVER");
  updateInputValue(container, "rrule", rrule ?? "");
};

const updateInputValue = (container: HTMLElement, name: string, value: string | number) => {
  const input = container.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  if (!input) {
    return;
  }

  const nextValue = value.toString();
  if (input.value === nextValue) {
    return;
  }

  input.value = nextValue;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
