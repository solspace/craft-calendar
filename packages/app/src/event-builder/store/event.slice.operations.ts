import { UTCify, UTCifyDateOnly } from "@cal/utils/date";
import { getUnixTime } from "date-fns";
import { Frequency, type Options, RRule } from "rrule";
import type { Event } from "../types";

export type EventState = Event & {
  freq?: Frequency;
  interval: number;
  count: number | null;

  byweekday?: number[];
  bymonth?: number[];
  bymonthday?: number[];
  byyearday?: number[];
  bysetpos?: number[];
};

export const normalizeDays = (values?: number[]) => {
  if (!values || values.length === 0) {
    return undefined;
  }

  return Array.from(new Set(values));
};

export const resetByRulesForFreq = (state: EventState, freq: Frequency) => {
  const startDate = new Date(state.start * 1000);
  const monthDay = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const weekday = (startDate.getDay() + 6) % 7;

  state.byweekday = undefined;
  state.bymonth = undefined;
  state.bymonthday = undefined;
  state.byyearday = undefined;
  state.bysetpos = undefined;

  switch (freq) {
    case Frequency.WEEKLY:
      state.byweekday = [weekday];
      break;

    case Frequency.MONTHLY:
      state.bymonthday = [monthDay];
      break;

    case Frequency.YEARLY:
      state.bymonth = [month];
      state.bymonthday = [monthDay];
      break;

    default:
      break;
  }
};

export const rebuildRRule = (state: EventState) => {
  const { repeatEndType, allDay, interval, count } = state;

  const startSource = new Date(state.start * 1000);
  const untilSource = state.until ? new Date(state.until * 1000) : null;

  const startDate = allDay ? UTCifyDateOnly(startSource) : UTCify(startSource);
  const until =
    repeatEndType === "ON_DATE" && state.until
      ? allDay
        ? UTCifyDateOnly(untilSource)
        : UTCify(untilSource)
      : undefined;

  let options: Partial<Options> = {
    dtstart: startDate,
    interval,
    count: repeatEndType === "AFTER" ? count : undefined,
    until: repeatEndType === "ON_DATE" ? until : undefined,
  };

  switch (state.repeatType) {
    case "DAILY":
      options = {
        ...options,
        freq: Frequency.DAILY,
      };
      break;

    case "WEEKLY":
      options = {
        ...options,
        freq: Frequency.WEEKLY,
      };
      break;

    case "MONTHLY":
      options = {
        ...options,
        freq: Frequency.MONTHLY,
      };
      break;

    case "YEARLY":
      options = {
        ...options,
        freq: Frequency.YEARLY,
      };
      break;

    case "CUSTOM": {
      const yearlyUsesNthWeekday =
        state.freq === Frequency.YEARLY && state.bysetpos?.length && state.byweekday?.length;
      const bysetpos = yearlyUsesNthWeekday ? undefined : state.bysetpos;
      const byweekday = yearlyUsesNthWeekday
        ? buildNthByweekday(state.byweekday, state.bysetpos?.[0])
        : state.byweekday;

      options = {
        ...options,
        freq: state.freq,
        interval: state.interval,
        count: state.repeatEndType !== "AFTER" ? undefined : state.count,
        byweekday,
        bymonth: state.bymonth,
        bymonthday: state.bymonthday,
        byyearday: state.byyearday,
        bysetpos,
      };
      break;
    }

    default:
      options = null;
      break;
  }

  if (options === null) {
    state.rrule = undefined;
    return;
  }

  const rrule = new RRule(options);
  const rruleString = parseRRuleDates(rrule.toString(), state.allDay);

  state.rrule = rruleString;
};

const weekdayMap = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

export const buildNthByweekday = (values?: number[], position?: number) => {
  if (!values?.length || !position) {
    return values;
  }

  return values.map((weekday) => weekdayMap[weekday]?.nth(position)).filter(Boolean);
};

export const alignUntilForState = (state: EventState, untilSeconds: number) => {
  const untilDate = new Date(untilSeconds * 1000);

  if (state.allDay) {
    untilDate.setHours(0, 0, 0, 0);
  } else {
    const startDate = new Date(state.start * 1000);

    // Align Until time with Start time, so that the event doesn't end on the previous day
    untilDate.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), 0);
  }

  return getUnixTime(untilDate);
};

const parseRRuleDates = (rruleString: string, allDay: boolean) => {
  console.log(rruleString);
  return rruleString
    .replace(/DTSTART:(\d{8})T(\d{6})Z?/, (_, date, time) => {
      if (allDay) {
        return `DTSTART:${date}`;
      }

      return `DTSTART:${date}T${time}`;
    })
    .replace(/UNTIL=(\d{8})T(\d{6})Z?/, (_, date, time) => {
      if (allDay) {
        return `UNTIL=${date}`;
      }

      return `UNTIL=${date}T${time}`;
    });
};
