import { setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";

const WALL_TIME_WITH_OPTIONAL_ZONE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?$/;

export const UTCify = (value: Date | string): Date => {
  if (typeof value === "string") {
    const match = value.match(WALL_TIME_WITH_OPTIONAL_ZONE);

    if (match) {
      const [, year, month, day, hour, minute, second = "0", fraction = ""] = match;
      const milliseconds = fraction ? Number(fraction.slice(1).padEnd(3, "0")) : 0;

      return new Date(
        Date.UTC(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hour),
          Number(minute),
          Number(second),
          milliseconds,
        ),
      );
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new Error(`Invalid date string passed to UTCify: ${value}`);
    }
  }

  const date = typeof value === "string" ? new Date(value) : value;

  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );
};

export const UTCifyDateOnly = (value: Date | string): Date => {
  const date = setHours(setMinutes(setSeconds(setMilliseconds(value, 0), 0), 0), 0);

  return UTCify(date);
};

export const utcDateKey = (date: Date): string => {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
