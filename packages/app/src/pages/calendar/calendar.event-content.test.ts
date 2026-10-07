import type { EventApi, EventContentArg } from "@fullcalendar/core/index.js";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  getCalendarEventClassNames,
  getCalendarEventClickAction,
  renderCalendarEventContent,
} from "./calendar.event-content";

const classNamesFor = (extendedProps: Record<string, unknown>) =>
  getCalendarEventClassNames({
    event: { allDay: false, end: null, textColor: "", extendedProps } as unknown as EventApi,
  });

const contentFor = (extendedProps: Record<string, unknown>) =>
  renderToStaticMarkup(
    renderCalendarEventContent({
      event: {
        title: "Weekly standup",
        url: "/admin/calendar/events/42",
        allDay: true,
        extendedProps,
      },
      timeText: "",
      view: { type: "timeGridWeek" },
    } as unknown as EventContentArg),
  );

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
    expect(classNamesFor({ isEdited: true })).not.toContain("fc-event-cancelled");
  });

  it("tells screen readers an occurrence is cancelled", () => {
    expect(contentFor({ cancelled: true })).toContain(
      'Weekly standup<span class="visually-hidden">, Cancelled</span>',
    );
    expect(contentFor({})).not.toContain("visually-hidden");
  });

  it("keeps the edited pencil out of the title screen readers announce", () => {
    expect(contentFor({ isEdited: true })).toMatch(
      /<span class="fc-event-flag"[^>]*aria-hidden="true"/,
    );
    expect(contentFor({ cancelled: true, isEdited: true })).not.toContain("fc-event-flag");
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
