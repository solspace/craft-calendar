import { localDisplayDateToUtcTimestamp } from "@cal/utils/date";
import type { EventState } from "@event-builder/store/event.slice.operations";
import { describe, expect, it } from "vitest";
import {
  buildNextRRuleForDateMutation,
  buildPreviewRecurrence,
  getOccurrenceStatus,
} from "./calendar-preview.operations";

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

  it("removes a custom occurrence when excluding the same date", () => {
    const start = localDisplayDateToUtcTimestamp(new Date(2026, 6, 1, 7));
    const rrule = ["DTSTART:20260701T070000", "RRULE:FREQ=DAILY", "RDATE:20260714T070000"].join(
      "\n",
    );
    const state: EventState = {
      start,
      end: start + 60 * 60,
      allDay: false,
      repeatType: "CUSTOM",
      repeatEndType: "NEVER",
      rrule,
      interval: 1,
    };
    const preview = buildPreviewRecurrence(rrule, start);
    const occurrence = localDisplayDateToUtcTimestamp(new Date(2026, 6, 14));

    const nextRRule = buildNextRRuleForDateMutation(state, preview, "exdate", occurrence, true);

    expect(nextRRule).toContain("EXDATE:20260714T070000");
    expect(nextRRule).not.toContain("RDATE");
  });
});
