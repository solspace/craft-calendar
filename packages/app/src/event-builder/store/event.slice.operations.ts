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
  console.log(`[rrule]: building (${state.repeatType}) from state:`, { ...state });

  let options: Partial<Options> = {
    dtstart: new Date(state.start * 1000),
    interval: state.interval,
    count: state.count,
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
        until:
          state.repeatEndType !== "ON_DATE"
            ? undefined
            : state.until
              ? new Date(state.until * 1000)
              : undefined,
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
    console.log("[rrule]: skipping rrule, not repeating");
    state.rrule = undefined;
    return;
  }

  const rrule = new RRule(options);
  state.rrule = rrule.toString();

  console.log("[rrule]: rrule built:", state.rrule, options);
};

const weekdayMap = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

export const buildNthByweekday = (values?: number[], position?: number) => {
  if (!values?.length || !position) {
    return values;
  }

  return values.map((weekday) => weekdayMap[weekday]?.nth(position)).filter(Boolean);
};

export const toUnixSeconds = (date: Date) => Math.floor(date.getTime() / 1000);

export const setMidnight = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};

export const alignToStartTime = (date: Date, start: Date) => {
  date.setHours(start.getHours(), start.getMinutes(), start.getSeconds(), 0);
  return date;
};

export const alignUntilForState = (state: EventState, untilSeconds: number) => {
  const untilDate = new Date(untilSeconds * 1000);

  if (state.allDay) {
    setMidnight(untilDate);
  } else {
    alignToStartTime(untilDate, new Date(state.start * 1000));
  }

  return toUnixSeconds(untilDate);
};
