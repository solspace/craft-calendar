import { localDisplayDateToUtcTimestamp } from "@cal/utils/date";
import type { EventState } from "@event-builder/store/event.slice.operations";
import { describe, expect, it } from "vitest";
import {
  buildNextRRuleForDateMutation,
  buildOccurrenceSummary,
  buildPreviewRecurrence,
  describeOccurrenceSummary,
  describeRecurrence,
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

const START = Date.UTC(2026, 8, 4, 14, 0, 0) / 1000;
const DTSTART = "DTSTART:20260904T140000Z";

const describe_ = (rule: string) =>
  describeRecurrence(buildPreviewRecurrence(`${DTSTART}\n${rule}`, START));

describe("describeRecurrence", () => {
  it("describes a weekly rule with a count", () => {
    expect(describe_("RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE,FR;COUNT=10")).toBe(
      "Every 2 weeks on Wednesday and Friday, ending after 10 occurrences.",
    );
  });

  it("describes a daily rule with no end", () => {
    expect(describe_("RRULE:FREQ=DAILY")).toBe("Every day.");
  });

  it("describes the nth weekday of a month", () => {
    expect(describe_("RRULE:FREQ=MONTHLY;BYDAY=FR;BYSETPOS=-1")).toBe(
      "Every month on the last Friday.",
    );
  });

  it("describes a yearly rule with a month and day", () => {
    expect(describe_("RRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=14;COUNT=1")).toBe(
      "Every year in March on day 14, ending after 1 occurrence.",
    );
  });

  it("returns nothing for a non-repeating event", () => {
    expect(describeRecurrence(buildPreviewRecurrence(undefined, START))).toBeNull();
  });
});

describe("occurrence summary", () => {
  it("counts excluded dates against the total", () => {
    const recurrence = buildPreviewRecurrence(
      `${DTSTART}\nRRULE:FREQ=DAILY;COUNT=10\nEXDATE:20260905T140000Z,20260906T140000Z`,
      START,
    );
    const summary = buildOccurrenceSummary(recurrence, 5);

    expect(summary).toEqual({ showing: 5, total: 8, excluded: 2 });
    expect(describeOccurrenceSummary(summary!)).toBe("Showing 5 of 8 occurrences - 2 excluded");
  });

  it("omits the total for open-ended rules", () => {
    const recurrence = buildPreviewRecurrence(`${DTSTART}\nRRULE:FREQ=DAILY`, START);

    expect(describeOccurrenceSummary(buildOccurrenceSummary(recurrence, 8)!)).toBe(
      "Showing 8 occurrences",
    );
  });
});
