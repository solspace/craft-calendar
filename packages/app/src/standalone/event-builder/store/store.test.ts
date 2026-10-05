import { utcDateKey } from "@cal/utils/date";
import { getRRuleSetFromString } from "@cal/utils/rrule";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildNextRRuleForDateMutation,
  buildPreviewRecurrence,
  getOccurrenceStatus,
} from "../editor/calendar-preview/calendar-preview.operations";
import type { BuilderConfig, RepeatEndType, RepeatType } from "../types";
import { eventActions } from "./event.slice";
import { createEventBuilderStore } from "./store";

const baseConfig = (): BuilderConfig => ({
  app: {
    pro: false,
  },
  event: {
    start: 1_788_800_400,
    end: 1_788_804_000,
    allDay: false,
    repeatType: "NEVER",
    repeatEndType: "NEVER",
  },
});

describe("all-day fixed date conversion", () => {
  afterEach(() => vi.useRealTimers());

  const toggleAllDay = (store: ReturnType<typeof createEventBuilderStore>) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-05T15:00:00Z"));
    store.dispatch(eventActions.setAllDay({ enabled: true, eventDuration: 60 }));
    store.dispatch(eventActions.setAllDay({ enabled: false, eventDuration: 60 }));
  };

  it("keeps additions and exclusions working after timed → all-day → timed", () => {
    const start = Date.UTC(2026, 8, 16, 14, 30, 45) / 1000;
    const store = createEventBuilderStore({
      app: { pro: true },
      event: {
        start,
        end: start + 3600,
        allDay: false,
        repeatType: "CUSTOM",
        repeatEndType: "AFTER",
        rrule: [
          "DTSTART:20260916T143045",
          "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE,FR;COUNT=20",
          "RDATE:20261013T143045,20261019T143045",
          "EXDATE:20261014T143045",
        ].join("\n"),
      },
    });

    toggleAllDay(store);

    const state = store.getState().event;
    const preview = buildPreviewRecurrence(state.rrule, state.start);
    const excludedDate = new Date(Date.UTC(2026, 9, 14));
    const additionalDate = new Date(Date.UTC(2026, 9, 13));
    const recurrence = getRRuleSetFromString(state.rrule)!;

    expect(getOccurrenceStatus(preview, excludedDate).excluded).toBe(true);
    expect(getOccurrenceStatus(preview, additionalDate).full).toBe(true);
    expect(recurrence.rdates().map(utcDateKey)).toEqual(["2026-10-13", "2026-10-19"]);
    expect(recurrence.exdates().map(utcDateKey)).toEqual(["2026-10-14"]);
    expect(
      [...recurrence.rdates(), ...recurrence.exdates()].map((date) => date.getUTCHours()),
    ).toEqual([15, 15, 15]);

    store.dispatch(
      eventActions.setRRule(
        buildNextRRuleForDateMutation(state, preview, "rdate", +additionalDate / 1000, false),
      ),
    );
    const afterRemoval = store.getState().event;
    const updated = buildPreviewRecurrence(afterRemoval.rrule, afterRemoval.start);
    expect(getOccurrenceStatus(updated, additionalDate).full).toBe(false);
    expect(updated.addedDateSet.size).toBe(1);

    store.dispatch(
      eventActions.setRRule(
        buildNextRRuleForDateMutation(afterRemoval, updated, "exdate", +excludedDate / 1000, false),
      ),
    );
    const afterRestore = store.getState().event;
    expect(
      getOccurrenceStatus(
        buildPreviewRecurrence(afterRestore.rrule, afterRestore.start),
        excludedDate,
      ).full,
    ).toBe(true);
    expect(getRRuleSetFromString(afterRestore.rrule)!.exdates()).toEqual([]);
  });

  it("preserves a non-repeating event's additional dates without duplicating its start", () => {
    const start = Date.UTC(2026, 8, 16, 14, 30, 45) / 1000;
    const store = createEventBuilderStore({
      app: { pro: true },
      event: {
        start,
        end: start + 3600,
        allDay: false,
        repeatType: "NEVER",
        repeatEndType: "NEVER",
        rrule: "DTSTART:20260916T143045\nRDATE:20260916T143045,20261013T143045",
      },
    });

    toggleAllDay(store);

    const state = store.getState().event;
    const recurrence = getRRuleSetFromString(state.rrule)!;
    expect(recurrence.rdates().map(utcDateKey)).toEqual(["2026-09-16", "2026-10-13"]);
    expect(recurrence.rdates().map((date) => date.getUTCHours())).toEqual([15, 15]);

    const next = buildNextRRuleForDateMutation(
      state,
      buildPreviewRecurrence(state.rrule, state.start),
      "rdate",
      Date.UTC(2026, 9, 13) / 1000,
      false,
    );
    expect(next).toBeUndefined();
  });
});

describe("createEventBuilderStore", () => {
  it("normalizes empty repeat settings to never", () => {
    const config = baseConfig();
    config.event.repeatType = null as unknown as RepeatType;
    config.event.repeatEndType = "" as RepeatEndType;

    const store = createEventBuilderStore(config);

    expect(store.getState().event.repeatType).toBe("NEVER");
    expect(store.getState().event.repeatEndType).toBe("NEVER");
  });

  it("normalizes invalid repeat counts to one", () => {
    const store = createEventBuilderStore(baseConfig());

    store.dispatch(eventActions.setRepeatEndType("AFTER"));
    expect(store.getState().event.count).toBe(1);

    store.dispatch(eventActions.setCount(0));
    expect(store.getState().event.count).toBe(1);

    store.dispatch(eventActions.setCount(Number.NaN));
    expect(store.getState().event.count).toBe(1);
  });

  it("removes custom occurrences when enabling a repeat rule", () => {
    const config = baseConfig();
    config.event.rrule = ["DTSTART:20260906T070000", "RDATE:20260913T070000,20260914T070000"].join(
      "\n",
    );
    const store = createEventBuilderStore(config);

    store.dispatch(eventActions.setRepeatType("DAILY"));

    expect(store.getState().event.rrule).toContain("RRULE:FREQ=DAILY");
    expect(store.getState().event.rrule).not.toContain("RDATE");
  });
});
