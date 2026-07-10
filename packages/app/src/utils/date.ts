import { Temporal } from "temporal-polyfill";

/*
 * Calendar times are floating wall times: 09:00 stays 09:00 for everyone.
 *
 * FullCalendar, react-datepicker, and rrule still require JS Date objects, so this module uses
 * "UTC-carrier" Dates at those boundaries. A UTC-carrier Date is not an instant; its UTC fields
 * carry the floating calendar date/time.
 */

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const WALL_TIME_WITH_OPTIONAL_ZONE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?$/;

type FloatingPlainDate = Temporal.PlainDate;
type FloatingPlainDateTime = Temporal.PlainDateTime;

const pad = (value: number): string => String(value).padStart(2, "0");

const formatPlainDate = (date: FloatingPlainDate): string =>
  `${date.year}-${pad(date.month)}-${pad(date.day)}`;

const formatPlainDateTime = (date: FloatingPlainDateTime): string =>
  `${date.year}-${pad(date.month)}-${pad(date.day)}T${pad(date.hour)}:${pad(date.minute)}:${pad(date.second)}`;

const localDisplayDateToFloatingDateTime = (date: Date): FloatingPlainDateTime =>
  new Temporal.PlainDateTime(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

const utcCarrierDateToFloatingDateTime = (date: Date): FloatingPlainDateTime =>
  new Temporal.PlainDateTime(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );

const floatingDateTimeToUtcCarrierDate = (date: FloatingPlainDateTime): Date =>
  new Date(
    Date.UTC(
      date.year,
      date.month - 1,
      date.day,
      date.hour,
      date.minute,
      date.second,
      date.millisecond,
    ),
  );

const floatingDateTimeToLocalDisplayDate = (date: FloatingPlainDateTime): Date =>
  new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour,
    date.minute,
    date.second,
    date.millisecond,
  );

const parseFloatingDateString = (value: string): FloatingPlainDate | null => {
  const match = value.match(DATE_ONLY);
  if (!match) {
    return null;
  }

  const [, year, month, day] = match;

  return new Temporal.PlainDate(Number(year), Number(month), Number(day));
};

const parseFloatingDateTimeString = (value: string): FloatingPlainDateTime | null => {
  const date = parseFloatingDateString(value);
  if (date) {
    return date.toPlainDateTime();
  }

  const match = value.match(WALL_TIME_WITH_OPTIONAL_ZONE);
  if (!match) {
    return null;
  }

  const [, year, month, day, hour, minute, second = "0", fraction = ""] = match;
  const millisecond = fraction ? Number(fraction.slice(1).padEnd(3, "0")) : 0;

  return new Temporal.PlainDateTime(
    Number(year),
    Number(month),
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
    millisecond,
  );
};

const toFloatingDateTime = (value: Date | string): FloatingPlainDateTime => {
  if (typeof value !== "string") {
    return localDisplayDateToFloatingDateTime(value);
  }

  const floatingDateTime = parseFloatingDateTimeString(value);
  if (floatingDateTime) {
    return floatingDateTime;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date string passed to toFloatingDateTime: ${value}`);
  }

  return localDisplayDateToFloatingDateTime(parsed);
};

const toFloatingDate = (value: Date | string): FloatingPlainDate =>
  toFloatingDateTime(value).toPlainDate();

// UTC-carrier bridge for libraries that still require JS Date objects.

/**
 * Converts a floating wall time into a UTC-carrier Date.
 * The returned Date is not an instant; its UTC fields carry the calendar wall time.
 */
export const UTCify = (value: Date | string): Date =>
  floatingDateTimeToUtcCarrierDate(toFloatingDateTime(value));

/**
 * Converts a floating date into a UTC-carrier Date at midnight.
 */
export const UTCifyDateOnly = (value: Date | string): Date => {
  const date = toFloatingDate(value);

  return floatingDateTimeToUtcCarrierDate(date.toPlainDateTime());
};

// Display bridge for date-picker controls.

export const utcToLocalDisplayDate = (value: Date | string): Date => {
  if (typeof value === "string") {
    const floatingDateTime = parseFloatingDateTimeString(value);
    if (floatingDateTime) {
      return floatingDateTimeToLocalDisplayDate(floatingDateTime);
    }
  }

  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date string passed to utcToLocalDisplayDate: ${value}`);
  }

  return floatingDateTimeToLocalDisplayDate(utcCarrierDateToFloatingDateTime(date));
};

export const utcTimestampToLocalDisplayDate = (timestamp: number): Date =>
  utcToLocalDisplayDate(new Date(timestamp * 1000));

export const localDisplayDateToUtcTimestamp = (value: Date): number =>
  Math.floor(UTCify(value).getTime() / 1000);

// API/query serialization helpers.

export const utcDateTimeString = (date: Date): string =>
  formatPlainDateTime(utcCarrierDateToFloatingDateTime(date));

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

  return formatPlainDate(utcCarrierDateToFloatingDateTime(date).toPlainDate());
};

export const utcDatePath = (date: Date): string => utcDateKey(date).replaceAll("-", "/");

// UTC-carrier date arithmetic.

export const shiftUtcDateByDays = (date: Date, days: number): Date =>
  floatingDateTimeToUtcCarrierDate(utcCarrierDateToFloatingDateTime(date).add({ days }));

export const utcDifferenceInDays = (start: Date, end: Date): number => {
  const startDate = utcCarrierDateToFloatingDateTime(start).toPlainDate();
  const endDate = utcCarrierDateToFloatingDateTime(end).toPlainDate();

  return startDate.until(endDate).days;
};
