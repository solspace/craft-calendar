import { describe, expect, it } from "vitest";
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
