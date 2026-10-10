import { localDisplayDateToUtcTimestamp } from "@cal/utils/date";
import type { EventState } from "@event-builder/store/event.slice.operations";
import { describe, expect, it } from "vitest";
import {
  buildNextRRuleForDateMutation,
  buildOccurrenceSummary,
  buildPreviewRecurrence,
  buildUpcomingOccurrences,
  describeOccurrenceSummary,
  describeRecurrence,
  getOccurrenceRecurrenceId,
  getOccurrenceRemovalType,
  getOccurrenceStatus,
} from "./calendar-preview.operations";

describe("calendar preview operations", () => {
  it("uses the scheduled time rather than the date-list midnight when editing", () => {
    const preview = buildPreviewRecurrence(
      "DTSTART:20260904T143025\nRRULE:FREQ=DAILY;COUNT=2\nRDATE:20260910T170000",
      Date.UTC(2026, 8, 4, 14, 30, 25) / 1000,
    );

    expect(getOccurrenceRecurrenceId(preview, new Date(Date.UTC(2026, 8, 5)))).toBe(
      "2026-09-05T14:30:25",
    );
    expect(getOccurrenceRecurrenceId(preview, new Date(Date.UTC(2026, 8, 10)))).toBe(
      "2026-09-10T17:00:00",
    );
    expect(getOccurrenceRecurrenceId(preview, new Date(Date.UTC(2026, 8, 6)))).toBeNull();
  });

  it("uses midnight for an all-day occurrence and skips excluded dates", () => {
    const preview = buildPreviewRecurrence(
      "DTSTART:20260904\nRRULE:FREQ=DAILY;COUNT=3\nEXDATE;VALUE=DATE:20260905",
      Date.UTC(2026, 8, 4) / 1000,
    );

    expect(getOccurrenceRecurrenceId(preview, new Date(Date.UTC(2026, 8, 4)))).toBe(
      "2026-09-04T00:00:00",
    );
    expect(getOccurrenceRecurrenceId(preview, new Date(Date.UTC(2026, 8, 5)))).toBeNull();
  });

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

describe("preview occurrence removal", () => {
  const stateFor = (rrule: string, allDay = false): EventState => ({
    start: START,
    end: START + 3600,
    allDay,
    repeatType: "CUSTOM",
    repeatEndType: "NEVER",
    interval: 1,
    rrule,
  });

  it("excludes a generated occurrence without changing the recurring pattern", () => {
    const rrule = `${DTSTART}\nRRULE:FREQ=DAILY;COUNT=3`;
    const preview = buildPreviewRecurrence(rrule, START);
    const date = new Date(Date.UTC(2026, 8, 5));

    expect(getOccurrenceRemovalType(preview, date)).toBe("exdate");
    const next = buildNextRRuleForDateMutation(
      stateFor(rrule),
      preview,
      "exdate",
      +date / 1000,
      true,
    );
    const updated = buildPreviewRecurrence(next, START);

    expect(getOccurrenceStatus(updated, date).excluded).toBe(true);
    expect(updated.baseRule?.options.count).toBe(3);
    expect(buildOccurrenceSummary(updated, 2)).toEqual({ showing: 2, total: 2, excluded: 1 });
  });

  it("removes an additional date without adding an exclusion", () => {
    const rrule = `${DTSTART}\nRRULE:FREQ=DAILY;COUNT=3\nRDATE:20260910T140000Z`;
    const preview = buildPreviewRecurrence(rrule, START);
    const date = new Date(Date.UTC(2026, 8, 10));

    expect(getOccurrenceRemovalType(preview, date)).toBe("rdate");
    const next = buildNextRRuleForDateMutation(
      stateFor(rrule),
      preview,
      "rdate",
      +date / 1000,
      false,
    );
    const updated = buildPreviewRecurrence(next, START);

    expect(getOccurrenceStatus(updated, date).full).toBe(false);
    expect(next).not.toContain("EXDATE");
    expect(updated.addedDateSet.size).toBe(0);
    expect(buildOccurrenceSummary(updated, 3)).toEqual({ showing: 3, total: 3, excluded: 0 });
  });

  it("only removes the additional entry when its date also matches the recurring pattern", () => {
    const rrule = `${DTSTART}\nRRULE:FREQ=DAILY;COUNT=3\nRDATE:20260905T140000Z`;
    const preview = buildPreviewRecurrence(rrule, START);
    const date = new Date(Date.UTC(2026, 8, 5));

    expect(getOccurrenceRemovalType(preview, date)).toBe("rdate");
    const next = buildNextRRuleForDateMutation(
      stateFor(rrule),
      preview,
      "rdate",
      +date / 1000,
      false,
    );
    const updated = buildPreviewRecurrence(next, START);

    expect(getOccurrenceStatus(updated, date).full).toBe(true);
    expect(getOccurrenceStatus(updated, date).rdate).toBe(false);
    expect(next).not.toContain("EXDATE");
  });

  it("protects the first occurrence in both removal controls and direct mutations", () => {
    const rrule = `${DTSTART}\nRRULE:FREQ=DAILY;COUNT=3\nRDATE:20260904T140000Z`;
    const preview = buildPreviewRecurrence(rrule, START);
    const date = new Date(Date.UTC(2026, 8, 4));

    expect(getOccurrenceRemovalType(preview, date)).toBeNull();
    expect(buildNextRRuleForDateMutation(stateFor(rrule), preview, "exdate", START, true)).toBe(
      rrule,
    );
    expect(
      buildNextRRuleForDateMutation(stateFor(rrule), preview, "rdate", +date / 1000, false),
    ).toBe(rrule);
  });

  it("protects the first generated occurrence when the pattern does not match the start date", () => {
    const rrule = `${DTSTART}\nRRULE:FREQ=WEEKLY;BYDAY=MO;COUNT=3`;
    const preview = buildPreviewRecurrence(rrule, START);
    const date = new Date(Date.UTC(2026, 8, 7));

    expect(getOccurrenceRemovalType(preview, date)).toBeNull();
    expect(
      buildNextRRuleForDateMutation(stateFor(rrule), preview, "exdate", +date / 1000, true),
    ).toBe(rrule);
    expect(getOccurrenceRemovalType(preview, new Date(Date.UTC(2026, 8, 14)))).toBe("exdate");
  });

  it("allows excluding the first visible date after navigating to a later month", () => {
    const preview = buildPreviewRecurrence(`${DTSTART}\nRRULE:FREQ=WEEKLY;BYDAY=FR`, START);
    const [timestamp] = buildUpcomingOccurrences(preview, new Date(Date.UTC(2026, 9, 1)), 8);

    expect(timestamp).toBe(Date.UTC(2026, 9, 2) / 1000);
    expect(getOccurrenceRemovalType(preview, new Date(timestamp * 1000))).toBe("exdate");
  });

  it("removes additional dates from an all-day non-repeating event while preserving its start", () => {
    const start = Date.UTC(2026, 8, 4) / 1000;
    const rrule = "DTSTART:20260904\nRDATE;VALUE=DATE:20260904,20260910";
    const preview = buildPreviewRecurrence(rrule, start);
    const date = new Date(Date.UTC(2026, 8, 10));
    const state = { ...stateFor(rrule, true), start, repeatType: "NEVER" as const };

    expect(getOccurrenceRemovalType(preview, new Date(start * 1000))).toBeNull();
    expect(getOccurrenceRemovalType(preview, date)).toBe("rdate");
    const next = buildNextRRuleForDateMutation(state, preview, "rdate", +date / 1000, false);
    const updated = buildPreviewRecurrence(next, start);

    expect(getOccurrenceStatus(updated, date).full).toBe(false);
    expect(getOccurrenceStatus(updated, new Date(start * 1000)).full).toBe(true);
    expect(next).toBeUndefined();
  });
});

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
    expect(describeOccurrenceSummary(summary!)).toBe("Showing 5 of 8 occurrences");
  });

  it("omits the total for open-ended rules", () => {
    const recurrence = buildPreviewRecurrence(`${DTSTART}\nRRULE:FREQ=DAILY`, START);

    expect(describeOccurrenceSummary(buildOccurrenceSummary(recurrence, 8)!)).toBe(
      "Showing 8 occurrences",
    );
  });
});
