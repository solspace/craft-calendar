import {
  localDisplayDateToUtcTimestamp,
  utcDateKey,
  utcDateTimeString,
  utcTimestampToLocalDisplayDate,
  utcToLocalDisplayDate,
} from "@cal/utils/date";
import { getDateLocale } from "@cal/utils/localization";
import { getBaseRRule, getRRuleSetFromString } from "@cal/utils/rrule";
import translate from "@cal/utils/translations";
import {
  buildOccurrenceDateForState,
  buildRRuleString,
  type EventState,
  removeMatchingDate,
} from "@event-builder/store/event.slice.operations";
import { addYears, format, startOfDay } from "date-fns";
import { Frequency, RRule, type RRuleSet } from "rrule";

const dedupeDates = (dates: Date[]): Date[] => {
  const map = new Map(dates.map((date) => [date.getTime(), date])).values();

  return Array.from(map).sort((left, right) => left.getTime() - right.getTime());
};

const toStartTimestamp = (start: number): number =>
  localDisplayDateToUtcTimestamp(startOfDay(utcTimestampToLocalDisplayDate(start)));

const toOccurrenceTimestamp = (date: Date): number =>
  localDisplayDateToUtcTimestamp(startOfDay(utcToLocalDisplayDate(date)));

const toUtcDayStart = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));

const toUtcDayEnd = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));

const toUtcDayTimestamp = (date: Date): number => Math.floor(toUtcDayStart(date).getTime() / 1000);

type FixedDateMutationInput = {
  baseRule: RRule | null;
  rdates: Date[];
  exdates: Date[];
};

export type PreviewRecurrence = {
  startTimestamp: number;
  firstOccurrenceTimestamp: number;
  baseRule: RRule | null;
  recurrenceSet: RRuleSet | null;
  addedDateSet: Set<number>;
};

export type OccurrenceStatus = {
  timestamp: number;
  full: boolean;
  base: boolean;
  excluded: boolean;
  rdate: boolean;
};

export const buildPreviewRecurrence = (
  rrule: string | undefined,
  start: number,
): PreviewRecurrence => {
  const startTimestamp = toStartTimestamp(start);
  const baseRule = getBaseRRule(rrule) ?? null;
  const recurrenceSet = getRRuleSetFromString(rrule);
  const firstOccurrence = baseRule?.after(new Date(startTimestamp * 1000), true);

  const addedDateSet = new Set(
    (recurrenceSet?.rdates() ?? [])
      .map(toOccurrenceTimestamp)
      .filter((timestamp) => (baseRule ? true : timestamp !== startTimestamp)),
  );

  return {
    startTimestamp,
    firstOccurrenceTimestamp: firstOccurrence
      ? toOccurrenceTimestamp(firstOccurrence)
      : startTimestamp,
    baseRule,
    recurrenceSet,
    addedDateSet,
  };
};

export const getOccurrenceStatus = (
  previewRecurrence: PreviewRecurrence,
  date: Date,
): OccurrenceStatus => {
  const timestamp = toUtcDayTimestamp(date);
  const rangeStart = toUtcDayStart(date);
  const rangeEnd = toUtcDayEnd(date);

  const base = previewRecurrence.baseRule
    ? previewRecurrence.baseRule.between(rangeStart, rangeEnd, true).length > 0
    : false;

  const full = previewRecurrence.recurrenceSet
    ? previewRecurrence.recurrenceSet.between(rangeStart, rangeEnd, true).length > 0
    : timestamp === previewRecurrence.startTimestamp;

  return {
    timestamp,
    full,
    base,
    excluded: base && !full,
    rdate: previewRecurrence.addedDateSet.has(timestamp),
  };
};

/** The date list shows days; editing needs the original scheduled start, including its time. */
export const getOccurrenceRecurrenceId = (
  previewRecurrence: PreviewRecurrence,
  date: Date,
): string | null => {
  const occurrence = previewRecurrence.recurrenceSet?.between(
    toUtcDayStart(date),
    toUtcDayEnd(date),
    true,
  )[0];

  return occurrence ? utcDateTimeString(occurrence) : null;
};

export const isProtectedOccurrence = (
  previewRecurrence: PreviewRecurrence,
  timestamp: number,
): boolean =>
  timestamp === previewRecurrence.startTimestamp ||
  timestamp === previewRecurrence.firstOccurrenceTimestamp;

export const getOccurrenceRemovalType = (
  previewRecurrence: PreviewRecurrence,
  date: Date,
): "rdate" | "exdate" | null => {
  const status = getOccurrenceStatus(previewRecurrence, date);

  if (!status.full || isProtectedOccurrence(previewRecurrence, status.timestamp)) {
    return null;
  }

  if (status.rdate) {
    return "rdate";
  }

  return status.base ? "exdate" : null;
};

export const buildPreviewEvents = (
  previewRecurrence: PreviewRecurrence,
  viewRange: { start: Date; end: Date } | null,
) => {
  if (!viewRange) {
    return [];
  }

  const rangeStart = toUtcDayStart(viewRange.start);
  const rangeEnd = toUtcDayEnd(viewRange.end);
  const viewStartTimestamp = toUtcDayTimestamp(viewRange.start);
  const viewEndTimestamp = toUtcDayTimestamp(viewRange.end);

  let timestamps: number[] = [];

  if (previewRecurrence.recurrenceSet) {
    timestamps = previewRecurrence.recurrenceSet
      .between(rangeStart, rangeEnd, true)
      .map(toOccurrenceTimestamp);
  } else {
    const isStartInView =
      previewRecurrence.startTimestamp >= viewStartTimestamp &&
      previewRecurrence.startTimestamp <= viewEndTimestamp;

    if (isStartInView) {
      timestamps = [previewRecurrence.startTimestamp];
    }
  }

  return Array.from(new Set(timestamps)).map((timestamp) => ({
    id: utcDateKey(new Date(timestamp * 1000)),
    start: format(utcTimestampToLocalDisplayDate(timestamp), "yyyy-MM-dd"),
    allDay: true,
  }));
};

export const buildUpcomingOccurrences = (
  previewRecurrence: PreviewRecurrence,
  fromDate: Date | null,
  limit: number,
): number[] => {
  if (!fromDate) {
    return [];
  }

  if (!previewRecurrence.recurrenceSet) {
    const fromTimestamp = toUtcDayTimestamp(fromDate);

    if (previewRecurrence.startTimestamp >= fromTimestamp) {
      return [previewRecurrence.startTimestamp];
    }

    return [];
  }

  const occurrences = previewRecurrence.recurrenceSet
    .between(
      toUtcDayStart(fromDate),
      addYears(toUtcDayEnd(fromDate), 100),
      true,
      (_, index) => index < limit,
    )
    .map(toOccurrenceTimestamp);

  return Array.from(new Set(occurrences)).slice(0, limit);
};

export const buildNextRRuleForDateMutation = (
  state: EventState,
  previewRecurrence: PreviewRecurrence,
  type: "rdate" | "exdate",
  timestamp: number,
  add: boolean,
): string | undefined => {
  if (
    ((type === "exdate" && add) || (type === "rdate" && !add)) &&
    isProtectedOccurrence(previewRecurrence, toUtcDayTimestamp(new Date(timestamp * 1000)))
  ) {
    return state.rrule;
  }

  const occurrenceDate = buildOccurrenceDateForState(state, timestamp);
  const occurrenceTime = occurrenceDate.getTime();

  const next = mutateFixedDates(previewRecurrence, ({ baseRule, rdates, exdates }) => {
    const nextRDates = buildNextFixedDateList(
      rdates,
      occurrenceDate,
      occurrenceTime,
      type === "rdate",
      add,
    );

    return {
      baseRule,
      rdates:
        type === "exdate" && add ? removeMatchingDate(nextRDates, occurrenceTime) : nextRDates,
      exdates: buildNextFixedDateList(
        exdates,
        occurrenceDate,
        occurrenceTime,
        type === "exdate",
        add,
      ),
    };
  });

  return buildRRuleString(
    state,
    next.baseRule,
    dedupeDates(next.rdates),
    dedupeDates(next.exdates),
  );
};

const mutateFixedDates = (
  previewRecurrence: PreviewRecurrence,
  mutate: (input: FixedDateMutationInput) => FixedDateMutationInput,
): FixedDateMutationInput =>
  mutate({
    baseRule: previewRecurrence.baseRule,
    rdates: getMutableRDates(previewRecurrence),
    exdates: previewRecurrence.recurrenceSet?.exdates() ?? [],
  });

const buildNextFixedDateList = (
  dates: Date[],
  occurrenceDate: Date,
  occurrenceTime: number,
  shouldMutate: boolean,
  add: boolean,
): Date[] => {
  if (!shouldMutate) {
    return dates;
  }

  if (add) {
    return [...dates, occurrenceDate];
  }

  return removeMatchingDate(dates, occurrenceTime);
};

const getMutableRDates = (previewRecurrence: PreviewRecurrence): Date[] => {
  const rdates = previewRecurrence.recurrenceSet?.rdates() ?? [];

  if (previewRecurrence.baseRule) {
    return rdates;
  }

  return rdates.filter((date) => toOccurrenceTimestamp(date) !== previewRecurrence.startTimestamp);
};

const weekdayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const positionNames: Record<number, string> = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  [-1]: "last",
};

const toArray = <T>(value: T | T[] | null | undefined): T[] => {
  if (value === null || value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

const joinList = (items: string[]): string => {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  const last = items[items.length - 1];
  const rest = items.slice(0, -1).join(", ");

  return translate("{list} and {last}", { list: rest, last });
};

const describeWeekdays = (weekdays: number[]): string => {
  const unique = Array.from(new Set(weekdays)).sort((left, right) => left - right);

  if (unique.join() === "0,1,2,3,4") {
    return translate("weekday");
  }

  if (unique.join() === "5,6") {
    return translate("weekend day");
  }

  return joinList(unique.map((day) => translate(weekdayNames[day])));
};

const describeInterval = (frequency: Frequency, interval: number): string => {
  const units: Record<number, [string, string, string]> = {
    [Frequency.DAILY]: ["Every day", "Every {count} days", "day"],
    [Frequency.WEEKLY]: ["Every week", "Every {count} weeks", "week"],
    [Frequency.MONTHLY]: ["Every month", "Every {count} months", "month"],
    [Frequency.YEARLY]: ["Every year", "Every {count} years", "year"],
  };

  const [single, plural] = units[frequency] ?? units[Frequency.DAILY];

  return interval > 1 ? translate(plural, { count: interval }) : translate(single);
};

export const describeRecurrence = (
  previewRecurrence: PreviewRecurrence,
  dateFormat = "PP",
): string | null => {
  const { baseRule } = previewRecurrence;

  if (!baseRule) {
    return null;
  }

  const options = baseRule.origOptions;
  const frequency = options.freq ?? Frequency.DAILY;
  const parts: string[] = [describeInterval(frequency, options.interval ?? 1)];

  const weekdays = toArray(options.byweekday).map((day) =>
    typeof day === "number" ? day : typeof day === "string" ? RRule[day].weekday : day.weekday,
  );
  const monthDays = toArray(options.bymonthday);
  const months = toArray(options.bymonth);
  const positions = toArray(options.bysetpos);

  if (months.length > 0 && frequency === Frequency.YEARLY) {
    parts.push(
      translate("in {months}", {
        months: joinList(months.map((month) => translate(monthNames[month - 1]))),
      }),
    );
  }

  if (positions.length > 0 && weekdays.length > 0) {
    parts.push(
      translate("on the {position} {weekday}", {
        position: translate(positionNames[positions[0]] ?? "first"),
        weekday: describeWeekdays(weekdays),
      }),
    );
  } else if (weekdays.length > 0) {
    parts.push(translate("on {weekdays}", { weekdays: describeWeekdays(weekdays) }));
  } else if (monthDays.length > 0) {
    parts.push(translate("on day {days}", { days: joinList(monthDays.map(String)) }));
  }

  const description = parts.join(" ");

  if (options.count) {
    return translate("{description}, ending after {count} {noun}.", {
      description,
      count: options.count,
      noun: translate(options.count === 1 ? "occurrence" : "occurrences"),
    });
  }

  if (options.until) {
    return translate("{description}, ending on {date}.", {
      description,
      date: format(utcToLocalDisplayDate(options.until), dateFormat, { locale: getDateLocale() }),
    });
  }

  return `${description}.`;
};

export type OccurrenceSummary = {
  showing: number;
  total: number | null;
  excluded: number;
};

export const buildOccurrenceSummary = (
  previewRecurrence: PreviewRecurrence,
  showing: number,
): OccurrenceSummary | null => {
  const { baseRule, recurrenceSet } = previewRecurrence;

  if (!baseRule || !recurrenceSet) {
    return null;
  }

  const isBounded = Boolean(baseRule.origOptions.count || baseRule.origOptions.until);
  const total = isBounded ? recurrenceSet.all().length : null;

  let excluded = 0;
  const exdates = recurrenceSet.exdates();

  if (exdates.length > 0 && isBounded) {
    const baseTimes = new Set(baseRule.all().map((date) => toOccurrenceTimestamp(date)));
    excluded = exdates.filter((date) => baseTimes.has(toOccurrenceTimestamp(date))).length;
  } else {
    excluded = exdates.length;
  }

  return { showing, total, excluded };
};

export const describeOccurrenceSummary = (summary: OccurrenceSummary): string => {
  const base =
    summary.total === null
      ? translate("Showing {showing} occurrences", { showing: summary.showing })
      : translate("Showing {showing} of {total} occurrences", {
          showing: summary.showing,
          total: summary.total,
        });

  return base;
};
