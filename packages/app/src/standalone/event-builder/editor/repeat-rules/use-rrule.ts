import {
  localDisplayDateToUtcTimestamp,
  UTCify,
  UTCifyDateOnly,
  utcTimestampToLocalDisplayDate,
  utcToLocalDisplayDate,
} from "@cal/utils/date";
import { getBaseRRule, getRRuleSetFromString } from "@cal/utils/rrule";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import {
  buildOccurrenceDateForState,
  buildRRuleString,
  removeMatchingDate,
} from "@event-builder/store/event.slice.operations";
import type { AppDispatch } from "@event-builder/store/store";
import { endOfDay, startOfDay } from "date-fns";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { FixedDateMutationInput, OccurrenceStatus } from "./repeat-rules.types";

export const useRRuleUpdates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector(eventSelectors.state);
  const { start, rrule } = state;

  const startTimestamp = useMemo(
    () => localDisplayDateToUtcTimestamp(startOfDay(utcTimestampToLocalDisplayDate(start))),
    [start],
  );

  const baseRule = useMemo(() => getBaseRRule(rrule) ?? null, [rrule]);
  const recurrenceSet = useMemo(() => getRRuleSetFromString(rrule), [rrule]);

  const addedDates = useMemo(() => {
    if (!recurrenceSet) {
      return [];
    }

    return Array.from(
      new Set(
        recurrenceSet
          .rdates()
          .map((date) => localDisplayDateToUtcTimestamp(startOfDay(utcToLocalDisplayDate(date))))
          .filter((timestamp) => (baseRule ? true : timestamp !== startTimestamp)),
      ),
    ).sort((left, right) => left - right);
  }, [baseRule, recurrenceSet, startTimestamp]);

  const excludedDates = useMemo(() => {
    if (!recurrenceSet) {
      return [];
    }

    return Array.from(
      new Set(
        recurrenceSet
          .exdates()
          .map((date) => localDisplayDateToUtcTimestamp(startOfDay(utcToLocalDisplayDate(date)))),
      ),
    ).sort((left, right) => left - right);
  }, [recurrenceSet]);

  const addedDateSet = useMemo(() => new Set(addedDates), [addedDates]);
  const excludedDateSet = useMemo(() => new Set(excludedDates), [excludedDates]);

  const getStatus = useCallback(
    (date: Date): OccurrenceStatus => {
      const rangeStart = UTCifyDateOnly(startOfDay(date));
      const rangeEnd = UTCify(endOfDay(date));

      const base = baseRule ? baseRule.between(rangeStart, rangeEnd, true).length > 0 : false;
      const full = recurrenceSet
        ? recurrenceSet.between(rangeStart, rangeEnd, true).length > 0
        : localDisplayDateToUtcTimestamp(startOfDay(date)) === startTimestamp;

      return {
        full,
        base,
        excluded: base && !full,
      };
    },
    [baseRule, recurrenceSet, startTimestamp],
  );

  const updateFixedDates = (mutate: (input: FixedDateMutationInput) => FixedDateMutationInput) => {
    const next = mutate({
      baseRule,
      rdates:
        recurrenceSet?.rdates().filter((date) => {
          if (baseRule) {
            return true;
          }

          return (
            localDisplayDateToUtcTimestamp(startOfDay(utcToLocalDisplayDate(date))) !==
            startTimestamp
          );
        }) ?? [],
      exdates: recurrenceSet?.exdates() ?? [],
    });

    dispatch(
      eventActions.setRRule(
        buildRRuleString(state, next.baseRule, dedupeDates(next.rdates), dedupeDates(next.exdates)),
      ),
    );
  };

  const addFixedDate = (type: "rdate" | "exdate", value: number) => {
    const occurrenceDate = buildOccurrenceDateForState(state, value);

    updateFixedDates(({ baseRule: nextBaseRule, rdates, exdates }) => ({
      baseRule: nextBaseRule,
      rdates:
        type === "rdate"
          ? [...rdates, occurrenceDate]
          : removeMatchingDate(rdates, occurrenceDate.getTime()),
      exdates: type === "exdate" ? [...exdates, occurrenceDate] : exdates,
    }));
  };

  const removeFixedDate = (type: "rdate" | "exdate", value: number) => {
    const occurrenceDate = buildOccurrenceDateForState(state, value);
    const occurrenceTime = occurrenceDate.getTime();

    updateFixedDates(({ baseRule: nextBaseRule, rdates, exdates }) => ({
      baseRule: nextBaseRule,
      rdates: type === "rdate" ? removeMatchingDate(rdates, occurrenceTime) : rdates,
      exdates: type === "exdate" ? removeMatchingDate(exdates, occurrenceTime) : exdates,
    }));
  };

  const canAddOccurrence = useCallback(
    (date: Date) => {
      const timestamp = localDisplayDateToUtcTimestamp(startOfDay(date));
      const status = getStatus(date);

      return !status.full && !status.excluded && !addedDateSet.has(timestamp);
    },
    [addedDateSet, getStatus],
  );

  const canExcludeOccurrence = useCallback(
    (date: Date) => {
      const timestamp = localDisplayDateToUtcTimestamp(startOfDay(date));
      const status = getStatus(date);

      return status.base && !status.excluded && !excludedDateSet.has(timestamp);
    },
    [excludedDateSet, getStatus],
  );

  return {
    addedDates,
    excludedDates,
    addFixedDate,
    removeFixedDate,
    canAddOccurrence,
    canExcludeOccurrence,
    getStatus,
  };
};

const dedupeDates = (dates: Date[]): Date[] => {
  const uniqueDates = new Map(dates.map((date) => [date.getTime(), date])).values();

  return Array.from(uniqueDates).sort((left, right) => left.getTime() - right.getTime());
};
