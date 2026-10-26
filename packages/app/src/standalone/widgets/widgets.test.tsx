// @vitest-environment jsdom
import { clearCalendarEventsCache } from "@cal/pages/calendar/calendar.events";
import type { DateFormats } from "@cal/types/config";
import type { EventApi } from "@fullcalendar/core";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AgendaWidget } from "./agenda/agenda";
import { EventWidget } from "./event/event";
import { getMiniDayEvents, Mini } from "./mini/mini";

const dateFormat = {
  php: "Y-m-d",
  icu: "yyyy-MM-dd",
  js: { year: "numeric", month: "2-digit", day: "2-digit" },
} as const;
const timeFormat = {
  php: "g:i A",
  icu: "h:mm aa",
  js: { hour: "numeric", minute: "2-digit", hour12: true },
} as const;
const datetimeFormat = {
  ...timeFormat,
  icu: "yyyy-MM-dd h:mm aa",
  js: { ...dateFormat.js, ...timeFormat.js },
};
const lengths = <T,>(format: T) => ({ short: format, medium: format, long: format, full: format });
const formats: DateFormats = {
  date: lengths(dateFormat),
  time: lengths(timeFormat),
  datetime: lengths(datetimeFormat),
};
const config = {
  formats,
  language: "en-US",
  overlapThreshold: 5,
  weekStartDay: 0 as const,
  currentSiteId: 2,
  siteHandle: "dutch",
  currentDay: new Date("2026-10-26T00:00:00Z"),
  isMultiSite: true,
  calendars: ["1"],
  view: "month" as const,
};
const events = [
  {
    id: "1",
    title: "Workshop",
    start: "2026-10-27T10:00:00",
    end: "2026-10-27T11:00:00",
    url: "/events/1",
    calendarName: "Work",
    color: "#d43b35",
  },
];

describe("dashboard calendar widgets", () => {
  let container: HTMLDivElement;
  let root: Root;
  beforeEach(() => {
    vi.stubEnv("TZ", "America/Winnipeg");
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 26, 9, 30));
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Garnish", {
      MenuBtn: class {
        showingMenu = false;
        constructor(
          button: HTMLButtonElement,
          settings: { onOptionSelect: (target: HTMLElement) => void },
        ) {
          button.nextElementSibling
            ?.querySelectorAll<HTMLElement>("[data-calendar-id]")
            .forEach((option) => {
              option.addEventListener("click", () => settings.onOptionSelect(option));
            });
        }
        hideMenu() {}
        destroy() {}
      },
    });
    vi.stubGlobal("Craft", {
      t: (_category: string, message: string, params: Record<string, unknown> = {}) =>
        Object.entries(params).reduce(
          (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
          message,
        ),
      getCpUrl: (path: string) => `/admin/${path}`,
      csrfTokenValue: "test-csrf",
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify(events))),
    );
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
      setTimeout(() => callback(0), 0),
    );
    vi.stubGlobal("cancelAnimationFrame", clearTimeout);
    clearCalendarEventsCache();
    history.replaceState(null, "", "/admin/dashboard?site=english");
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.useRealTimers();
  });
  const settle = () =>
    act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 40));
    });
  const click = async (selector: string) => {
    act(() => container.querySelector<HTMLButtonElement>(selector)?.click());
    await settle();
  };
  const render = async (element: React.ReactNode) => {
    await act(async () => root.render(element));
    await settle();
  };
  const typeTitle = (text: string) =>
    act(() => {
      const input = container.querySelector<HTMLInputElement>('input[type="text"]');
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, text);
      input?.dispatchEvent(new globalThis.Event("input", { bubbles: true }));
    });

  it("switches all views locally and links to the same date and widget site", async () => {
    await render(<AgendaWidget config={{ ...config, view: null }} />);
    expect(container.querySelector(".fc-dayGridMonth-view")).not.toBeNull();
    const buttons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(".calendar-widget-view-switcher button"),
    );
    for (const [label, view] of [
      ["Day", "timeGridDay"],
      ["Week", "timeGridWeek"],
      ["Agenda", "listMonth"],
      ["Month", "dayGridMonth"],
    ]) {
      act(() => buttons.find((button) => button.textContent === label)?.click());
      await settle();
      expect(container.querySelector(`.fc-${view}-view`)).not.toBeNull();
    }
    expect(window.location.pathname).toBe("/admin/dashboard");
    expect(container.querySelector<HTMLAnchorElement>(".calendar-widget-footer a")?.href).toContain(
      "/calendar/2026/10/26/month?site=dutch",
    );
    expect(container.querySelector(".fc-event-title")?.textContent).toBe("Workshop");
    await click('.fc-day[data-date="2026-10-27"] .fc-daygrid-day-number');
    expect(container.querySelector(".fc-timeGridDay-view")).not.toBeNull();
    expect(container.querySelector("h3")?.textContent).toContain("October 27");
  });

  it("limits available views, starts at the selected default, and hides a single-view switcher", async () => {
    await render(
      <AgendaWidget config={{ ...config, enabledViews: ["week", "agenda"], view: "agenda" }} />,
    );
    expect(container.querySelector(".fc-listMonth-view")).not.toBeNull();
    expect(
      Array.from(
        container.querySelectorAll(".calendar-widget-view-switcher button"),
        (button) => button.textContent,
      ),
    ).toEqual(["Week", "Agenda"]);
    expect(container.querySelector(".fc-daygrid-day-number[data-navlink]")).toBeNull();
    await render(
      <AgendaWidget key="single" config={{ ...config, enabledViews: ["week"], view: "month" }} />,
    );
    expect(container.querySelector(".fc-timeGridWeek-view")).not.toBeNull();
    expect(container.querySelector(".calendar-widget-view-switcher")).toBeNull();
    expect(container.querySelector("[data-navlink]")).toBeNull();
  });

  it("changes the Agenda date range independently of other widgets", async () => {
    await render(<AgendaWidget config={{ ...config, view: "agenda" }} />);
    const select = container.querySelector<HTMLSelectElement>('[aria-label="Agenda range"]');
    act(() => {
      if (select) {
        select.value = "week";
        select.dispatchEvent(new globalThis.Event("change", { bubbles: true }));
      }
    });
    await settle();
    const url = new URL(String(vi.mocked(fetch).mock.calls.at(-1)?.[0]), window.location.origin);
    expect(url.searchParams.get("start")).toBe("2026-10-25");
    expect(url.searchParams.get("end")).toBe("2026-11-01");
    expect(localStorage.getItem("solspace-calendar-agenda-range")).toBeNull();
  });

  it("shows an event-free Today in Agenda, navigates, and fetches fresh events on Refresh", async () => {
    await render(<AgendaWidget config={{ ...config, view: "agenda" }} />);
    expect(container.querySelector(".calendar-now-day")?.textContent).toContain("Today");
    expect(container.querySelector(".calendar-now-agenda-row")?.textContent).toBe("Now · 9:30 AM");
    const requests = vi.mocked(fetch).mock.calls.length;
    await click(".calendar-widget-footer button");
    expect(vi.mocked(fetch).mock.calls.length).toBeGreaterThan(requests);
    await click('[aria-label="Next"]');
    expect(container.querySelector(".calendar-now-agenda-row")).toBeNull();
    expect(container.querySelector("h3")?.textContent).toContain("November");
    const url = new URL(String(vi.mocked(fetch).mock.calls.at(-1)?.[0]), window.location.origin);
    expect(url.searchParams.get("siteId")).toBe("2");
    expect(url.searchParams.get("calendars")).toBe("1");
  });

  it("shows load failures and recovers on Refresh", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));
    await render(<AgendaWidget config={{ ...config, view: "agenda" }} />);
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Couldn’t load events",
    );
    await click(".calendar-widget-footer button");
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelector(".fc-event-title")?.textContent).toBe("Workshop");
  });

  it("rebuilds mini-calendar dots after navigating away from an event month", async () => {
    await render(<Mini config={config} />);
    expect(
      container.querySelector('.fc-day[data-date="2026-10-27"] .calendar-mini-dots i'),
    ).not.toBeNull();
    expect(
      container
        .querySelector('.fc-day[data-date="2026-10-27"] .fc-daygrid-day-number')
        ?.getAttribute("href"),
    ).toContain("/calendar/2026/10/27/day?site=dutch");
    vi.mocked(fetch).mockImplementation(async () => new Response("[]"));
    await click('[aria-label="Next month"]');
    expect(container.querySelectorAll(".calendar-mini-dots i")).toHaveLength(0);
  });

  it("previews Mini dates on hover and keyboard focus using the Year-view preview", async () => {
    await render(<Mini config={config} />);
    const day = container.querySelector<HTMLAnchorElement>(
      '.fc-day[data-date="2026-10-27"] .fc-daygrid-day-number',
    );
    act(() => day?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 330));
    });
    const preview = document.querySelector("[data-calendar-year-preview]");
    expect(preview?.textContent).toContain("Workshop");
    expect(preview?.textContent).toContain("10:00 AM – 11:00 AM");
    expect(preview?.textContent).toContain("Work");
    expect(preview?.querySelector<HTMLAnchorElement>("a")?.getAttribute("href")).toBe("/events/1");
    expect(container.querySelector("[data-calendar-year-preview]")).toBeNull();
    act(() =>
      day?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })),
    );
    expect(document.activeElement).toBe(preview?.querySelector("a"));
    act(() =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })),
    );
    await settle();
    expect(document.querySelector("[data-calendar-year-preview]")).toBeNull();
    const emptyDay = container.querySelector<HTMLAnchorElement>(
      '.fc-day[data-date="2026-10-26"] .fc-daygrid-day-number',
    );
    act(() => emptyDay?.focus());
    await settle();
    expect(document.querySelector("[data-calendar-year-preview]")?.textContent).toContain(
      "No events to display",
    );
    await click('[aria-label="Next month"]');
    expect(document.querySelector("[data-calendar-year-preview]")).toBeNull();
  });

  it("counts every occupied day while respecting exclusive midnight ends", () => {
    const span = [
      { start: new Date("2026-10-26T12:00:00Z"), end: new Date("2026-10-28T00:00:00Z") },
    ] as EventApi[];
    expect(getMiniDayEvents(span, new Date("2026-10-26T00:00:00Z"))).toHaveLength(1);
    expect(getMiniDayEvents(span, new Date("2026-10-27T00:00:00Z"))).toHaveLength(1);
    expect(getMiniDayEvents(span, new Date("2026-10-28T00:00:00Z"))).toHaveLength(0);
  });

  it("opens an accessible day preview for Month overflow, with edit links and a close button", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify([
          ...events,
          { ...events[0], id: "2", title: "Second event", url: "/events/2" },
          { ...events[0], id: "3", title: "Third event", url: "/events/3" },
        ]),
      ),
    );
    await render(<AgendaWidget config={config} />);
    const more = container.querySelector<HTMLElement>(
      '.fc-day[data-date="2026-10-27"] .fc-more-link',
    );
    expect(more).not.toBeNull();
    act(() => more?.click());
    await settle();
    const preview = document.querySelector('[data-calendar-year-preview][role="dialog"]');
    expect(preview?.textContent).toContain("Workshop");
    expect(preview?.textContent).toContain("Third event");
    expect(preview?.querySelector('a[href="/events/3"]')).not.toBeNull();
    expect(preview?.textContent).toContain("10:00 AM – 11:00 AM");
    expect(container.querySelector(".fc-popover")).toBeNull();
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Close");
    act(() => preview?.querySelector<HTMLButtonElement>('[aria-label="Close"]')?.click());
    await settle();
    expect(document.querySelector("[data-calendar-year-preview]")).toBeNull();
    expect(document.activeElement).toBe(more);
    act(() => more?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
    await settle();
    expect(document.querySelector("[data-calendar-year-preview]")).not.toBeNull();
    await click('[aria-label="Next"]');
    expect(document.querySelector("[data-calendar-year-preview]")).toBeNull();
  });

  const eventConfig = {
    ...config,
    calendars: { 1: "Work", 2: "Personal" },
    timeInterval: 30,
    eventDuration: 60,
    allDayDefault: false,
    calendarAllowRepeating: { 1: true, 2: false },
    quickCreateFields: { 1: { location: "venue", description: "summary" } },
    quickCreateRequiredFields: { 1: { location: true } },
  };

  it("keeps quick-create values on a network error, then clears them after a successful retry", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));
    await render(<EventWidget config={eventConfig} />);
    typeTitle("My event");
    await click("button.submit");
    expect(container.querySelector('[role="alert"]')?.textContent).toBe("offline");
    expect(container.querySelector<HTMLInputElement>('input[type="text"]')?.value).toBe("My event");
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ title: "My event", url: "/events/7" })),
    );
    await click("button.submit");
    expect(container.querySelector('[role="status"]')?.textContent).toContain(
      "Event created successfully",
    );
    expect(container.querySelector<HTMLInputElement>('input[type="text"]')?.value).toBe("");
    expect(container.querySelector('[role="alert"]')).toBeNull();
    const options = vi.mocked(fetch).mock.calls.at(-1)?.[1];
    expect(new Headers(options?.headers).get("X-CSRF-Token")).toBe("test-csrf");
    expect(JSON.parse(String(options?.body))).toMatchObject({
      title: "My event",
      calendarId: 1,
      siteId: 2,
    });
  });

  it("uses the same all-day schedule behavior as the Events quick-create form", async () => {
    await render(<EventWidget config={eventConfig} />);
    await click('[role="switch"]');
    await click('[role="switch"]');
    typeTitle("Timed event");
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ title: "Timed event", url: "/events/8" })),
    );
    await click("button.submit");
    const payload = JSON.parse(String(vi.mocked(fetch).mock.calls.at(-1)?.[1]?.body));
    expect(new Date(payload.start * 1000).getUTCHours()).toBe(0);
    expect(payload.allDay).toBe(false);
  });
  it("shares repeat controls and mapped details with the Events quick-create form", async () => {
    await render(<EventWidget config={eventConfig} />);
    expect(container.querySelector('select[id$="-repeat"]')).not.toBeNull();
    expect(
      Array.from(container.querySelectorAll("label")).some(
        (label) => label.textContent === "Location",
      ),
    ).toBe(true);
    const repeat = container.querySelector<HTMLSelectElement>('select[id$="-repeat"]');
    act(() => {
      if (repeat) {
        repeat.value = "DAILY";
        repeat.dispatchEvent(new globalThis.Event("change", { bubbles: true }));
      }
    });
    typeTitle("Repeating event");
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ title: "Repeating event", url: "/events/9" })),
    );
    await click("button.submit");
    const payload = JSON.parse(String(vi.mocked(fetch).mock.calls.at(-1)?.[1]?.body));
    expect(payload.repeatType).toBe("DAILY");
    expect(payload.rrule).toContain("FREQ=DAILY");
    expect(payload.details).toEqual({ location: "", description: "" });
    expect(String(vi.mocked(fetch).mock.calls.at(-1)?.[0])).toContain("/admin/calendar/api/events");
  });

  it("respects hidden controls and prepares More details through the dashboard-safe endpoint", async () => {
    await render(
      <EventWidget
        config={{
          ...eventConfig,
          calendarAllowRepeating: { 1: false },
          quickCreateFields: {},
          showMoreDetails: false,
        }}
      />,
    );
    expect(container.querySelector('select[id$="-repeat"]')).toBeNull();
    expect(container.textContent).not.toContain("More details…");
    await render(<EventWidget key="details" config={eventConfig} />);
    typeTitle("Draft event");
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ errors: ["Please complete the required field"] }), {
        status: 400,
      }),
    );
    const button = Array.from(container.querySelectorAll<HTMLButtonElement>("button")).find(
      (button) => button.textContent === "More details…",
    );
    act(() => button?.click());
    await settle();
    expect(String(vi.mocked(fetch).mock.calls.at(-1)?.[0])).toContain(
      "/admin/calendar/api/events/prepare",
    );
    expect(container.querySelector('[role="alert"]')?.textContent).toContain("Please complete");
    expect(container.querySelector<HTMLInputElement>('input[type="text"]')?.value).toBe(
      "Draft event",
    );
  });
});
