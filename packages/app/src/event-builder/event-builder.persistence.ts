import { format } from "date-fns";
import type { EventBuilderStore } from "./store/store";

export const persistStateToInputs = (store: EventBuilderStore, container: HTMLElement) => {
  const { start, end, until, timezone, allDay, rrule, repeatType, repeatEndType } =
    store.getState().event;

  updateInputValue(container, "start", serializeTimestamp(start, allDay));
  updateInputValue(container, "end", serializeTimestamp(end, allDay));
  updateInputValue(container, "until", until ? serializeTimestamp(until, allDay) : "");
  updateInputValue(container, "timezone", timezone || resolveLocalTimezone());
  updateInputValue(container, "allDay", allDay ? "1" : "0");
  updateInputValue(container, "repeatType", repeatType ?? "NEVER");
  updateInputValue(container, "repeatEndType", repeatEndType ?? "NEVER");
  updateInputValue(container, "rrule", rrule ?? "");
};

const serializeTimestamp = (timestamp: number, allDay: boolean): string | number => {
  const date = new Date(timestamp * 1000);

  if (allDay) {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
  }

  return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
};

const resolveLocalTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
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
