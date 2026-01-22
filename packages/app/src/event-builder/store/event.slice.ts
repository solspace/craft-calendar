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
  bysetpos?: number[];
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

const normalizeDays = (values?: number[]) => {
  if (!values || values.length === 0) {
    return undefined;
  }

  return Array.from(new Set(values));
};

const resetByRulesForFreq = (state: EventState, freq: Frequency) => {
  const startDate = new Date(state.start * 1000);
  const monthDay = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const weekday = (startDate.getDay() + 6) % 7;

  state.byweekday = undefined;
  state.bymonth = undefined;
  state.bymonthday = undefined;
  state.byyearday = undefined;
  state.bysetpos = undefined;

  switch (freq) {
    case Frequency.WEEKLY:
      state.byweekday = [weekday];
      break;

    case Frequency.MONTHLY:
      state.bymonthday = [monthDay];
      break;

    case Frequency.YEARLY:
      state.bymonth = [month];
      state.bymonthday = [monthDay];
      break;

    default:
      break;
  }
};

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
      const yearlyUsesNthWeekday =
        state.freq === Frequency.YEARLY && state.bysetpos?.length && state.byweekday?.length;
      const bysetpos = yearlyUsesNthWeekday ? undefined : state.bysetpos;
      const byweekday = yearlyUsesNthWeekday
        ? buildNthByweekday(state.byweekday, state.bysetpos?.[0])
        : state.byweekday;

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
        byweekday,
        bymonth: state.bymonth,
        bymonthday: state.bymonthday,
        byyearday: state.byyearday,
        bysetpos,
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

const weekdayMap = [
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
  RRule.SU,
];

const buildNthByweekday = (values?: number[], position?: number) => {
  if (!values?.length || !position) {
    return values;
  }

  return values
    .map((weekday) => weekdayMap[weekday]?.nth(position))
    .filter(Boolean);
};

export const { actions: eventActions } = eventBuilderSlice;
export default eventBuilderSlice.reducer;

export const eventSelectors = {
  state: (state: RootState) => state.event,
};
