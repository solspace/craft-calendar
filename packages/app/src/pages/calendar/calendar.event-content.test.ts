import type { EventApi } from "@fullcalendar/core/index.js";
import { describe, expect, it } from "vitest";
import { getCalendarEventClassNames, getCalendarEventClickAction } from "./calendar.event-content";

const classNamesFor = (extendedProps: Record<string, unknown>) =>
  getCalendarEventClassNames({
    event: { allDay: false, end: null, textColor: "", extendedProps } as unknown as EventApi,
  });

describe("calendar event content", () => {
  it("treats title-link clicks as navigation clicks", () => {
    const action = getCalendarEventClickAction(
      { extendedProps: {} },
      {
        closest: (selector: string) =>
          selector === "[data-calendar-event-title-link]" ? { matches: true } : null,
      },
    );

    expect(action).toBe("navigate");
  });

  it("treats non-title clicks as info-popover clicks", () => {
    const action = getCalendarEventClickAction(
      { extendedProps: {} },
      {
        closest: () => null,
      },
    );

    expect(action).toBe("open");
  });

  it("marks cancelled occurrences, edited or not", () => {
    expect(classNamesFor({ cancelled: true, isEdited: true })).toContain("fc-event-cancelled");
    expect(classNamesFor({ cancelled: true, isEdited: true })).not.toContain("fc-event-edited");
  });

  it("marks edited occurrences", () => {
    expect(classNamesFor({ isEdited: true })).toContain("fc-event-edited");
    expect(classNamesFor({})).not.toContain("fc-event-edited");
  });

  it("ignores draft event clicks entirely", () => {
    const action = getCalendarEventClickAction(
      { extendedProps: { isDraftCreate: true } },
      {
        closest: () => null,
      },
    );

    expect(action).toBe("ignore");
  });
});
