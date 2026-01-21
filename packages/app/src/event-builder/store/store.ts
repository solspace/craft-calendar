import { configureStore } from "@reduxjs/toolkit";
import { Frequency, rrulestr } from "rrule";
import type { BuilderConfig } from "../types";
import event from "./event.slice";

export const createEventBuilderStore = (initialState: BuilderConfig) => {
  const rrule = initialState.event.rrule ? rrulestr(initialState.event.rrule) : null;

  const preloadedState = {
    event: {
      ...initialState.event,
      freq: rrule?.options.freq || Frequency.DAILY,
      interval: rrule?.options.interval || 1,
      count: rrule?.options.count || null,
      byweekday: rrule?.options.byweekday,
      bymonth: rrule?.options.bymonth,
      bymonthday: rrule?.options.bymonthday,
      byyearday: rrule?.options.byyearday,
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
