// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

// The slideout is a native Craft script, so exercise its handlers with DOM-backed collections.
class Elements {
  constructor(readonly nodes: HTMLElement[]) {}

  find(selector: string): Elements {
    return new Elements(
      this.nodes.flatMap((node) => Array.from(node.querySelectorAll<HTMLElement>(selector))),
    );
  }

  hasClass(name: string): boolean {
    return this.nodes.some((node) => node.classList.contains(name));
  }

  toggleClass(name: string, on: boolean): Elements {
    for (const node of this.nodes) node.classList.toggle(name, on);
    return this;
  }

  prop(name: string, value: boolean): Elements {
    expect(name).toBe("disabled");
    for (const node of this.nodes) (node as HTMLFieldSetElement).disabled = value;
    return this;
  }
}

const script = readFileSync(
  resolve(import.meta.dirname, "../../../../plugin/src/Resources/js/occurrence-editor.js"),
  "utf8",
);

const setup = (overridden = false, allDay = false) => {
  const form = document.createElement("form");
  form.innerHTML = `
    <div class="calendar-occurrence-own-times">
      <button type="button" class="lightswitch ${overridden ? "on" : ""}"></button>
    </div>
    <fieldset class="calendar-occurrence-times ${allDay ? "is-all-day" : ""}">
      <input name="startDate[date]" value="2026-11-11">
      <div class="calendar-occurrence-all-day">
        <button type="button" class="lightswitch ${allDay ? "on" : ""}"></button>
        <input name="allDay" value="${allDay ? "1" : ""}">
      </div>
    </fieldset>
    <fieldset class="calendar-occurrence-inherited-times is-all-day" disabled>
      <input name="inheritedTimes[startDate]" value="2026-10-02" disabled>
      <div class="calendar-occurrence-all-day">
        <button type="button" class="lightswitch on" disabled></button>
      </div>
    </fieldset>`;
  const $container = new Elements([form]);
  const listeners = new Map<HTMLElement, () => void>();
  const methods = runInNewContext(`${script}\nCraft.Calendar.OccurrenceEditor;`, {
    Craft: {},
    Garnish: { Base: { extend: (value: unknown) => value }, $win: { trigger: vi.fn() } },
  });
  methods.initTimes.call({
    $container,
    addListener: (target: Elements, _event: string, handler: () => void) => {
      for (const node of target.nodes) listeners.set(node, handler);
    },
  });
  const own = form.querySelector<HTMLFieldSetElement>(".calendar-occurrence-times")!;
  const inherited = form.querySelector<HTMLFieldSetElement>(
    ".calendar-occurrence-inherited-times",
  )!;
  const change = (selector: string, on: boolean) => {
    const toggle = form.querySelector<HTMLElement>(selector)!;
    toggle.classList.toggle("on", on);
    listeners.get(toggle)!();
  };
  return { form, own, inherited, change };
};

describe("occurrence slideout dates", () => {
  it("shows inherited dates until overridden and preserves edits when toggled off and back on", () => {
    const { form, own, inherited, change } = setup();
    expect(own.disabled).toBe(true);
    expect(own.classList.contains("hidden")).toBe(true);
    expect(inherited.classList.contains("hidden")).toBe(false);
    expect(new FormData(form).has("startDate[date]")).toBe(false);

    change(".calendar-occurrence-own-times .lightswitch", true);
    const start = own.querySelector<HTMLInputElement>("input")!;
    start.value = "2026-11-13";
    expect(own.disabled).toBe(false);
    expect(inherited.classList.contains("hidden")).toBe(true);
    expect(new FormData(form).get("startDate[date]")).toBe("2026-11-13");
    expect(new FormData(form).has("inheritedTimes[startDate]")).toBe(false);

    change(".calendar-occurrence-own-times .lightswitch", false);
    expect(inherited.classList.contains("hidden")).toBe(false);
    expect(inherited.querySelector<HTMLInputElement>("input")?.value).toBe("2026-10-02");
    expect(new FormData(form).has("startDate[date]")).toBe(false);

    change(".calendar-occurrence-own-times .lightswitch", true);
    expect(start.value).toBe("2026-11-13");
  });

  it("uses the editable All Day toggle independently of the inherited schedule", () => {
    const { own, inherited, change } = setup(true, true);
    expect(own.disabled).toBe(false);
    expect(own.classList.contains("hidden")).toBe(false);
    expect(own.classList.contains("is-all-day")).toBe(true);
    expect(inherited.disabled).toBe(true);

    change(".calendar-occurrence-times .lightswitch", false);
    expect(own.classList.contains("is-all-day")).toBe(false);
    expect(inherited.classList.contains("is-all-day")).toBe(true);
    change(".calendar-occurrence-times .lightswitch", true);
    expect(own.classList.contains("is-all-day")).toBe(true);
  });
});
