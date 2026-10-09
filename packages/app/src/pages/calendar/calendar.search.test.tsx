// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { changeCalendarUrl } from "./calendar.custom-buttons";
import { CalendarSearch, getCalendarSearch } from "./calendar.search";

describe("calendar search", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Craft", {
      t: (_category: string, message: string) => message,
      getCpUrl: (path: string) => `/admin/${path}`,
    });
    history.replaceState(null, "", "/admin/calendar/overview");
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  const type = (value: string) => {
    const input = container.querySelector("input") as HTMLInputElement;
    act(() => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  it("waits until typing pauses before searching", () => {
    const onSearchChange = vi.fn();
    act(() => root.render(<CalendarSearch initialSearch="" onSearchChange={onSearchChange} />));
    type("meeting");
    act(() => vi.advanceTimersByTime(200));
    type("meeting room");
    act(() => vi.advanceTimersByTime(200));
    expect(onSearchChange).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(50));
    expect(onSearchChange).toHaveBeenCalledExactlyOnceWith("meeting room");
  });

  it("clears immediately with Escape and cancels a pending search", () => {
    const onSearchChange = vi.fn();
    act(() =>
      root.render(<CalendarSearch initialSearch="meeting" onSearchChange={onSearchChange} />),
    );
    act(() => {
      container
        .querySelector("input")
        ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(onSearchChange).toHaveBeenCalledWith("");
    expect(container.querySelector("input")?.value).toBe("");
    act(() => vi.advanceTimersByTime(300));
    expect(onSearchChange).not.toHaveBeenCalledWith("meeting");
  });

  it("restores search from the URL and retains it while navigating dates", () => {
    history.replaceState(null, "", "/admin/calendar/overview?search=room%20two&site=2");
    expect(getCalendarSearch()).toBe("room two");
    changeCalendarUrl(new Date("2026-11-10T00:00:00Z"));
    expect(window.location.pathname).toBe("/admin/calendar/2026/11/10");
    expect(getCalendarSearch()).toBe("room two");
    expect(new URL(window.location.href).searchParams.get("site")).toBe("2");
  });
});
