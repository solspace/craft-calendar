import { describe, expect, it } from "vitest";
import type { BuilderConfig, RepeatEndType, RepeatType } from "../types";
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
});
