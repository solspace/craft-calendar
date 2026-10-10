import { describe, expect, it } from "vitest";
import type { EditedOccurrence } from "../../edited-occurrences/edited-occurrences";
import type { Event } from "../../types";
import { buildPreviewRecurrence } from "./calendar-preview.operations";
import { buildEditedPreview, coversPreviewDate } from "./edited-preview.operations";

const date = (value: string) => new Date(`${value}Z`);
const stamp = (value: string) => date(value).getTime() / 1000;
const state: Event = {
  start: stamp("2026-10-06T10:00:00"),
  end: stamp("2026-10-06T11:00:00"),
  allDay: false,
  repeatType: "WEEKLY",
  repeatEndType: "AFTER",
  rrule: "DTSTART:20261006T100000\nRRULE:FREQ=WEEKLY;COUNT=10",
};
const recurrence = buildPreviewRecurrence(state.rrule, state.start);
const edit = (
  original: string,
  moved: string,
  extra: Partial<EditedOccurrence> = {},
): EditedOccurrence => ({
  recurrenceId: original.replace("T", " "),
  start: stamp(moved),
  end: stamp(moved) + 3600,
  allDay: false,
  title: "Workshop",
  changes: ["Times", "Title"],
  cancelled: false,
  orphaned: false,
  ...extra,
});

describe("edited schedule preview", () => {
  it("replaces the original date and retains the occurrence's identity", () => {
    const rows = buildEditedPreview(
      recurrence,
      state,
      date("2026-10-01T00:00:00"),
      [edit("2026-10-13T10:00:00", "2026-10-14T18:00:00")],
      date("2026-11-01T00:00:00"),
    );
    expect(rows.map((row) => new Date(row.start * 1000).toISOString())).toEqual([
      "2026-10-06T10:00:00.000Z",
      "2026-10-14T18:00:00.000Z",
      "2026-10-20T10:00:00.000Z",
      "2026-10-27T10:00:00.000Z",
    ]);
    expect(rows[1]).toMatchObject({
      recurrenceId: "2026-10-13 10:00:00",
      edited: true,
      title: "Workshop",
    });
  });

  it("includes edits moved into the month from outside it and omits edits moved out", () => {
    const rows = buildEditedPreview(
      recurrence,
      state,
      date("2026-10-01T00:00:00"),
      [
        edit("2026-11-03T10:00:00", "2026-10-09T18:00:00"),
        edit("2026-10-13T10:00:00", "2026-11-04T18:00:00"),
      ],
      date("2026-11-01T00:00:00"),
    );
    expect(rows.filter((row) => row.edited).map((row) => row.recurrenceId)).toEqual([
      "2026-11-03 10:00:00",
    ]);
    expect(rows.some((row) => row.recurrenceId === "2026-10-13T10:00:00")).toBe(false);
  });

  it("keeps two occurrences on the same day and sorts by actual time", () => {
    const rows = buildEditedPreview(
      recurrence,
      state,
      date("2026-10-01T00:00:00"),
      [edit("2026-10-13T10:00:00", "2026-10-20T18:00:00")],
      undefined,
      3,
    );
    expect(rows.map((row) => row.start)).toEqual([
      state.start,
      stamp("2026-10-20T10:00:00"),
      stamp("2026-10-20T18:00:00"),
    ]);
    expect(new Set(rows.map((row) => row.recurrenceId)).size).toBe(3);
  });

  it("ignores orphaned edits and edits for a different time on the same date", () => {
    const rows = buildEditedPreview(
      recurrence,
      state,
      date("2026-10-01T00:00:00"),
      [
        edit("2026-10-13T10:00:00", "2026-10-14T18:00:00", { orphaned: true }),
        edit("2026-10-13T11:00:00", "2026-10-14T19:00:00"),
      ],
      undefined,
      3,
    );
    expect(rows.every((row) => !row.edited)).toBe(true);
    expect(rows[1].start).toBe(stamp("2026-10-13T10:00:00"));
  });

  it("uses the server-projected anchor after an unsaved series shift", () => {
    const shifted = {
      ...state,
      start: state.start + 86400,
      end: state.end + 86400,
      rrule: "DTSTART:20261007T100000\nRRULE:FREQ=WEEKLY;COUNT=10",
    };
    const rows = buildEditedPreview(
      buildPreviewRecurrence(shifted.rrule, shifted.start),
      shifted,
      date("2026-10-01T00:00:00"),
      [
        edit("2026-10-13T10:00:00", "2026-10-15T18:00:00", {
          scheduleRecurrenceId: "2026-10-14 10:00:00",
          cancelled: true,
        }),
      ],
      undefined,
      3,
    );
    expect(rows[1]).toMatchObject({
      recurrenceId: "2026-10-13 10:00:00",
      scheduleRecurrenceId: "2026-10-14 10:00:00",
      cancelled: true,
    });
  });

  it("highlights all covered days without extending midnight ends into another day", () => {
    const [row] = buildEditedPreview(
      recurrence,
      state,
      date("2026-10-01T00:00:00"),
      [
        edit("2026-10-06T10:00:00", "2026-10-08T00:00:00", {
          allDay: true,
          end: stamp("2026-10-10T23:59:59"),
        }),
      ],
      undefined,
      1,
    );
    expect(coversPreviewDate(row, date("2026-10-10T00:00:00"))).toBe(true);
    expect(coversPreviewDate(row, date("2026-10-11T00:00:00"))).toBe(false);
    expect(
      coversPreviewDate(
        { ...row, allDay: false, end: stamp("2026-10-10T00:00:00") },
        date("2026-10-10T00:00:00"),
      ),
    ).toBe(false);
  });
});
