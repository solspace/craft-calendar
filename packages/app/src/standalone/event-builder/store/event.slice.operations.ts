import {
  localDisplayDateToUtcTimestamp,
  UTCify,
  UTCifyDateOnly,
  utcTimestampToLocalDisplayDate,
} from "@cal/utils/date";
import { getBaseRRule, getRRuleSetFromString, normalizeRfcLine } from "@cal/utils/rrule";
import { Frequency, type Options, RRule, RRuleSet } from "rrule";
import type { Event } from "../types";
import {
  normalizeByWeekday,
  normalizeRepeatCount,
  normalizeRepeatEndType,
  normalizeRepeatType,
} from "./store.normalizers";

export type EventState = Event & {
  freq?: Frequency;
  interval: number;
  count?: number | null;

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
  const startDate = utcTimestampToLocalDisplayDate(state.start);
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
  const baseRRule = buildBaseRRule(state);
  const fixedDateLines = extractFixedDateLines(state.rrule, state);

  if (!baseRRule && fixedDateLines.length === 0) {
    state.rrule = undefined;

    return;
  }

  if (baseRRule && fixedDateLines.length === 0) {
    state.rrule = serializeRfcString(baseRRule.toString(), state.allDay);

    return;
  }

  state.rrule = [...buildBaseLines(state, baseRRule), ...fixedDateLines].join("\n");
};

export const removeRDates = (rruleString?: string): string | undefined => {
  const lines = rruleString?.split(/\r?\n/).filter((line) => !line.trim().startsWith("RDATE"));

  return lines?.length ? lines.join("\n") : undefined;
};

export const removeMatchingDate = (dates: Date[], timestamp: number): Date[] =>
  dates.filter((date) => date.getTime() !== timestamp);

const buildBaseRRule = (state: EventState): RRule | null => {
  const { repeatEndType, allDay, interval, count } = state;

  const startSource = utcTimestampToLocalDisplayDate(state.start);
  const untilSource = state.until ? utcTimestampToLocalDisplayDate(state.until) : null;

  const startDate = allDay ? UTCifyDateOnly(startSource) : UTCify(startSource);
  const until =
    repeatEndType === "ON_DATE" && untilSource
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
      return null;
  }

  return new RRule(options);
};

export const buildOccurrenceDateForState = (state: EventState, timestamp: number): Date => {
  const occurrenceDate = utcTimestampToLocalDisplayDate(timestamp);

  if (state.allDay) {
    return UTCifyDateOnly(occurrenceDate);
  }

  const startDate = utcTimestampToLocalDisplayDate(state.start);
  occurrenceDate.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), 0);

  return UTCify(occurrenceDate);
};

export const buildRRuleString = (
  state: Pick<EventState, "start" | "allDay">,
  baseRRule: RRule | null,
  rdates: Date[] = [],
  exdates: Date[] = [],
): string | undefined => {
  if (!baseRRule && rdates.length === 0 && exdates.length === 0) {
    return undefined;
  }

  const lines = [...buildBaseLines(state, baseRRule)];

  if (rdates.length > 0 || exdates.length > 0) {
    const fixedDateSet = new RRuleSet();
    rdates.forEach((date) => {
      fixedDateSet.rdate(date);
    });
    exdates.forEach((date) => {
      fixedDateSet.exdate(date);
    });

    lines.push(...serializeRfcString(fixedDateSet.toString(), state.allDay).split("\n"));
  }

  return lines.join("\n");
};

export const serializeRfcString = (rfcString: string, allDay: boolean) =>
  rfcString
    .split("\n")
    .map((line) => normalizeRfcLine(line, allDay))
    .filter(Boolean)
    .join("\n");

const buildBaseLines = (
  state: Pick<EventState, "start" | "allDay">,
  baseRRule: RRule | null,
): string[] => {
  if (baseRRule) {
    return serializeRfcString(baseRRule.toString(), state.allDay).split("\n");
  }

  const startDate = buildStartDateForState(state);
  const startSet = new RRuleSet();
  startSet.dtstart(startDate);
  startSet.rdate(startDate);

  return serializeRfcString(startSet.toString(), state.allDay).split("\n");
};

const normalizeFixedDateLine = (line: string, state: EventState): string => {
  const source = getRRuleSetFromString(line);
  const fixedDates = new RRuleSet();

  // Fixed dates follow the event's wall time, including when returning from all-day mode.
  source?.rdates().forEach((date) => {
    fixedDates.rdate(buildOccurrenceDateForState(state, date.getTime() / 1000));
  });
  source?.exdates().forEach((date) => {
    fixedDates.exdate(buildOccurrenceDateForState(state, date.getTime() / 1000));
  });

  return serializeRfcString(fixedDates.toString(), state.allDay);
};

const extractFixedDateLines = (rruleString: string | undefined, state: EventState): string[] => {
  if (!rruleString) {
    return [];
  }

  const lines = rruleString
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const hasBaseRule = lines.some((line) => line.startsWith("RRULE"));
  if (hasBaseRule) {
    return lines
      .filter((line) => line.startsWith("RDATE") || line.startsWith("EXDATE"))
      .map((line) => normalizeFixedDateLine(line, state));
  }

  const dtstartLine = lines.find((line) => line.startsWith("DTSTART"));
  const dtstartValue = dtstartLine?.split(":", 2)[1]?.trim();

  return lines.flatMap((line) => {
    if (!line.startsWith("RDATE") && !line.startsWith("EXDATE")) {
      return [];
    }

    if (!dtstartValue || !line.startsWith("RDATE")) {
      return [normalizeFixedDateLine(line, state)];
    }

    const [property, rawValue = ""] = line.split(":", 2);
    const values = rawValue
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .filter((value) => value !== dtstartValue);

    if (values.length === 0) {
      return [];
    }

    return [normalizeFixedDateLine(`${property}:${values.join(",")}`, state)];
  });
};

const buildStartDateForState = (state: Pick<EventState, "start" | "allDay">): Date => {
  const startSource = utcTimestampToLocalDisplayDate(state.start);

  return state.allDay ? UTCifyDateOnly(startSource) : UTCify(startSource);
};

const weekdayMap = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

export const buildNthByweekday = (values?: number[], position?: number) => {
  if (!values?.length || !position) {
    return values;
  }

  return values.map((weekday) => weekdayMap[weekday]?.nth(position)).filter(Boolean);
};

export const alignUntilForState = (state: EventState, untilSeconds: number) => {
  const untilDate = utcTimestampToLocalDisplayDate(untilSeconds);

  if (state.allDay) {
    untilDate.setHours(0, 0, 0, 0);
  } else {
    const startDate = utcTimestampToLocalDisplayDate(state.start);

    // Align Until time with Start time, so that the event doesn't end on the previous day
    untilDate.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), 0);
  }

  return localDisplayDateToUtcTimestamp(untilDate);
};

export type GeneratedScheduleInput = {
  start: number;
  end: number;
  allDay: boolean;
  repeatType?: string | null;
  repeatEndType?: string | null;
  rrule?: string | null;
  until?: number | null;
  timezone?: string | null;
};

const inferRepeatEndType = (
  input: GeneratedScheduleInput,
  baseRule: ReturnType<typeof getBaseRRule>,
): ReturnType<typeof normalizeRepeatEndType> => {
  // COUNT/UNTIL on the rule always wins so AI drafts stay valid even if the client sent NEVER.
  if (baseRule?.options.count) {
    return "AFTER";
  }

  if (baseRule?.options.until || input.until) {
    return "ON_DATE";
  }

  if (input.repeatEndType) {
    return normalizeRepeatEndType(input.repeatEndType);
  }

  return "NEVER";
};

/** Hydrate event-builder state from AI / API schedule without rebuilding a fresh rrule. */
export const buildEventStateFromSchedule = (input: GeneratedScheduleInput): EventState => {
  const baseRule = getBaseRRule(input.rrule || undefined);
  const { byweekday, bysetpos } = normalizeByWeekday(baseRule?.options.byweekday);
  const repeatType = normalizeRepeatType(input.repeatType);
  const repeatEndType = inferRepeatEndType(input, baseRule);
  const untilFromRule =
    baseRule?.options.until instanceof Date
      ? Math.floor(baseRule.options.until.getTime() / 1000)
      : undefined;

  return {
    start: input.start,
    end: input.end,
    until: input.until ?? untilFromRule,
    timezone: input.timezone || undefined,
    allDay: input.allDay,
    repeatType,
    repeatEndType,
    rrule: input.rrule || undefined,
    freq: baseRule?.options.freq || Frequency.DAILY,
    interval: baseRule?.options.interval || 1,
    count:
      repeatEndType === "AFTER"
        ? normalizeRepeatCount(baseRule?.options.count)
        : baseRule?.options.count || null,
    byweekday,
    bymonth: baseRule?.options.bymonth,
    bymonthday: baseRule?.options.bymonthday,
    byyearday: baseRule?.options.byyearday,
    bysetpos: baseRule?.options.bysetpos ?? bysetpos,
  };
};
