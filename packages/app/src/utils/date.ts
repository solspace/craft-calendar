import { setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const WALL_TIME_WITH_OPTIONAL_ZONE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?$/;

const toDate = (value: Date | string): Date =>
  typeof value === "string" ? new Date(value) : value;

/**
 * Converts a date or date string to a Date object in UTC.
 * If the input is a date-only string (YYYY-MM-DD), it will be treated as UTC midnight of that date.
 * If the input is a wall time string with an optional time zone, it will be parsed accordingly.
 * For other date strings, it will be parsed by the Date constructor and then converted to UTC.
 */
export const UTCify = (value: Date | string): Date => {
  if (typeof value === "string") {
    const dateOnlyMatch = value.match(DATE_ONLY);
    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;

      return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0));
    }

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

  const date = toDate(value);

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

/**
 * Converts a date or date string to a Date object in UTC, treating date-only inputs as UTC midnight.
 * This is useful for cases where you want to ensure that a date-only value is always interpreted as UTC,
 * regardless of the local time zone.
 */
export const UTCifyDateOnly = (value: Date | string): Date => {
  const date = setHours(setMinutes(setSeconds(setMilliseconds(value, 0), 0), 0), 0);

  return UTCify(date);
};

export const utcToLocalDisplayDate = (value: Date | string): Date => {
  const date = toDate(value);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );
};

export const utcTimestampToLocalDisplayDate = (timestamp: number): Date =>
  utcToLocalDisplayDate(new Date(timestamp * 1000));

export const localDisplayDateToUtcTimestamp = (value: Date): number =>
  Math.floor(UTCify(value).getTime() / 1000);

export const utcDateKey = (date: Date | string): string => {
  if (typeof date === "string") {
    const dateOnlyMatch = date.match(DATE_ONLY);
    if (dateOnlyMatch) {
      return date;
    }

    const match = date.match(WALL_TIME_WITH_OPTIONAL_ZONE);
    if (match) {
      const [, year, month, day] = match;
      return `${year}-${month}-${day}`;
    }

    throw new Error(`Invalid date string passed to utcDateKey: ${date}`);
  }

  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const utcDatePath = (date: Date): string => utcDateKey(date).replaceAll("-", "/");

export const shiftUtcDateByDays = (date: Date, days: number): Date =>
  new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + days,
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds(),
    ),
  );

export const utcDifferenceInDays = (start: Date, end: Date): number => {
  const startTime = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endTime = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.round((endTime - startTime) / (24 * 60 * 60 * 1000));
};
