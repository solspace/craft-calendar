import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildCreateDraftEventInput,
  buildCreateDraftFromSelection,
  getCreateDraftDisplayEnd,
  setCreateDraftAllDay,
  setCreateDraftEnd,
  setCreateDraftStart,
} from "./calendar.create-session";

const settings = {
  allDayDefault: false,
  eventDuration: 60,
};

describe("calendar create session", () => {
  afterEach(() => vi.useRealTimers());

  it("uses the default duration for a single-day timed selection", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2024-01-20T09:00:00Z"),
        end: new Date("2024-01-20T11:00:00Z"),
        allDay: false,
      },
      settings,
    );

    expect(draft).toMatchObject({
      allDay: false,
      start: 1705741200,
      end: 1705744800,
    });
  });

  it.each([
    false,
    true,
  ])("starts a single date cell as timed, even with all-day default %s", (allDayDefault) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 8, 13, 47, 31));
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2026-10-06T00:00:00Z"),
        end: new Date("2026-10-07T00:00:00Z"),
        allDay: true,
      },
      { allDayDefault, eventDuration: 90 },
    );

    expect(draft.allDay).toBe(false);
    expect(new Date(draft.start * 1000).toISOString()).toBe("2026-10-06T13:00:00.000Z");
    expect(new Date(draft.end * 1000).toISOString()).toBe("2026-10-06T14:30:00.000Z");
    expect(draft.end - draft.start).toBe(90 * 60);
    const moved = setCreateDraftStart(draft, draft.start + 14 * 60 * 60, { eventDuration: 90 });
    expect(moved.end - moved.start).toBe(90 * 60);
  });

  it("allows the default duration to cross midnight for a late current hour", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 8, 23, 47));
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2026-10-06T00:00:00Z"),
        end: new Date("2026-10-07T00:00:00Z"),
        allDay: true,
      },
      { ...settings, eventDuration: 90 },
    );

    expect(new Date(draft.start * 1000).toISOString()).toBe("2026-10-06T23:00:00.000Z");
    expect(new Date(draft.end * 1000).toISOString()).toBe("2026-10-07T00:30:00.000Z");
  });

  it("keeps the clicked time in the timed grid, including a midnight slot", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 8, 13, 47));
    for (const time of ["00:00:00", "09:30:00"]) {
      const start = new Date(`2026-10-06T${time}Z`);
      const draft = buildCreateDraftFromSelection({ start, end: start, allDay: false }, settings);

      expect(draft.start).toBe(start.getTime() / 1000);
      expect(draft.end - draft.start).toBe(60 * 60);
    }
  });

  it("uses the default duration after changing the start of a manually extended single-day draft", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2026-10-06T14:00:00Z"),
        end: new Date("2026-10-06T15:00:00Z"),
        allDay: false,
      },
      settings,
    );
    const extended = setCreateDraftEnd(draft, draft.start + 4 * 60 * 60, settings);
    const moved = setCreateDraftStart(extended, draft.start + 60 * 60, settings);
    expect(moved.end - moved.start).toBe(60 * 60);
  });

  it("preserves a dragged timed multi-day range and its duration when the start changes", () => {
    const start = new Date("2026-10-06T14:00:00Z");
    const end = new Date("2026-10-08T18:00:00Z");
    const draft = buildCreateDraftFromSelection({ start, end, allDay: false }, settings);
    const moved = setCreateDraftStart(draft, draft.start + 24 * 60 * 60, settings);

    expect(draft.end).toBe(end.getTime() / 1000);
    expect(moved.end - moved.start).toBe(draft.end - draft.start);
  });

  it("uses the default duration when switching a single-day draft from all-day back to timed", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2026-10-06T14:00:00Z"),
        end: new Date("2026-10-06T15:00:00Z"),
        allDay: false,
      },
      settings,
    );
    const timed = setCreateDraftAllDay(
      setCreateDraftAllDay(draft, true, settings),
      false,
      settings,
    );
    expect(timed.end - timed.start).toBe(60 * 60);
  });

  it("retains the last selected date when switching a multi-day draft to timed", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2026-10-06T00:00:00Z"),
        end: new Date("2026-10-09T00:00:00Z"),
        allDay: true,
      },
      settings,
    );
    const timed = setCreateDraftAllDay(draft, false, settings);
    expect(new Date(timed.end * 1000).toISOString()).toBe("2026-10-08T01:00:00.000Z");
  });

  it("uses all-day defaults for timed selections when configured", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2024-01-20T09:00:00Z"),
        end: new Date("2024-01-20T11:00:00Z"),
        allDay: false,
      },
      { ...settings, allDayDefault: true },
    );

    expect(draft).toMatchObject({
      allDay: true,
      start: 1705708800,
      end: 1705795200,
    });
  });

  it("preserves the exclusive end for all-day selections while exposing an inclusive display end", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2024-01-20T00:00:00Z"),
        end: new Date("2024-01-23T00:00:00Z"),
        allDay: true,
      },
      settings,
    );

    expect(draft.end).toBe(1705968000);
    expect(getCreateDraftDisplayEnd(draft)).toBe(1705881600);

    expect(buildCreateDraftEventInput(draft)).toMatchObject({
      allDay: true,
      start: new Date("2024-01-20T00:00:00.000Z"),
      end: new Date("2024-01-23T00:00:00.000Z"),
      extendedProps: {
        isDraftCreate: true,
      },
    });
  });

  it("converts timed drafts to all-day drafts using an exclusive end", () => {
    const draft = setCreateDraftAllDay(
      buildCreateDraftFromSelection(
        {
          start: new Date("2024-01-20T09:00:00Z"),
          end: new Date("2024-01-20T11:00:00Z"),
          allDay: false,
        },
        settings,
      ),
      true,
      settings,
    );

    expect(draft).toMatchObject({
      allDay: true,
      start: 1705708800,
      end: 1705795200,
    });
  });

  it("keeps all-day edits aligned to full-day boundaries", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2024-01-20T00:00:00Z"),
        end: new Date("2024-01-22T00:00:00Z"),
        allDay: true,
      },
      settings,
    );

    const moved = setCreateDraftStart(draft, 1705968000, settings);
    const resized = setCreateDraftEnd(moved, 1706140800, settings);

    expect(moved).toMatchObject({
      start: 1705968000,
      end: 1706140800,
    });
    expect(resized).toMatchObject({
      start: 1705968000,
      end: 1706227200,
    });
  });

  it("preserves timed duration when the start changes", () => {
    const draft = buildCreateDraftFromSelection(
      {
        start: new Date("2024-01-20T09:00:00Z"),
        end: new Date("2024-01-20T11:30:00Z"),
        allDay: false,
      },
      { ...settings, eventDuration: 150 },
    );

    const moved = setCreateDraftStart(draft, 1705827600, { ...settings, eventDuration: 150 });
    const resized = setCreateDraftEnd(moved, 1705825800, { ...settings, eventDuration: 60 });

    expect(moved).toMatchObject({
      start: 1705827600,
      end: 1705836600,
    });
    expect(resized.end).toBe(1705831200);
  });
});
