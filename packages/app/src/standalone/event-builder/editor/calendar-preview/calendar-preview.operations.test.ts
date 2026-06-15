import { localDisplayDateToUtcTimestamp } from "@cal/utils/date";
import { describe, expect, it } from "vitest";
import { buildPreviewRecurrence, getOccurrenceStatus } from "./calendar-preview.operations";

describe("calendar preview operations", () => {
  it("matches FullCalendar UTC day cells to excluded dates", () => {
    const rrule = [
      "DTSTART:20260601T100000",
      "RRULE:FREQ=DAILY;COUNT=14",
      "EXDATE:20260613T100000",
    ].join("\n");
    const start = localDisplayDateToUtcTimestamp(new Date(2026, 5, 1, 10));
    const preview = buildPreviewRecurrence(rrule, start);

    expect(getOccurrenceStatus(preview, new Date(Date.UTC(2026, 5, 13))).excluded).toBe(true);
    expect(getOccurrenceStatus(preview, new Date(Date.UTC(2026, 5, 14))).excluded).toBe(false);
  });
});
