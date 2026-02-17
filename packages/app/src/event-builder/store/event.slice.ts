import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addDays, getHours, setHours, startOfDay, subDays } from "date-fns";
import { Frequency } from "rrule";
import type { RepeatEndType, RepeatType } from "../types";
import {
  alignUntilForState,
  type EventState,
  normalizeDays,
  rebuildRRule,
  resetByRulesForFreq,
  toUnixSeconds,
} from "./event.slice.operations";
import type { RootState } from "./store";

const defaultState: EventState = {
  start: Date.now(),
  end: Date.now() + 60 * 60 * 1000,
  until: undefined,

  allDay: false,
  repeatType: "NEVER",
  repeatEndType: "NEVER",
  rrule: undefined,

  freq: Frequency.DAILY,
  interval: 1,
  count: 1,

  byweekday: undefined,
  bymonth: undefined,
  bymonthday: undefined,
  byyearday: undefined,
  bysetpos: undefined,
};

type DaysPayload = {
  type: "byweekday" | "bymonth" | "bymonthday" | "byyearday" | "bysetpos";
  values?: number[];
};

type ByRulesPayload = Partial<
  Pick<EventState, "byweekday" | "bymonth" | "bymonthday" | "byyearday" | "bysetpos">
>;

const eventBuilderSlice = createSlice({
  name: "event",
  initialState: defaultState,
  reducers: {
    setStart: (state, action: PayloadAction<number>) => {
      const deltaEnd = state.end - state.start;
      const deltaUntil = state.until ? state.until - state.start : undefined;

      state.start = action.payload;
      state.end = state.start + deltaEnd;

      if (state.until && state.repeatEndType === "ON_DATE") {
        state.until = alignUntilForState(state, state.until);
      }

      if (deltaUntil !== undefined) {
        state.until = state.start + deltaUntil;
      }

      rebuildRRule(state);
    },
    setEnd: (state, action: PayloadAction<number>) => {
      state.end = action.payload;
    },
    setUntil: (state, action: PayloadAction<number | undefined>) => {
      const until = action.payload;
      if (until === undefined) {
        state.until = undefined;
      } else {
        state.until = alignUntilForState(state, until);
      }

      rebuildRRule(state);
    },
    setAllDay: (state, action: PayloadAction<boolean>) => {
      const enabled = action.payload;
      state.allDay = enabled;

      const now = new Date();
      const hour = enabled ? 0 : now.getHours();

      const startDate = new Date(state.start * 1000);
      startDate.setHours(hour, 0, 0, 0);
      state.start = toUnixSeconds(startDate);

      let endDate = new Date(state.end * 1000);
      if (enabled) {
        endDate = addDays(startOfDay(endDate), 1);
      } else {
        endDate = subDays(endDate, 1);
        endDate = setHours(endDate, getHours(startDate) + 1);
      }

      state.end = toUnixSeconds(endDate);

      if (state.until && state.repeatEndType === "ON_DATE") {
        state.until = alignUntilForState(state, state.until);
      }

      rebuildRRule(state);
    },
    setRepeatType: (state, action: PayloadAction<RepeatType>) => {
      state.repeatType = action.payload;
      rebuildRRule(state);
    },
    setRepeatEndType: (state, action: PayloadAction<RepeatEndType>) => {
      const repeatEndType = action.payload;
      state.repeatEndType = repeatEndType;
      if (repeatEndType !== "AFTER") {
        state.count = null;
      }

      rebuildRRule(state);
    },
    setFreq: (state, action: PayloadAction<Frequency>) => {
      state.freq = action.payload;
      resetByRulesForFreq(state, action.payload);
      rebuildRRule(state);
    },
    setCount: (state, action: PayloadAction<number | null>) => {
      state.count = action.payload;
      rebuildRRule(state);
    },
    setInterval: (state, action: PayloadAction<number>) => {
      state.interval = Math.max(1, action.payload);
      rebuildRRule(state);
    },

    setDays: (state, action: PayloadAction<DaysPayload>) => {
      const { type, values } = action.payload;
      state[type] = normalizeDays(values);
      rebuildRRule(state);
    },
    setByRules: (state, action: PayloadAction<ByRulesPayload>) => {
      const updates = action.payload;

      if ("byweekday" in updates) {
        state.byweekday = normalizeDays(updates.byweekday);
      }

      if ("bymonth" in updates) {
        state.bymonth = normalizeDays(updates.bymonth);
      }

      if ("bymonthday" in updates) {
        state.bymonthday = normalizeDays(updates.bymonthday);
      }

      if ("byyearday" in updates) {
        state.byyearday = normalizeDays(updates.byyearday);
      }

      if ("bysetpos" in updates) {
        state.bysetpos = normalizeDays(updates.bysetpos);
      }

      rebuildRRule(state);
    },
  },
});

export const { actions: eventActions } = eventBuilderSlice;
export default eventBuilderSlice.reducer;

export const eventSelectors = {
  state: (state: RootState) => state.event,
};
