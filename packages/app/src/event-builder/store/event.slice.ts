import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Frequency, type Options, RRule } from "rrule";
import type { Event, RepeatEndType, RepeatType } from "../types";
import type { RootState } from "./store";

type EventState = Event & {
  freq?: Frequency;
  interval: number;
  count: number | null;

  byweekday?: number[];
  bymonth?: number[];
  bymonthday?: number[];
  byyearday?: number[];
};

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
};

type DaysPayload = {
  type: "byweekday" | "bymonth" | "bymonthday" | "byyearday";
  values: number[];
};

const eventBuilderSlice = createSlice({
  name: "event",
  initialState: defaultState,
  reducers: {
    setStart: (state, action: PayloadAction<number>) => {
      state.start = action.payload;
      rebuildRRule(state);
    },
    setEnd: (state, action: PayloadAction<number>) => {
      state.end = action.payload;
    },
    setUntil: (state, action: PayloadAction<number | undefined>) => {
      state.until = action.payload;
      rebuildRRule(state);
    },
    setAllDay: (state, action: PayloadAction<boolean>) => {
      state.allDay = action.payload;
    },
    setRepeatType: (state, action: PayloadAction<RepeatType>) => {
      state.repeatType = action.payload;
      rebuildRRule(state);
    },
    setRepeatEndType: (state, action: PayloadAction<RepeatEndType>) => {
      state.repeatEndType = action.payload;
      rebuildRRule(state);
    },
    setFreq: (state, action: PayloadAction<Frequency>) => {
      state.freq = action.payload;
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
      state[type] = values;
      rebuildRRule(state);
    },
  },
});

const rebuildRRule = (state: EventState) => {
  console.log(`[rrule]: building (${state.repeatType}) from state:`, { ...state });

  let options: Partial<Options> = {
    dtstart: new Date(state.start * 1000),
    interval: state.interval,
    count: state.count,
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
      options = {
        ...options,
        freq: state.freq,
        interval: state.interval,
        count: state.repeatEndType !== "AFTER" ? undefined : state.count,
        until:
          state.repeatEndType !== "ON_DATE"
            ? undefined
            : state.until
              ? new Date(state.until * 1000)
              : undefined,
        byweekday: state.byweekday,
        bymonth: state.bymonth,
        bymonthday: state.bymonthday,
        byyearday: state.byyearday,
      };
      break;
    }

    default:
      options = null;
      break;
  }

  if (options === null) {
    console.log("[rrule]: skipping rrule, not repeating");
    state.rrule = undefined;
    return;
  }

  const rrule = new RRule(options);
  state.rrule = rrule.toString();

  console.log("[rrule]: rrule built:", state.rrule, options);
};

export const { actions: eventActions } = eventBuilderSlice;
export default eventBuilderSlice.reducer;

export const eventSelectors = {
  state: (state: RootState) => state.event,
};
