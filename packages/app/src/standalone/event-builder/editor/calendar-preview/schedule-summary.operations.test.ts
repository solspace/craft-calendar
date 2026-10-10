import { describe, expect, it } from "vitest";
import type { EditedOccurrence } from "../../edited-occurrences/edited-occurrences";
import { buildPreviewRecurrence } from "./calendar-preview.operations";
import { describeScheduleChanges, describeSeriesRange } from "./schedule-summary.operations";

const start = Date.UTC(2026, 9, 6, 10) / 1000;
const recurrence = (lines = "RRULE:FREQ=WEEKLY;COUNT=4") =>
  buildPreviewRecurrence(`DTSTART:20261006T100000\n${lines}`, start);
const occurrence = (cancelled = false, orphaned = false): EditedOccurrence => ({
  recurrenceId: "2026-10-13 10:00:00",
  start: start + 604800,
  end: start + 608400,
  allDay: false,
  title: null,
  changes: [],
  cancelled,
  orphaned,
});

describe("schedule changes", () => {
  it("does not add empty counts to an unchanged schedule", () => {
    expect(describeScheduleChanges(recurrence())).toEqual([]);
    expect(describeScheduleChanges(buildPreviewRecurrence(undefined, start))).toEqual([]);
  });

  it("counts whole-schedule additions and exclusions, ignoring dates outside the pattern", () => {
    const preview = recurrence(
      "RRULE:FREQ=WEEKLY;COUNT=4\nRDATE:20261007T100000,20261013T100000\nEXDATE:20261020T100000,20261021T100000",
    );
    expect(describeScheduleChanges(preview)).toEqual(["1 additional date", "1 excluded date"]);
  });

  it("does not count an excluded additional date or the original standalone date as an addition", () => {
    const preview = recurrence(
      "RDATE:20261006T100000,20261007T100000,20261008T100000\nEXDATE:20261007T100000",
    );
    expect(describeScheduleChanges(preview)).toEqual(["1 additional date"]);
  });

  it("keeps edited, cancelled, and off-schedule records separate", () => {
    expect(
      describeScheduleChanges(recurrence(), [
        occurrence(),
        occurrence(),
        occurrence(true),
        occurrence(false, true),
        occurrence(true, true),
      ]),
    ).toEqual(["2 edited occurrences", "1 cancelled occurrence", "2 edits off schedule"]);
  });

  it("handles all-day additions and exclusions without changing their dates", () => {
    const preview = buildPreviewRecurrence(
      "DTSTART:20261006\nRRULE:FREQ=DAILY;COUNT=2\nRDATE;VALUE=DATE:20261009,20261010\nEXDATE;VALUE=DATE:20261007",
      Date.UTC(2026, 9, 6) / 1000,
    );
    expect(describeScheduleChanges(preview)).toEqual(["2 additional dates", "1 excluded date"]);
  });

  it("counts exclusions on an endless series without enumerating the series", () => {
    expect(
      describeScheduleChanges(recurrence("RRULE:FREQ=WEEKLY\nEXDATE:20301008T100000")),
    ).toEqual(["1 excluded date"]);
  });
});

describe("series range summary", () => {
  const context = { eventId: 12, siteId: 1 };
  const later = { url: "/events/13", start: Date.UTC(2026, 10, 3, 10) / 1000 };
  const earlier = { url: "/events/11", start: start - 604800 };

  it("omits an unsplit series", () => {
    expect(describeSeriesRange(context, start, false)).toBeNull();
  });

  it("describes the exclusive boundary of a split part", () => {
    expect(
      describeSeriesRange({ ...context, series: { earlier, later } }, start, true, "yyyy-MM-dd"),
    ).toBe("This part of the series starts on 2026-10-06 and ends before 2026-11-03.");
  });

  it("includes the time for timed splits using Craft's format", () => {
    expect(
      describeSeriesRange(
        { ...context, series: { earlier, later: null } },
        start,
        false,
        "yyyy-MM-dd",
        "yyyy-MM-dd HH:mm",
      ),
    ).toBe("This part of the series starts on 2026-10-06 10:00.");
  });

  it("uses the proposed split boundary when editing this and following", () => {
    expect(
      describeSeriesRange(
        { ...context, splitAt: later.start, series: { earlier, later } },
        start,
        true,
        "yyyy-MM-dd",
      ),
    ).toBe("This draft changes the series from 2026-11-03 onward.");
  });
});
