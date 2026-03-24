import { getBaseRRule } from "@cal/utils/rrule";
import { configureStore } from "@reduxjs/toolkit";
import { Frequency, type Weekday } from "rrule";
import type { BuilderConfig } from "../types";
import event from "./event.slice";

type WeekdayNormalization = {
  byweekday?: number[];
  bysetpos?: number[];
};

const normalizeByWeekday = (value?: Weekday | number | Array<Weekday | number>) => {
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
  } as WeekdayNormalization;
};

export const createEventBuilderStore = (initialState: BuilderConfig) => {
  const baseRule = getBaseRRule(initialState.event.rrule);

  const { byweekday, bysetpos } = normalizeByWeekday(baseRule?.options.byweekday);

  const preloadedState = {
    event: {
      start: initialState.event.start,
      end: initialState.event.end,
      until: initialState.event.until,
      timezone: initialState.event.timezone,
      allDay: initialState.event.allDay,
      repeatType: initialState.event.repeatType,
      repeatEndType: initialState.event.repeatEndType,
      rrule: initialState.event.rrule,
      freq: baseRule?.options.freq || Frequency.DAILY,
      interval: baseRule?.options.interval || 1,
      count: baseRule?.options.count || null,
      byweekday,
      bymonth: baseRule?.options.bymonth,
      bymonthday: baseRule?.options.bymonthday,
      byyearday: baseRule?.options.byyearday,
      bysetpos: baseRule?.options.bysetpos ?? bysetpos,
    },
  };

  return configureStore({
    reducer: {
      event,
    },
    preloadedState,
  });
};

export type EventBuilderStore = ReturnType<typeof createEventBuilderStore>;
export type RootState = ReturnType<EventBuilderStore["getState"]>;
export type AppDispatch = EventBuilderStore["dispatch"];
