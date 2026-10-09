// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mountCalendarTransferSelect, updateMappingWarnings } from "./calendar-transfer";
import { findElementEditor, getDraftEventId } from "./occurrence-editor";

vi.mock("./occurrence-editor", () => ({ findElementEditor: vi.fn(), getDraftEventId: vi.fn() }));

describe("calendar transfer review", () => {
  beforeEach(() => {
    vi.stubGlobal("Craft", { t: (_category: string, message: string) => message });
    document.body.innerHTML = "";
  });

  const panel = (): HTMLElement => {
    const container = document.createElement("div");
    container.dataset.populated = JSON.stringify({
      location: "Location",
      description: "<b>Description</b>",
    });
    container.innerHTML = `<select data-field-mapping><option value="">Empty</option><option value="location" selected>Location</option><option value="description">Description</option></select>
      <select data-field-mapping><option value="" selected>Empty</option><option value="location">Location</option><option value="description">Description</option></select>
      <div data-unmapped-warning><ul data-unmapped-fields></ul></div><p data-mapping-error></p>`;
    document.body.append(container);
    return container;
  };

  it("lists populated fields omitted by the current mapping without rendering their labels as HTML", () => {
    const container = panel();
    updateMappingWarnings(container);
    expect(container.querySelector("[data-unmapped-warning]")?.hasAttribute("hidden")).toBe(false);
    expect(container.querySelector("li")?.textContent).toBe("<b>Description</b>");
    expect(container.querySelector("li b")).toBeNull();
  });

  it("clears the loss warning after every populated source is mapped", () => {
    const container = panel();
    container.querySelectorAll("select")[1].value = "description";
    updateMappingWarnings(container);
    expect(container.querySelector("[data-unmapped-warning]")?.hasAttribute("hidden")).toBe(true);
    expect(container.querySelectorAll("li")).toHaveLength(0);
  });

  it("blocks duplicate source mappings and clears the error when corrected", () => {
    const container = panel();
    const selects = container.querySelectorAll("select");
    selects[1].value = "location";
    updateMappingWarnings(container);
    expect(selects[1].checkValidity()).toBe(false);
    expect(container.querySelector("[data-mapping-error]")?.hasAttribute("hidden")).toBe(false);
    selects[1].value = "description";
    updateMappingWarnings(container);
    expect(selects[1].checkValidity()).toBe(true);
    expect(container.querySelector("[data-mapping-error]")?.hasAttribute("hidden")).toBe(true);
  });
});

describe("calendar selector", () => {
  it("saves pending edits into a draft and restores the parent selector while mapping is reviewed", async () => {
    const container = document.createElement("div");
    container.dataset.calendarId = "1";
    container.dataset.siteId = "2";
    container.innerHTML =
      '<button class="menubtn"><span class="inline-flex">Original</span></button><button data-value="1"></button><button data-value="3"></button>';
    let onChange: (() => Promise<void>) | undefined;
    let selected = 1;
    const jQuery = vi.fn(() => ({
      on: (_name: string, callback: () => Promise<void>) => {
        onChange = callback;
      },
      data: (_name: string, value?: number) => {
        if (value !== undefined) selected = value;
        return selected;
      },
    }));
    (window as typeof window & { jQuery?: JQueryStatic }).jQuery =
      jQuery as unknown as JQueryStatic;
    const pause = vi.fn();
    const resume = vi.fn();
    vi.mocked(findElementEditor).mockReturnValue({
      pause,
      resume,
    } as unknown as Craft.ElementEditor);
    vi.mocked(getDraftEventId).mockResolvedValue(42);
    const handlers: Record<string, () => void> = {};
    const open = vi.fn();
    class Slideout {
      constructor(action: string, settings: unknown) {
        open(action, settings);
      }
      on(name: string, callback: () => void) {
        handlers[name] = callback;
      }
    }
    vi.stubGlobal("Craft", {
      CpScreenSlideout: Slideout,
      cp: { displayError: vi.fn() },
      t: (_category: string, message: string) => message,
    });
    mountCalendarTransferSelect(container);
    selected = 3;
    container.querySelector(".inline-flex")!.textContent = "Destination";
    await onChange?.();
    expect(getDraftEventId).toHaveBeenCalledWith(container);
    expect(selected).toBe(1);
    expect(container.querySelector(".inline-flex")?.textContent).toBe("Original");
    expect(open).toHaveBeenCalledWith("calendar/event-calendar/edit", {
      params: { eventId: 42, siteId: 2, targetCalendarId: 3 },
    });
    expect(pause).toHaveBeenCalledOnce();
    expect(container.querySelector("button")?.disabled).toBe(true);
    handlers.close();
    expect(resume).toHaveBeenCalledOnce();
    expect(container.querySelector("button")?.disabled).toBe(false);
    delete (window as typeof window & { jQuery?: JQueryStatic }).jQuery;
  });
});
