import { describe, expect, it } from "vitest";
import {
  buildCreateDraftEventInput,
  buildCreateDraftFromSelection,
  getCreateDraftDisplayEnd,
  setCreateDraftAllDay,
  setCreateDraftEnd,
  setCreateDraftStart,
} from "./calendar.create-session";

describe("calendar create session", () => {
  it("builds timed drafts directly from the selected range", () => {
    const draft = buildCreateDraftFromSelection({
      start: new Date("2024-01-20T09:00:00Z"),
      end: new Date("2024-01-20T11:00:00Z"),
      allDay: false,
    });

    expect(draft).toMatchObject({
      allDay: false,
      start: 1705741200,
      end: 1705748400,
    });
  });

  it("preserves the exclusive end for all-day selections while exposing an inclusive display end", () => {
    const draft = buildCreateDraftFromSelection({
      start: new Date("2024-01-20T00:00:00Z"),
      end: new Date("2024-01-23T00:00:00Z"),
      allDay: true,
    });

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
      buildCreateDraftFromSelection({
        start: new Date("2024-01-20T09:00:00Z"),
        end: new Date("2024-01-20T11:00:00Z"),
        allDay: false,
      }),
      true,
    );

    expect(draft).toMatchObject({
      allDay: true,
      start: 1705708800,
      end: 1705795200,
    });
  });

  it("keeps all-day edits aligned to full-day boundaries", () => {
    const draft = buildCreateDraftFromSelection({
      start: new Date("2024-01-20T00:00:00Z"),
      end: new Date("2024-01-22T00:00:00Z"),
      allDay: true,
    });

    const moved = setCreateDraftStart(draft, 1705968000);
    const resized = setCreateDraftEnd(moved, 1706140800);

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
    const draft = buildCreateDraftFromSelection({
      start: new Date("2024-01-20T09:00:00Z"),
      end: new Date("2024-01-20T11:30:00Z"),
      allDay: false,
    });

    const moved = setCreateDraftStart(draft, 1705827600);
    const resized = setCreateDraftEnd(moved, 1705825800);

    expect(moved).toMatchObject({
      start: 1705827600,
      end: 1705836600,
    });
    expect(resized.end).toBe(1705831200);
  });
});
