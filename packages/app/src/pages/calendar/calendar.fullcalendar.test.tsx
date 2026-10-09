// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearCalendarEventsCache } from "./calendar.events";
import { CalendarFullcalendar } from "./calendar.fullcalendar";

const { showPopover, hidePopover } = vi.hoisted(() => ({
  showPopover: vi.fn(),
  hidePopover: vi.fn(),
}));

vi.mock("@cal/contexts/popover/popover.context", () => ({
  usePopover: () => ({ showPopover, hidePopover }),
}));
vi.mock("./calendar.date-selector", () => ({
  useDateSelector: () => ({
    datePickerButton: { text: "Choose date" },
    dateSelector: null as React.ReactNode,
  }),
}));
vi.mock("./context/config.context", () => ({
  useConfig: () => ({
    currentDay: new Date("2026-10-09T00:00:00Z"),
    language: "en-US",
    formats: { time: { short: { js: { hour: "numeric", minute: "2-digit", hour12: true } } } },
    weekStartDay: 0,
    overlapThresholdString: "00:00:00",
    allDayDefault: false,
    eventDuration: 60,
    timeInterval: 30,
    canEditEvents: true,
    isDragAndDropEnabled: true,
    isQuickCreateEnabled: true,
    currentSiteId: 1,
  }),
}));

const events = [
  {
    id: "1-20261009100000",
    title: "Custom workshop",
    start: "2026-10-09T10:00:00",
    end: "2026-10-09T12:00:00",
    url: "/admin/calendar/events/1",
    calendar: 1,
    calendarName: "Workshops",
    location: "Studio two",
    description: "A description from the custom occurrence.",
    isEdited: true,
  },
  {
    id: "2-20261010000000",
    title: "Cancelled all-day event",
    start: "2026-10-10",
    end: "2026-10-11",
    allDay: true,
    calendar: 1,
    cancelled: true,
  },
];

describe("control panel Agenda", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Craft", {
      t: (_category: string, message: string) => message,
      getCpUrl: (path: string) => `/admin/${path}`,
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async (url: URL) =>
          new Response(
            JSON.stringify(url.searchParams.get("criteria[search]") === "missing" ? [] : events),
          ),
      ),
    );
    clearCalendarEventsCache();
    localStorage.clear();
    history.replaceState(null, "", "/admin/calendar/2026/10/09/agenda");
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    showPopover.mockClear();
    hidePopover.mockClear();
  });

  const settle = () =>
    act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
    });
  const mount = async () => {
    await act(async () =>
      root.render(
        <CalendarFullcalendar
          hiddenCalendarIds={[]}
          selectedDate={new Date("2026-10-09T00:00:00Z")}
          onDateChange={vi.fn()}
          miniDateSelection={null}
          onMiniDateSelectionHandled={vi.fn()}
        />,
      ),
    );
    await settle();
  };

  it("groups customized events by day, formats times, and opens the existing preview", async () => {
    await mount();
    expect(container.querySelector(".fc-listMonth-button")?.textContent).toBe("Agenda");
    expect(container.querySelectorAll(".fc-list-day")).toHaveLength(2);
    const rows = container.querySelectorAll(".fc-list-event");
    expect(rows[0].textContent).toContain("Custom workshop");
    expect(rows[0].textContent).toContain("Studio two");
    expect(rows[0].textContent).toContain("A description from the custom occurrence.");
    expect(rows[0].querySelector(".fc-list-event-time")?.textContent).toMatch(/10:00.*12:00/);
    expect(rows[1].querySelector(".fc-list-event-time")?.textContent).toBe("All Day");
    expect(rows[1].querySelector(".calendar-agenda-cancelled")?.textContent).toBe("Cancelled");
    expect(JSON.parse(localStorage.getItem("solspace-calendar-view") ?? "{}").view).toBe(
      "listMonth",
    );
    act(() => rows[0].querySelector<HTMLAnchorElement>("a.fc-event-title")?.click());
    expect(showPopover).toHaveBeenCalledOnce();
  });

  it("updates the native view after searching and clearing without a stale range cache", async () => {
    await mount();
    const input = container.querySelector("input") as HTMLInputElement;
    act(() => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(
        input,
        "missing",
      );
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await settle();
    expect(container.querySelectorAll(".fc-list-event")).toHaveLength(0);
    expect(container.textContent).toContain("No matching events in this date range.");
    expect(new URL(window.location.href).searchParams.get("search")).toBe("missing");
    act(() => container.querySelector<HTMLButtonElement>(".calendar-search-clear")?.click());
    await settle();
    expect(container.querySelectorAll(".fc-list-event")).toHaveLength(2);
    expect(new URL(window.location.href).searchParams.has("search")).toBe(false);
  });
});
