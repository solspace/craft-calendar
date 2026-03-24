import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { format } from "date-fns";
import type { EventBuilderStore } from "./store/store";

export const persistStateToInputs = (store: EventBuilderStore, container: HTMLElement) => {
  const { start, end, until, timezone, allDay, rrule, repeatType, repeatEndType } =
    store.getState().event;

  updateInputValue(container, "start", serializeTimestamp(start));
  updateInputValue(container, "end", serializeTimestamp(end));
  updateInputValue(container, "until", until ? serializeTimestamp(until) : "");
  updateInputValue(container, "timezone", timezone || "UTC");
  updateInputValue(container, "allDay", allDay ? "1" : "0");
  updateInputValue(container, "repeatType", repeatType ?? "NEVER");
  updateInputValue(container, "repeatEndType", repeatEndType ?? "NEVER");
  updateInputValue(container, "rrule", rrule ?? "");
};

const serializeTimestamp = (timestamp: number): string | number => {
  const date = utcTimestampToLocalDisplayDate(timestamp);

  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
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
