import { getBaseRRule } from "@cal/utils/rrule";
import { configureStore } from "@reduxjs/toolkit";
import { Frequency } from "rrule";
import type { BuilderConfig } from "../types";
import app from "./app.slice";
import event from "./event.slice";
import {
  normalizeByWeekday,
  normalizeRepeatEndType,
  normalizeRepeatType,
} from "./store.normalizers";

export const createEventBuilderStore = (initialState: BuilderConfig) => {
  const baseRule = getBaseRRule(initialState.event.rrule);

  const { byweekday, bysetpos } = normalizeByWeekday(baseRule?.options.byweekday);

  const preloadedState = {
    app: initialState.app,
    event: {
      start: initialState.event.start,
      end: initialState.event.end,
      until: initialState.event.until,
      timezone: initialState.event.timezone,
      allDay: initialState.event.allDay,
      repeatType: normalizeRepeatType(initialState.event.repeatType),
      repeatEndType: normalizeRepeatEndType(initialState.event.repeatEndType),
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
      app,
      event,
    },
    preloadedState,
  });
};

export type EventBuilderStore = ReturnType<typeof createEventBuilderStore>;
export type RootState = ReturnType<EventBuilderStore["getState"]>;
export type AppDispatch = EventBuilderStore["dispatch"];
