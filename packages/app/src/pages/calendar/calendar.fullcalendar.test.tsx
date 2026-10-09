// @vitest-environment jsdom

import { PopoverProvider } from "@cal/contexts/popover/popover.context";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearCalendarEventsCache } from "./calendar.events";
import { CalendarFullcalendar } from "./calendar.fullcalendar";

const { showPopover, hidePopover, controlPanelSettings } = vi.hoisted(() => ({
  showPopover: vi.fn(),
  hidePopover: vi.fn(),
  controlPanelSettings: { language: "en-US", weekStartDay: 0, realPopover: false },
}));

vi.mock("@cal/contexts/popover/popover.context", async (original) => {
  const actual = await original<typeof import("@cal/contexts/popover/popover.context")>();
  return {
    ...actual,
    usePopover: () => {
      const context = actual.usePopover();
      return controlPanelSettings.realPopover ? context : { showPopover, hidePopover };
    },
  };
});
vi.mock("./context/config.context", () => ({
  useConfig: () => ({
    currentDay: new Date("2026-10-09T00:00:00Z"),
    language: controlPanelSettings.language,
    formats: { time: { short: { js: { hour: "numeric", minute: "2-digit", hour12: true } } } },
    weekStartDay: controlPanelSettings.weekStartDay,
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
    Object.assign(controlPanelSettings, { language: "en-US", weekStartDay: 0, realPopover: false });
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Craft", {
      t: (_category: string, message: string, params: Record<string, string | number> = {}) =>
        Object.entries(params).reduce(
          (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
          message,
        ),
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
    const calendar = (
      <CalendarFullcalendar
        hiddenCalendarIds={[]}
        selectedDate={new Date("2026-10-09T00:00:00Z")}
        onDateChange={vi.fn()}
        miniDateSelection={null}
        onMiniDateSelectionHandled={vi.fn()}
      />
    );
    await act(async () => root.render(<PopoverProvider>{calendar}</PopoverProvider>));
    await settle();
  };

  const changeRange = async (range: string) => {
    const selector = container.querySelector<HTMLSelectElement>('[aria-label="Agenda range"]');
    expect(selector).not.toBeNull();
    act(() => {
      if (selector) {
        selector.value = range;
        selector.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    await settle();
  };

  const lastFetchedRange = () => {
    const url = vi.mocked(fetch).mock.calls.at(-1)?.[0] as URL;
    return [url.searchParams.get("start"), url.searchParams.get("end")];
  };

  it.each([
    ["week", ["2026-10-04", "2026-10-11"], ["2026-10-11", "2026-10-18"]],
    ["threeMonths", ["2026-10-01", "2027-01-01"], ["2027-01-01", "2027-04-01"]],
    ["year", ["2026-01-01", "2027-01-01"], ["2027-01-01", "2028-01-01"]],
  ])("fetches the %s range and navigates by that range", async (range, initial, next) => {
    await mount();
    expect(lastFetchedRange()).toEqual(["2026-10-01", "2026-11-01"]);
    await changeRange(range);
    expect(lastFetchedRange()).toEqual(initial);
    expect(
      container
        .querySelector('[aria-label="Agenda range"]')
        ?.parentElement?.closest(".fc-toolbar-chunk"),
    ).not.toBeNull();
    act(() => container.querySelector<HTMLButtonElement>(".fc-next-button")?.click());
    await settle();
    expect(lastFetchedRange()).toEqual(next);
    act(() => container.querySelector<HTMLButtonElement>(".fc-prev-button")?.click());
    await settle();
    // Returning to the previous range may use the cache instead of another request.
    expect(container.querySelector(".fc-toolbar-title")?.textContent).toContain("2026");
    expect(container.querySelectorAll(".fc-list-event")).toHaveLength(2);
  });

  it("preserves the selected Agenda range across view changes and reloads", async () => {
    await mount();
    await changeRange("threeMonths");
    act(() => container.querySelector<HTMLButtonElement>(".fc-dayGridMonth-button")?.click());
    await settle();
    expect(container.querySelector('[aria-label="Agenda range"]')).toBeNull();
    expect(container.querySelector(".fc-dayGridMonth-view")).not.toBeNull();
    expect(container.querySelector(".fc-toolbar-title")?.textContent).toBe("October 2026");
    act(() => container.querySelector<HTMLButtonElement>(".fc-listMonth-button")?.click());
    await settle();
    expect(container.querySelector<HTMLSelectElement>('[aria-label="Agenda range"]')?.value).toBe(
      "threeMonths",
    );
    await act(async () => root.unmount());
    root = createRoot(container);
    clearCalendarEventsCache();
    await mount();
    expect(lastFetchedRange()).toEqual(["2026-10-01", "2027-01-01"]);
    expect(container.querySelectorAll('[aria-label="Agenda range"]')).toHaveLength(1);
  });

  it("falls back to Month when a stored Agenda range is invalid", async () => {
    localStorage.setItem("solspace-calendar-agenda-range", JSON.stringify("outdated"));
    await mount();
    expect(lastFetchedRange()).toEqual(["2026-10-01", "2026-11-01"]);
    expect(container.querySelector<HTMLSelectElement>('[aria-label="Agenda range"]')?.value).toBe(
      "month",
    );
  });

  it("uses the date picker to navigate the selected week or year", async () => {
    await mount();
    await changeRange("week");
    act(() => container.querySelector<HTMLButtonElement>(".fc-datepicker-button")?.click());
    expect(container.querySelector(".react-datepicker__week-number")).not.toBeNull();
    act(() => container.querySelector<HTMLDivElement>(".react-datepicker__day--018")?.click());
    await settle();
    expect(lastFetchedRange()).toEqual(["2026-10-18", "2026-10-25"]);
    expect(container.querySelector(".fc-datepicker-popover")).toBeNull();

    await changeRange("year");
    act(() => container.querySelector<HTMLButtonElement>(".fc-datepicker-button")?.click());
    const year = Array.from(
      container.querySelectorAll<HTMLDivElement>(".react-datepicker__year-text"),
    ).find((element) => element.textContent === "2027");
    expect(year).toBeDefined();
    act(() => year?.click());
    await settle();
    expect(lastFetchedRange()).toEqual(["2027-01-01", "2028-01-01"]);
    expect(container.querySelector(".fc-datepicker-popover")).toBeNull();
  });

  it("groups customized events by day, formats times, and opens the existing preview", async () => {
    await mount();
    expect(container.querySelector(".fc-listMonth-button")?.textContent).toBe("Agenda");
    expect(container.querySelectorAll(".fc-list-day")).toHaveLength(2);
    const dateHeader = container.querySelector(".fc-list-day th") as HTMLTableCellElement;
    const dateLink = dateHeader.querySelector("a") as HTMLAnchorElement;
    expect(dateHeader.getAttribute("aria-labelledby")).toBe(dateLink.id);
    expect(dateLink.getAttribute("href")).toBe("/admin/calendar/2026/10/09/day");
    expect(dateLink.querySelector(".calendar-agenda-day-number")?.textContent).toBe("9");
    const rows = container.querySelectorAll(".fc-list-event");
    expect(rows[0].textContent).toContain("Custom workshop");
    expect(rows[0].textContent).toContain("Studio two");
    expect(rows[0].querySelector(".calendar-agenda-calendar")?.textContent).toBe("Workshops");
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

  it("places history in the action-button host supplied beside New Event", async () => {
    const actions = document.createElement("div");
    actions.dataset.calendarHistoryRoot = "";
    document.body.append(actions);
    try {
      await mount();
      expect(actions.querySelector('[aria-label="Event history"]')).not.toBeNull();
      expect(actions.querySelector<HTMLButtonElement>('[aria-label="Undo"]')?.disabled).toBe(true);
      expect(container.querySelector('[aria-label="Event history"]')).toBeNull();
    } finally {
      actions.remove();
    }
  });

  it("places search in the page header when the template supplies its host", async () => {
    const header = document.createElement("div");
    header.dataset.calendarSearchRoot = "";
    document.body.append(header);
    try {
      await mount();
      expect(header.querySelector("input")?.getAttribute("placeholder")).toBe("Search");
      expect(container.querySelector("input")).toBeNull();
      expect(container.querySelector(".fc-listMonth-view")).not.toBeNull();
    } finally {
      header.remove();
    }
  });

  it("opens a full-year overview with colored markers and cancellation flags", async () => {
    history.replaceState(null, "", "/admin/calendar/2026/10/09/year?site=2");
    await mount();
    expect(lastFetchedRange()).toEqual(["2026-01-01", "2027-01-01"]);
    expect(container.querySelector(".fc-calendarYear-button")?.textContent).toBe("Year");
    expect(container.querySelector(".fc-toolbar-title")?.textContent).toBe("2026");
    expect(container.querySelectorAll(".calendar-year-month")).toHaveLength(12);
    expect(container.querySelectorAll(".calendar-year-day")).toHaveLength(365);
    expect(container.querySelector('[data-date="2026-10-09"] .calendar-year-dot')).not.toBeNull();
    expect(
      container.querySelector('[data-date="2026-10-10"] .calendar-year-dot.is-cancelled'),
    ).not.toBeNull();
    expect(container.querySelector('[data-date="2026-10-11"] .calendar-year-dot')).toBeNull();
    expect(JSON.parse(localStorage.getItem("solspace-calendar-view") ?? "{}").view).toBe(
      "calendarYear",
    );
    expect(new URL(window.location.href).searchParams.get("site")).toBe("2");

    const previewContainer = document.createElement("div");
    document.body.append(previewContainer);
    const previewRoot = createRoot(previewContainer);
    try {
      const day = container.querySelector<HTMLButtonElement>('[data-date="2026-10-09"]');
      act(() => day?.focus());
      expect(showPopover).toHaveBeenCalledOnce();
      await act(async () =>
        previewRoot.render(<PopoverProvider>{showPopover.mock.calls[0][0]}</PopoverProvider>),
      );
      expect(previewContainer.textContent).toContain("Custom workshop");
      expect(previewContainer.textContent).toMatch(/10:00.*12:00/);
      act(() => previewContainer.querySelector<HTMLButtonElement>("li button")?.click());
      expect(showPopover.mock.calls.at(-1)?.[0].props.fcEvent.event.title).toBe("Custom workshop");
      act(() => day?.click());
      await settle();
      expect(container.querySelector(".fc-timeGridDay-view")).not.toBeNull();
      expect(container.querySelector(".fc-toolbar-title")?.textContent).toContain("October 9");
    } finally {
      await act(async () => previewRoot.unmount());
      previewContainer.remove();
    }
  });

  it("navigates years and opens a month from its heading", async () => {
    await mount();
    act(() => container.querySelector<HTMLButtonElement>(".fc-calendarYear-button")?.click());
    await settle();
    act(() => container.querySelector<HTMLButtonElement>(".fc-next-button")?.click());
    await settle();
    expect(lastFetchedRange()).toEqual(["2027-01-01", "2028-01-01"]);
    expect(container.querySelector(".fc-toolbar-title")?.textContent).toBe("2027");
    act(() => container.querySelector<HTMLButtonElement>(".fc-next-button")?.click());
    await settle();
    expect(container.querySelectorAll(".calendar-year-day")).toHaveLength(366);
    expect(container.querySelector('[data-date="2028-02-29"]')).not.toBeNull();
    act(() => container.querySelector<HTMLButtonElement>(".fc-prev-button")?.click());
    await settle();
    act(() => container.querySelector<HTMLButtonElement>(".fc-datepicker-button")?.click());
    expect(container.querySelector(".react-datepicker__year-text")).not.toBeNull();
    act(() =>
      container
        .querySelector<HTMLButtonElement>('.calendar-year-month[aria-label="March"] h3 button')
        ?.click(),
    );
    await settle();
    expect(container.querySelector(".fc-dayGridMonth-view")).not.toBeNull();
    expect(container.querySelector(".fc-toolbar-title")?.textContent).toBe("March 2027");
  });

  it("applies search and hidden-calendar filters to Year markers", async () => {
    history.replaceState(null, "", "/admin/calendar/2026/10/09/year");
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
    expect(container.querySelectorAll(".calendar-year-markers .calendar-year-dot")).toHaveLength(0);
    expect(container.textContent).toContain("No matching events in this date range.");
    act(() => container.querySelector<HTMLButtonElement>(".calendar-search-clear")?.click());
    await settle();
    expect(container.querySelectorAll(".calendar-year-markers .calendar-year-dot")).toHaveLength(2);
    await act(async () =>
      root.render(
        <PopoverProvider>
          <CalendarFullcalendar
            hiddenCalendarIds={[1]}
            selectedDate={new Date("2026-10-09T00:00:00Z")}
            onDateChange={vi.fn()}
            miniDateSelection={null}
            onMiniDateSelectionHandled={vi.fn()}
          />
        </PopoverProvider>,
      ),
    );
    await settle();
    expect(container.querySelectorAll(".calendar-year-markers .calendar-year-dot")).toHaveLength(0);
    expect(container.textContent).toContain("No events in this date range.");
  });

  it("marks multi-day events across months and years without including exclusive end dates", async () => {
    history.replaceState(null, "", "/admin/calendar/2026/10/09/year");
    vi.mocked(fetch).mockImplementation(
      async () =>
        new Response(
          JSON.stringify([
            {
              id: "spanning",
              title: "Three-day retreat",
              start: "2026-01-31",
              end: "2026-02-03",
              allDay: true,
              calendar: 1,
              calendarColor: "#ff0000",
            },
            {
              id: "boundary",
              title: "New Year gathering",
              start: "2025-12-31T20:00:00",
              end: "2026-01-02T00:00:00",
              calendar: 2,
            },
            ...[1, 2, 3, 4].map((calendar) => ({
              id: `workshop-${calendar}`,
              title: "Workshop",
              start: "2026-01-31T10:00:00",
              end: "2026-01-31T11:00:00",
              calendar,
            })),
          ]),
        ),
    );
    await mount();
    expect(container.querySelector('[data-date="2026-01-01"] .calendar-year-dot')).not.toBeNull();
    expect(container.querySelector('[data-date="2026-01-02"] .calendar-year-dot')).toBeNull();
    expect(
      container.querySelector('[data-date="2026-01-31"]')?.getAttribute("aria-label"),
    ).toContain("5 events");
    expect(container.querySelectorAll('[data-date="2026-01-31"] .calendar-year-dot')).toHaveLength(
      3,
    );
    expect(
      container.querySelector('[data-date="2026-01-31"] .calendar-year-more')?.textContent,
    ).toBe("+");
    expect(container.querySelectorAll('[data-date="2026-02-01"] .calendar-year-dot')).toHaveLength(
      1,
    );
    expect(container.querySelectorAll('[data-date="2026-02-02"] .calendar-year-dot')).toHaveLength(
      1,
    );
    expect(container.querySelector('[data-date="2026-02-03"] .calendar-year-dot')).toBeNull();
  });

  it("uses localized month names and the configured first day of the week", async () => {
    Object.assign(controlPanelSettings, { language: "fr", weekStartDay: 1 });
    history.replaceState(null, "", "/admin/calendar/2026/10/09/year");
    await mount();
    const january = container.querySelector('.calendar-year-month[aria-label="janvier"]');
    expect(january).not.toBeNull();
    expect(january?.querySelector(".calendar-year-weekdays span")?.textContent).toBe("L");
    expect(
      january?.querySelector(".calendar-year-days")?.children[3].getAttribute("data-date"),
    ).toBe("2026-01-01");
    expect(
      january?.querySelector('[data-date="2026-01-01"]')?.getAttribute("aria-label"),
    ).toContain("jeudi 1 janvier 2026");
  });

  it("keeps the day preview open with the real provider and dismisses it when leaving Year", async () => {
    controlPanelSettings.realPopover = true;
    vi.stubGlobal("Garnish", {
      MenuBtn: class {
        showingMenu = false;
        menu = { on: vi.fn() };
        hideMenu() {}
        destroy() {}
      },
    });
    history.replaceState(null, "", "/admin/calendar/2026/10/09/year");
    await mount();
    const day = container.querySelector<HTMLButtonElement>('[data-date="2026-10-10"]');
    act(() => day?.focus());
    await settle();
    const preview = container.querySelector("[data-calendar-year-preview]");
    expect(preview?.textContent).toContain("Cancelled all-day event");
    expect(preview?.textContent).toContain("All Day");
    expect(preview?.querySelector(".year-preview-cancelled")?.textContent).toBe("Cancelled");
    expect(container.querySelector('[data-date="2026-10-10"]')).toBe(day);
    act(() => preview?.querySelector<HTMLButtonElement>("li button")?.click());
    await settle();
    expect(container.querySelector(".event-title")?.textContent).toBe("Cancelled all-day event");
    expect(container.querySelector("[data-calendar-year-preview]")).toBeNull();
    expect(container.querySelector('[data-date="2026-10-10"]')).toBe(day);
    act(() => container.querySelector<HTMLButtonElement>(".fc-dayGridMonth-button")?.click());
    await settle();
    expect(container.querySelector("[data-calendar-year-preview]")).toBeNull();
    expect(container.querySelector(".event-title")).toBeNull();
    expect(container.querySelector(".fc-dayGridMonth-view")).not.toBeNull();
  });
});
