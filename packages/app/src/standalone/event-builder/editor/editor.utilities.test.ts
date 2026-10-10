import { localDisplayDateToUtcTimestamp } from "@cal/utils/date";
import { describe, expect, it } from "vitest";
import { isEndTimeAllowed, normalizeEndTimestamp } from "./editor.utilities";

describe("editor utilities", () => {
  it("normalizes same-day timed end date picks to the minimum time interval after start", () => {
    const start = localDisplayDateToUtcTimestamp(new Date(2026, 6, 1, 23, 30));
    const pickedEnd = localDisplayDateToUtcTimestamp(new Date(2026, 6, 1));
    const expectedEnd = localDisplayDateToUtcTimestamp(new Date(2026, 6, 1, 23, 45));

    expect(
      normalizeEndTimestamp({
        value: pickedEnd,
        start,
        allDay: false,
        timeInterval: 15,
      }),
    ).toBe(expectedEnd);
  });

  it("allows end times at or after the minimum time interval", () => {
    const start = localDisplayDateToUtcTimestamp(new Date(2026, 6, 1, 23, 30));

    expect(isEndTimeAllowed(new Date(2026, 6, 1, 23, 30), start, 15)).toBe(false);
    expect(isEndTimeAllowed(new Date(2026, 6, 1, 23, 45), start, 15)).toBe(true);
    expect(isEndTimeAllowed(new Date(2026, 6, 2, 0, 0), start, 15)).toBe(true);
  });
});
