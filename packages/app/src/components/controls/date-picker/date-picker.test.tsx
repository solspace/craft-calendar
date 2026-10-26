// @vitest-environment jsdom

import { getDateLocale } from "@cal/utils/localization";
import { act } from "react";
import type { DatePickerProps } from "react-datepicker";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";

describe("date picker in scrolling forms", () => {
  let container: HTMLDivElement;
  let root: Root;
  const change = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    container.style.overflow = "auto";
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  const open = async (portal: boolean, datePickerProps: Omit<DatePickerProps, "onChange"> = {}) => {
    await act(async () => {
      root.render(
        <DatePicker
          id="test-start"
          label="Starts"
          value={Date.UTC(2026, 10, 5) / 1000}
          portal={portal}
          onChange={change}
          datePickerProps={datePickerProps}
        />,
      );
    });
    await act(async () => container.querySelector("input")!.click());
  };

  it("opens outside the scroll region, selects a date, and removes its portal when closed", async () => {
    await open(true);
    expect(container.querySelector(".react-datepicker")).toBeNull();
    expect(document.body.querySelector(".react-datepicker")).not.toBeNull();
    await act(async () =>
      (
        document.body.querySelector(
          ".react-datepicker__day--006:not(.react-datepicker__day--outside-month)",
        ) as HTMLElement
      ).click(),
    );
    expect(change).toHaveBeenCalledWith(Date.UTC(2026, 10, 6) / 1000);
    expect(document.body.querySelector(".react-datepicker")).toBeNull();
    expect(document.body.children).toHaveLength(1);
  });

  it("keeps other date pickers inline unless portal rendering is requested", async () => {
    await open(false);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
    expect(document.body.children).toHaveLength(1);
  });

  it("cleans up an open date picker when the form is dismissed", async () => {
    await open(true);
    await act(async () => root.render(null));
    expect(document.body.querySelector(".react-datepicker")).toBeNull();
    expect(document.body.children).toHaveLength(1);
  });

  const dropdowns = {
    showMonthDropdown: true,
    showYearDropdown: true,
    dropdownMode: "select" as const,
  };
  const click = async (selector: string) =>
    act(async () => document.querySelector<HTMLButtonElement>(selector)!.click());
  const search = async (query: string) =>
    act(async () => {
      const input = document.querySelector<HTMLInputElement>(".calendar-picker-menu input")!;
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, query);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  const key = async (key: string) =>
    act(async () => {
      document.activeElement!.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    });

  const keyUp = async (key: string) =>
    act(async () => {
      document.activeElement!.dispatchEvent(new KeyboardEvent("keyup", { key, bubbles: true }));
    });

  it("searches month and year menus without changing the date until a day is selected", async () => {
    await open(true, dropdowns);
    expect(document.querySelector(".react-datepicker select")).toBeNull();
    await click(".calendar-picker-year > button");
    expect(document.activeElement?.getAttribute("role")).toBe("combobox");
    expect(document.activeElement?.getAttribute("aria-activedescendant")).toContain("2026");
    await search("2032");
    expect(document.querySelectorAll('.calendar-picker-options [role="option"]')).toHaveLength(1);
    await key("Enter");
    expect(document.querySelector(".calendar-picker-year > button")?.textContent).toBe("2032");
    await click(".calendar-picker-month > button");
    await search("dec");
    await key("Enter");
    expect(document.querySelector(".calendar-picker-month > button")?.textContent).toBe("December");
    expect(change).not.toHaveBeenCalled();
    await click(".react-datepicker__day--006:not(.react-datepicker__day--outside-month)");
    expect(change).toHaveBeenCalledWith(Date.UTC(2032, 11, 6) / 1000);
  });

  it("keeps Escape inside the dropdown and supports keyboard selection and empty searches", async () => {
    await open(true, dropdowns);
    const escaped = vi.fn();
    document.body.addEventListener("keydown", escaped);
    document.body.addEventListener("keyup", escaped);
    try {
      await click(".calendar-picker-year > button");
      await search("no year");
      expect(document.querySelector('[role="status"]')?.textContent).toBe("No matches found.");
      await key("Enter");
      expect(document.querySelector(".calendar-picker-menu")).not.toBeNull();
      await key("Escape");
      // A containing Craft slideout may reclaim focus from the portalled menu.
      const slideoutFocus = document.createElement("button");
      document.body.append(slideoutFocus);
      slideoutFocus.focus();
      await keyUp("Escape");
      slideoutFocus.remove();
      expect(escaped).not.toHaveBeenCalled();
      expect(document.querySelector(".react-datepicker")).not.toBeNull();
      document.querySelector<HTMLButtonElement>(".calendar-picker-year > button")!.focus();
      expect(document.activeElement).toBe(document.querySelector(".calendar-picker-year > button"));
      await key("ArrowDown");
      await key("ArrowDown");
      await key("Enter");
      expect(document.querySelector(".calendar-picker-year > button")?.textContent).toBe("2027");
    } finally {
      document.body.removeEventListener("keydown", escaped);
      document.body.removeEventListener("keyup", escaped);
    }
  });

  it("respects date bounds when switching years and searches localized month names", async () => {
    await open(true, {
      ...dropdowns,
      minDate: new Date(2026, 10, 5),
      maxDate: new Date(2027, 1, 20),
      locale: getDateLocale("fr"),
    });
    await click(".calendar-picker-year > button");
    expect(
      Array.from(document.querySelectorAll('.calendar-picker-options [role="option"]'), (n) =>
        n.getAttribute("data-value"),
      ),
    ).toEqual(["2026", "2027"]);
    await click('.calendar-picker-options [data-value="2027"]');
    expect(document.querySelector(".calendar-picker-month > button")?.textContent).toBe("février");
    await click(".calendar-picker-month > button");
    expect(
      document.querySelector<HTMLButtonElement>('.calendar-picker-options [data-value="2"]')
        ?.disabled,
    ).toBe(true);
    await search("fev");
    expect(document.querySelectorAll('.calendar-picker-options [role="option"]')).toHaveLength(1);
    expect(
      document.querySelector('.calendar-picker-options [role="option"]')?.textContent,
    ).toContain("février");
  });

  it("lets Escape close the picker before Craft can close its containing slideout", async () => {
    const escaped = vi.fn();
    const closed = vi.fn();
    await open(true, { ...dropdowns, onCalendarClose: closed });
    document.body.addEventListener("keyup", escaped);
    try {
      container.querySelector("input")!.focus();
      await key("Escape");
      await keyUp("Escape");
      expect(document.querySelector(".react-datepicker")).toBeNull();
      expect(closed).toHaveBeenCalledOnce();
      expect(escaped).not.toHaveBeenCalled();
      await key("Escape");
      await keyUp("Escape");
      expect(escaped).toHaveBeenCalledOnce();
    } finally {
      document.body.removeEventListener("keyup", escaped);
    }
  });
});
