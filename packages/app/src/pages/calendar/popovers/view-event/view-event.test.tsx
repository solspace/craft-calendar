// @vitest-environment jsdom
import { PopoverProvider, usePopover } from "@cal/contexts/popover/popover.context";
import {
  deleteEvent,
  duplicateEvent,
  openOccurrenceEditor,
  setOccurrenceCancelled,
} from "@cal/pages/calendar/calendar.events";
import type { EventClickArg } from "@fullcalendar/core";
import { act, type FC } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PopoverViewEvent } from "./view-event";

vi.mock("@cal/pages/calendar/context/config.context", () => ({
  useConfig: () => ({
    currentSiteId: 2,
    eventActionIcons: Object.fromEntries(
      ["clone-dashed", "pencil", "calendar-pen", "ban", "rotate-left", "trash"].map((name) => [
        name,
        `<svg viewBox="0 0 16 16" data-craft-icon="${name}" focusable="false"><path d="M0 0h16v16H0z"/></svg>`,
      ]),
    ),
  }),
}));
vi.mock("@cal/pages/calendar/calendar.events", async (original) => ({
  ...(await original<typeof import("@cal/pages/calendar/calendar.events")>()),
  deleteEvent: vi.fn(async () => true),
  duplicateEvent: vi.fn(async () => null),
  editFollowing: vi.fn(async () => null),
  openOccurrenceEditor: vi.fn(),
  setOccurrenceCancelled: vi.fn(async () => true),
}));

// Model Garnish's detached menu and option callback; Craft supplies navigation and positioning.
class MenuButton {
  showingMenu = false;
  element: HTMLElement;
  onShow = () => {};
  menu = {
    on: (_event: string, callback: () => void) => {
      this.onShow = callback;
    },
  };

  constructor(
    readonly button: HTMLButtonElement,
    options: Garnish.MenuBtnOptions,
  ) {
    this.element = button.nextElementSibling as HTMLElement;
    this.element.remove();
    button.addEventListener("mousedown", this.showMenu);
    this.element.querySelectorAll<HTMLElement>("a").forEach((option) => {
      option.addEventListener("click", () => options.onOptionSelect?.(option));
    });
  }

  showMenu = () => {
    if (this.button.disabled) return;
    document.body.append(this.element);
    this.showingMenu = true;
    this.button.setAttribute("aria-expanded", "true");
    this.onShow();
  };

  hideMenu = () => {
    this.element.remove();
    this.showingMenu = false;
    this.button.setAttribute("aria-expanded", "false");
  };

  destroy = () => this.button.removeEventListener("mousedown", this.showMenu);
}

let popover: ReturnType<typeof usePopover>;
const Controls: FC = () => {
  popover = usePopover();
  return null;
};

describe("event popup actions", () => {
  let container: HTMLDivElement;
  let root: Root;
  let fcEvent: EventClickArg;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Garnish", { MenuBtn: MenuButton });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    fcEvent = {
      event: {
        id: "42-20261013140000",
        title: "Sample event",
        url: "/admin/calendar/events/42",
        start: new Date("2026-10-13T14:00:00Z"),
        end: new Date("2026-10-13T17:00:00Z"),
        allDay: false,
        extendedProps: { calendarName: "Another Calendar", rrule: "FREQ=DAILY;COUNT=20" },
      },
      el: container,
      view: { calendar: { refetchEvents: vi.fn() } },
    } as unknown as EventClickArg;
    await act(async () =>
      root.render(
        <PopoverProvider>
          <Controls />
        </PopoverProvider>,
      ),
    );
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  const show = () =>
    act(async () =>
      popover.showPopover(<PopoverViewEvent fcEvent={fcEvent} />, container, { closeDelayMs: 300 }),
    );
  const openMenu = () =>
    act(async () =>
      container
        .querySelector('[aria-label="More actions"]')!
        .dispatchEvent(new MouseEvent("mousedown", { bubbles: true })),
    );
  const select = (label: string) =>
    act(async () =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu a"))
        .find((option) => option.textContent === label)!
        .click(),
    );

  it("shows mapped occurrence details as text without rendering their markup", async () => {
    fcEvent.event.extendedProps.location = "  Custom venue  ";
    fcEvent.event.extendedProps.description = "Bring <strong>comfortable shoes</strong>.";
    await show();

    expect(container.querySelector(".event-location")?.textContent).toBe("Custom venue");
    expect(container.querySelector(".event-description")?.textContent).toBe(
      "Bring <strong>comfortable shoes</strong>.",
    );
    expect(container.querySelector(".event-description strong")).toBeNull();
    expect(
      Array.from(container.querySelectorAll(".event-details dt"), (label) => label.textContent),
    ).toEqual(["Location", "Description"]);
  });

  it("omits missing or empty details and can show either field on its own", async () => {
    await show();
    expect(container.querySelector(".event-details")).toBeNull();

    fcEvent.event.extendedProps.location = " \n ";
    fcEvent.event.extendedProps.description = "Only a description";
    await show();
    expect(container.querySelector(".event-location")).toBeNull();
    expect(container.querySelector(".event-description")?.textContent).toBe("Only a description");

    fcEvent.event.extendedProps.location = "Only a location";
    fcEvent.event.extendedProps.description = null;
    await show();
    expect(container.querySelector(".event-location")?.textContent).toBe("Only a location");
    expect(container.querySelector(".event-description")).toBeNull();
  });

  it("shows the disabled notice alongside occurrence status only for disabled events", async () => {
    await show();
    expect(container.textContent).not.toContain("This event is disabled.");

    fcEvent.event.extendedProps.enabled = true;
    await show();
    expect(container.textContent).not.toContain("This event is disabled.");

    fcEvent.event.extendedProps.enabled = false;
    fcEvent.event.extendedProps.cancelled = true;
    await show();
    expect(container.querySelector(".occurrence-status.is-disabled")?.textContent).toBe(
      "This event is disabled.",
    );
    expect(container.querySelector(".occurrence-status.is-cancelled")?.textContent).toBe(
      "This occurrence is cancelled.",
    );
  });

  it("keeps Edit visible and routes occurrence actions from the native menu", async () => {
    await show();
    const edit = container.querySelector<HTMLAnchorElement>("a.submit")!;
    expect(edit.textContent).toBe("Edit Event");
    expect(edit.getAttribute("href")).toBe(fcEvent.event.url);
    expect(container.textContent).not.toContain("Edit occurrence");

    await openMenu();
    expect(
      Array.from(document.querySelectorAll(".menu a")).map((option) => option.textContent),
    ).toEqual([
      "Duplicate Event",
      "Edit occurrence",
      "Edit this and following occurrences",
      "Cancel occurrence",
      "Delete",
    ]);
    await select("Edit occurrence");
    expect(openOccurrenceEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        eventId: 42,
        recurrenceId: "2026-10-13T14:00:00",
        siteId: 2,
      }),
    );
    expect(document.querySelector(".menu")).toBeNull();
  });

  it("uses Craft SVG menu icons with decorative markup and a red delete action", async () => {
    await show();
    await openMenu();
    const options = Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu a"));
    expect(
      options.map((option) => option.querySelector("svg")?.getAttribute("data-craft-icon")),
    ).toEqual(["clone-dashed", "pencil", "calendar-pen", "ban", "trash"]);
    expect(options.every((option) => option.classList.contains("menu-item"))).toBe(true);
    expect(
      options.every(
        (option) => option.querySelector(".icon")?.getAttribute("aria-hidden") === "true",
      ),
    ).toBe(true);
    expect(options[0].querySelector(".icon")?.classList.contains("fuchsia")).toBe(true);
    expect(options.at(-1)?.classList.contains("error")).toBe(true);
    expect(options[0].querySelector(".menu-item-label")?.textContent).toBe("Duplicate Event");
    await select("Cancel occurrence");
    expect(setOccurrenceCancelled).toHaveBeenCalledWith(
      expect.objectContaining({ cancelled: true }),
    );
    fcEvent.event.extendedProps.cancelled = true;
    await show();
    await openMenu();
    const restore = Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu a")).find(
      (option) => option.textContent === "Restore occurrence",
    )!;
    expect(restore.querySelector("svg")?.getAttribute("data-craft-icon")).toBe("rotate-left");
    await act(async () =>
      restore
        .querySelector<SVGElement>("svg")!
        .dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );
    expect(setOccurrenceCancelled).toHaveBeenLastCalledWith(
      expect.objectContaining({ cancelled: false }),
    );
  });

  it("keeps a hover popup open while interacting with its detached menu and dismisses in stages", async () => {
    vi.useFakeTimers();
    await show();
    await act(async () => container.dispatchEvent(new MouseEvent("mouseleave")));
    await openMenu();
    const menu = document.querySelector(".menu");
    await act(async () => window.dispatchEvent(new Event("resize")));
    expect(document.querySelector(".menu")).toBe(menu);
    await act(async () => vi.advanceTimersByTime(400));
    expect(container.textContent).toContain("Sample event");

    await act(async () =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })),
    );
    expect(document.querySelector(".menu")).toBeNull();
    expect(container.textContent).toContain("Sample event");
    expect(document.activeElement?.getAttribute("aria-label")).toBe("More actions");
    await act(async () =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })),
    );
    expect(container.textContent).not.toContain("Sample event");
  });

  it("duplicates the event from the menu and allows retry after failure", async () => {
    await show();
    await openMenu();
    await select("Duplicate Event");
    expect(duplicateEvent).toHaveBeenCalledWith(fcEvent.event, 2);
    expect(
      container.querySelector<HTMLButtonElement>('[aria-label="More actions"]')?.disabled,
    ).toBe(false);
    await openMenu();
    await select("Duplicate Event");
    expect(duplicateEvent).toHaveBeenCalledTimes(2);
  });

  it("restores cancelled occurrences and retains the recurring delete scope prompt", async () => {
    fcEvent.event.extendedProps.cancelled = true;
    await show();
    await openMenu();
    await select("Restore occurrence");
    expect(setOccurrenceCancelled).toHaveBeenCalledWith(
      expect.objectContaining({ cancelled: false, siteId: 2 }),
    );

    await show();
    await openMenu();
    await select("Delete");
    expect(container.textContent).toContain("Which occurrences do you want to delete?");
    expect(deleteEvent).not.toHaveBeenCalled();
    expect(document.querySelector(".menu")).toBeNull();
  });

  it("offers Duplicate and Delete for a single event, keeps its confirmation, and closes from the corner X", async () => {
    fcEvent.event.extendedProps.rrule = null;
    const confirm = vi
      .spyOn(window, "confirm")
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    await show();
    await openMenu();
    expect(document.querySelectorAll(".menu a")).toHaveLength(2);
    await select("Delete");
    expect(deleteEvent).not.toHaveBeenCalled();
    await openMenu();
    await select("Delete");
    expect(deleteEvent).toHaveBeenCalledWith(
      expect.objectContaining({ scope: "series", siteId: 2 }),
    );
    expect(confirm).toHaveBeenCalledWith("Are you sure you want to delete this event?");
    confirm.mockRestore();

    await show();
    await act(async () =>
      container.querySelector<HTMLButtonElement>('[aria-label="Close"]')!.click(),
    );
    expect(container.textContent).not.toContain("Sample event");
  });
});
