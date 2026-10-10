import type {
  CalendarCreateDraft,
  QuickCreateRepeatType,
} from "@cal/pages/calendar/calendar.create-session";
import { getRRuleSetFromString } from "@cal/utils/rrule";
import { eventActions } from "@event-builder/store/event.slice";
import { createEventBuilderStore } from "@event-builder/store/store";
import { describe, expect, it } from "vitest";
import { buildCreateEventPayload } from "./create-event.operations";
import {
  buildQuickCreateRecurrence,
  getQuickCreateUntil,
  isQuickCreateRecurrenceValid,
} from "./create-event.recurrence";

const timestamp = (date: string) => Date.parse(`${date}Z`) / 1000;
const draft = (
  type: QuickCreateRepeatType,
  start = "2026-10-09T14:30:00",
): CalendarCreateDraft => ({
  id: "draft-create-event",
  title: "Yoga",
  start: timestamp(start),
  end: timestamp(start) + 7200,
  allDay: false,
  recurrence: { type, endType: "AFTER", count: 3 },
});
const dates = (event: CalendarCreateDraft) =>
  getRRuleSetFromString(buildQuickCreateRecurrence(event)?.rrule)!
    .all()
    .map((date) => date.toISOString());

describe("quick-create repeating schedules", () => {
  it("leaves non-repeating payloads unchanged, including stale repeat end values", () => {
    expect(buildQuickCreateRecurrence(draft("NEVER"))).toBeUndefined();
    expect(
      buildQuickCreateRecurrence({ ...draft("DAILY"), recurrence: undefined }),
    ).toBeUndefined();
  });

  it.each([
    ["DAILY", ["2026-10-09T14:30:00.000Z", "2026-10-10T14:30:00.000Z", "2026-10-11T14:30:00.000Z"]],
    [
      "WEEKDAYS",
      ["2026-10-09T14:30:00.000Z", "2026-10-12T14:30:00.000Z", "2026-10-13T14:30:00.000Z"],
    ],
    [
      "WEEKLY",
      ["2026-10-09T14:30:00.000Z", "2026-10-16T14:30:00.000Z", "2026-10-23T14:30:00.000Z"],
    ],
    [
      "MONTHLY",
      ["2026-10-09T14:30:00.000Z", "2026-11-09T14:30:00.000Z", "2026-12-09T14:30:00.000Z"],
    ],
    [
      "YEARLY",
      ["2026-10-09T14:30:00.000Z", "2027-10-09T14:30:00.000Z", "2028-10-09T14:30:00.000Z"],
    ],
  ] as const)("generates the expected dates for %s, with an exact count", (type, expected) => {
    expect(dates(draft(type))).toEqual(expected);
  });

  it("includes the last day's timed occurrence and keeps floating wall times across DST", () => {
    const event = {
      ...draft("DAILY", "2026-10-31T14:30:00"),
      recurrence: { type: "DAILY", endType: "ON_DATE", until: timestamp("2026-11-02T00:00:00") },
    } satisfies CalendarCreateDraft;
    expect(dates(event)).toEqual([
      "2026-10-31T14:30:00.000Z",
      "2026-11-01T14:30:00.000Z",
      "2026-11-02T14:30:00.000Z",
    ]);
    expect(buildQuickCreateRecurrence(event)!.rrule).toContain("UNTIL=20261102T143000");
    expect(buildQuickCreateRecurrence(event)!.rrule).not.toContain("Z");
  });

  it("uses date-only recurrence and an inclusive last date for all-day events", () => {
    const event = {
      ...draft("DAILY", "2026-10-09T00:00:00"),
      allDay: true,
      end: timestamp("2026-10-11T00:00:00"),
      recurrence: { type: "DAILY", endType: "ON_DATE", until: timestamp("2026-10-12T00:00:00") },
    } satisfies CalendarCreateDraft;
    const payload = buildCreateEventPayload(event, 1, 4);
    expect(payload.rrule).toContain("DTSTART:20261009");
    expect(payload.rrule).toContain("UNTIL=20261012");
    expect(payload.end).toBe(event.end);
    expect(dates(event)).toHaveLength(4);
  });

  it("updates the weekday anchor and clamps the last date when the start moves forward", () => {
    const event = draft("WEEKLY", "2026-10-12T09:00:00");
    expect(buildQuickCreateRecurrence(event)!.rrule).toContain("BYDAY=MO");
    event.recurrence = {
      type: "WEEKLY",
      endType: "ON_DATE",
      until: timestamp("2026-10-09T00:00:00"),
    };
    expect(getQuickCreateUntil(event)).toBe(event.start);
    expect(dates(event)).toEqual(["2026-10-12T09:00:00.000Z"]);
  });

  it("uses the same month-end and leap-day semantics as the full recurrence engine", () => {
    expect(dates(draft("MONTHLY", "2026-01-31T09:00:00"))).toEqual([
      "2026-01-31T09:00:00.000Z",
      "2026-03-31T09:00:00.000Z",
      "2026-05-31T09:00:00.000Z",
    ]);
    expect(dates(draft("YEARLY", "2028-02-29T09:00:00"))).toEqual([
      "2028-02-29T09:00:00.000Z",
      "2032-02-29T09:00:00.000Z",
      "2036-02-29T09:00:00.000Z",
    ]);
  });

  it("preserves weekday rules when More details opens the full editor and a field is changed", () => {
    const event = draft("WEEKDAYS");
    const schedule = buildQuickCreateRecurrence(event)!;
    const store = createEventBuilderStore({ app: { pro: true }, event: { ...event, ...schedule } });
    store.dispatch(eventActions.setEnd(event.end + 3600));
    store.dispatch(eventActions.setCount(4));
    expect(store.getState().event.repeatType).toBe("CUSTOM");
    expect(store.getState().event.rrule).toContain("BYDAY=MO,TU,WE,TH,FR");
    expect(getRRuleSetFromString(store.getState().event.rrule)!.all()).toHaveLength(4);
  });

  it.each([
    undefined,
    0,
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
  ])("blocks invalid occurrence counts: %s", (count) => {
    const event = {
      ...draft("DAILY"),
      recurrence: { type: "DAILY", endType: "AFTER", count },
    } satisfies CalendarCreateDraft;
    expect(isQuickCreateRecurrenceValid(event)).toBe(false);
    expect(buildQuickCreateRecurrence(event)).toBeUndefined();
  });

  it("removes count and until when repeating forever", () => {
    const event = {
      ...draft("DAILY"),
      recurrence: {
        type: "DAILY",
        endType: "NEVER",
        count: 10,
        until: timestamp("2026-11-09T00:00:00"),
      },
    } satisfies CalendarCreateDraft;
    const schedule = buildQuickCreateRecurrence(event)!;
    expect(schedule.rrule).not.toMatch(/COUNT|UNTIL/);
    expect(schedule).not.toHaveProperty("until");
  });
});
