import { configureStore } from "@reduxjs/toolkit";
import type { BuilderConfig } from "../types";
import app from "./app.slice";
import event from "./event.slice";
import { buildEventStateFromSchedule } from "./event.slice.operations";

export const createEventBuilderStore = (initialState: BuilderConfig) => {
  const preloadedState = {
    app: initialState.app,
    event: buildEventStateFromSchedule(initialState.event),
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
