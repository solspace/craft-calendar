import { describe, expect, it } from "vitest";
import { getRecurrenceIdFromId } from "./calendar.events";

describe("calendar events", () => {
  it("reads the recurrence ID of a timed occurrence", () => {
    expect(getRecurrenceIdFromId("42-20261014100000", false)).toBe("2026-10-14T10:00:00");
  });

  it("reads the recurrence ID of an all-day occurrence as a date", () => {
    expect(getRecurrenceIdFromId("42-20261014000000", true)).toBe("2026-10-14");
  });

  it("ignores IDs that aren't occurrence IDs", () => {
    expect(getRecurrenceIdFromId("42", false)).toBeNull();
    expect(getRecurrenceIdFromId("draft-create", false)).toBeNull();
  });
});
