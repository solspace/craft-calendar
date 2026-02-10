import { configureStore } from "@reduxjs/toolkit";
import { Frequency, rrulestr, type Weekday } from "rrule";
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
  const rrule = initialState.event.rrule ? rrulestr(initialState.event.rrule) : null;
  const { byweekday, bysetpos } = normalizeByWeekday(rrule?.options.byweekday);

  const preloadedState = {
    event: {
      ...initialState.event,
      freq: rrule?.options.freq || Frequency.DAILY,
      interval: rrule?.options.interval || 1,
      count: rrule?.options.count || null,
      byweekday,
      bymonth: rrule?.options.bymonth,
      bymonthday: rrule?.options.bymonthday,
      byyearday: rrule?.options.byyearday,
      bysetpos: rrule?.options.bysetpos ?? bysetpos,
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
