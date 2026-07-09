import type { Weekday } from "rrule";
import type { RepeatEndType, RepeatType } from "../types";

export type WeekdayNormalization = {
  byweekday?: number[];
  bysetpos?: number[];
};

const repeatTypes = new Set<RepeatType>([
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
  "CUSTOM",
  "NEVER",
]);
const repeatEndTypes = new Set<RepeatEndType>(["NEVER", "AFTER", "ON_DATE"]);

export const normalizeByWeekday = (
  value?: Weekday | number | Array<Weekday | number>,
): WeekdayNormalization => {
  if (!value) {
    return {};
  }

  const values = Array.isArray(value) ? value : [value];
  const normalized: number[] = [];
  const positions = new Set<number>();

  values.forEach((entry) => {
    if (typeof entry === "number") {
      normalized.push(entry);
      return;
    }

    normalized.push(entry.weekday);
    if (typeof entry.n === "number") {
      positions.add(entry.n);
    }
  });

  return {
    byweekday: normalized.length ? normalized : undefined,
    bysetpos: positions.size ? Array.from(positions) : undefined,
  };
};

export const normalizeRepeatType = (value: unknown): RepeatType => {
  return repeatTypes.has(value as RepeatType) ? (value as RepeatType) : "NEVER";
};

export const normalizeRepeatEndType = (value: unknown): RepeatEndType => {
  return repeatEndTypes.has(value as RepeatEndType) ? (value as RepeatEndType) : "NEVER";
};
