import { describe, expect, it } from "vitest";
import { getCalendarEventClickAction } from "./calendar.event-content";

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
