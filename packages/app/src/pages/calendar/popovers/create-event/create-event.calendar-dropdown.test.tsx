// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CalendarDropdown } from "./create-event.calendar-dropdown";

// Craft owns keyboard navigation and positioning; model its detached menu lifecycle here.
class MenuButton {
  showingMenu = false;
  element: HTMLElement;

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
    document.body.append(this.element);
    this.showingMenu = true;
  };

  hideMenu = () => {
    this.element.remove();
    this.showingMenu = false;
  };

  destroy = () => this.button.removeEventListener("mousedown", this.showMenu);
}

describe("quick-create calendar selector", () => {
  let container: HTMLDivElement;
  let root: Root;
  const options = [
    { value: 1, label: "Default", color: "#ff0000" },
    { value: 2, label: "Another Calendar", color: "#00aa00" },
  ];

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Garnish", { MenuBtn: MenuButton });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  const openMenu = () =>
    act(async () => container.querySelector("button")!.dispatchEvent(new MouseEvent("mousedown")));

  it("shows color dots in the selected calendar and menu, and preserves an open menu on rerender", async () => {
    const onChange = vi.fn();
    await act(async () =>
      root.render(<CalendarDropdown options={options} value={1} onChange={onChange} />),
    );
    expect(container.querySelector<HTMLElement>(".color-indicator")!.style.backgroundColor).toBe(
      "rgb(255, 0, 0)",
    );
    await openMenu();
    const menu = document.querySelector(".menu")!;
    expect(menu.querySelectorAll(".color-indicator")).toHaveLength(2);
    expect(menu.querySelector('[data-calendar-id="1"]')!.getAttribute("aria-selected")).toBe(
      "true",
    );
    await act(async () =>
      root.render(<CalendarDropdown options={[...options]} value={1} onChange={onChange} />),
    );
    expect(document.querySelector(".menu")).toBe(menu);
    await act(async () => menu.querySelector<HTMLAnchorElement>('[data-calendar-id="2"]')!.click());
    expect(onChange).toHaveBeenCalledWith(2);
    expect(document.querySelector(".menu")).toBeNull();
    expect(document.activeElement).toBe(container.querySelector("button"));
    await act(async () =>
      root.render(<CalendarDropdown options={options} value={2} onChange={onChange} />),
    );
    expect(container.textContent).toContain("Another Calendar");
    expect(container.querySelector<HTMLElement>(".color-indicator")!.style.backgroundColor).toBe(
      "rgb(0, 170, 0)",
    );
    await openMenu();
    expect(document.querySelector('[data-calendar-id="2"]')!.getAttribute("aria-selected")).toBe(
      "true",
    );
    await act(async () => root.unmount());
    expect(document.querySelector(".menu")).toBeNull();
    root = createRoot(container);
  });

  it("closes the menu with Escape before allowing Escape to cancel the event", async () => {
    const cancel = vi.fn();
    window.addEventListener("keydown", cancel);
    try {
      await act(async () =>
        root.render(<CalendarDropdown options={options} value={1} onChange={vi.fn()} />),
      );
      await openMenu();
      await act(async () =>
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })),
      );
      expect(document.querySelector(".menu")).toBeNull();
      expect(cancel).not.toHaveBeenCalled();
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      expect(cancel).toHaveBeenCalledOnce();
    } finally {
      window.removeEventListener("keydown", cancel);
    }
  });
});
