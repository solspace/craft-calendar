import {
  localDisplayDateToUtcTimestamp,
  utcDateKey,
  utcTimestampToLocalDisplayDate,
  utcToLocalDisplayDate,
} from "@cal/utils/date";
import { getBaseRRule, getRRuleSetFromString } from "@cal/utils/rrule";
import {
  buildOccurrenceDateForState,
  buildRRuleString,
  type EventState,
} from "@event-builder/store/event.slice.operations";
import { addYears, format, startOfDay } from "date-fns";
import type { RRule, RRuleSet } from "rrule";

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

  const addedDateSet = new Set(
    (recurrenceSet?.rdates() ?? [])
      .map(toOccurrenceTimestamp)
      .filter((timestamp) => (baseRule ? true : timestamp !== startTimestamp)),
  );

  return {
    startTimestamp,
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
  const occurrenceDate = buildOccurrenceDateForState(state, timestamp);
  const occurrenceTime = occurrenceDate.getTime();

  const next = mutateFixedDates(previewRecurrence, ({ baseRule, rdates, exdates }) => ({
    baseRule,
    rdates: buildNextFixedDateList(rdates, occurrenceDate, occurrenceTime, type === "rdate", add),
    exdates: buildNextFixedDateList(
      exdates,
      occurrenceDate,
      occurrenceTime,
      type === "exdate",
      add,
    ),
  }));

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

  return dates.filter((date) => date.getTime() !== occurrenceTime);
};

const getMutableRDates = (previewRecurrence: PreviewRecurrence): Date[] => {
  const rdates = previewRecurrence.recurrenceSet?.rdates() ?? [];

  if (previewRecurrence.baseRule) {
    return rdates;
  }

  return rdates.filter((date) => toOccurrenceTimestamp(date) !== previewRecurrence.startTimestamp);
};
