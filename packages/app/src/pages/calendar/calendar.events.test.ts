import { describe, expect, it } from "vitest";
import { getRecurrenceIdFromId } from "./calendar.events";

describe("calendar events", () => {
  it("reads the recurrence ID of an occurrence", () => {
    expect(getRecurrenceIdFromId("42-20261014100000")).toBe("2026-10-14T10:00:00");
  });

  it("keeps the time of an all-day occurrence's recurrence ID", () => {
    expect(getRecurrenceIdFromId("42-20261014000000")).toBe("2026-10-14T00:00:00");
  });

  it("ignores IDs that aren't occurrence IDs", () => {
    expect(getRecurrenceIdFromId("42")).toBeNull();
    expect(getRecurrenceIdFromId("draft-create")).toBeNull();
  });
});
