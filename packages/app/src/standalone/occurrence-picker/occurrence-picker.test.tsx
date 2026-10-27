// @vitest-environment jsdom
import type { DateFormats } from "@cal/types/config";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OccurrencePicker, type OccurrencePickerConfig } from "./occurrence-picker";

const formats = Object.fromEntries(
  ["date", "time", "datetime"].map((type) => [
    type,
    Object.fromEntries(
      ["short", "medium", "long", "full"].map((length) => [
        length,
        {
          php: "",
          js: {},
          icu: type === "date" ? "yyyy-MM-dd" : type === "time" ? "HH:mm" : "yyyy-MM-dd HH:mm",
        },
      ]),
    ),
  ]),
) as DateFormats;

const config: OccurrencePickerConfig = {
  value: "2026-11-05T20:00:00",
  startValue: "2026-11-05T20:00:00",
  kind: "startDate",
  readOnly: false,
  formats,
  weekStartDay: 0,
  timeInterval: 30,
};

describe("shared occurrence date picker", () => {
  let form: HTMLFormElement;
  let fieldset: HTMLFieldSetElement;
  let host: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    vi.stubEnv("TZ", "America/Winnipeg");
    form = document.createElement("form");
    form.innerHTML = `<fieldset><div class="field">
      <div class="heading"><legend id="original-label">Start</legend></div>
      <div class="input"><div class="datetimewrapper">
        <div class="datewrapper"><input id="original-date" name="ns[startDate][date]" value="2026-11-05"></div>
        <div class="timewrapper"><input name="ns[startDate][time]" value="8:00 pm"></div>
        <input type="hidden" name="ns[startDate][timezone]" value="America/Winnipeg">
        <input type="hidden" name="ns[startDate][locale]" value="en-CA">
      </div><div data-picker-root></div></div></div></fieldset>`;
    document.body.append(form);
    fieldset = form.querySelector("fieldset")!;
    host = form.querySelector(".field")!;
    host.setAttribute("aria-labelledby", "original-label");
    root = createRoot(host.querySelector("[data-picker-root]")!);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    form.remove();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });
  const render = async (value = config) =>
    act(async () => root.render(<OccurrencePicker host={host} config={value} />));
  const open = async () =>
    act(async () => host.querySelector<HTMLButtonElement>("[data-picker-root] input")!.click());

  it("posts the chosen floating wall time through Craft's original namespaced controls", async () => {
    await render();
    expect(host.querySelector<HTMLElement>(".datetimewrapper")?.hidden).toBe(true);
    expect(
      host
        .querySelector<HTMLInputElement>("[data-picker-root] input")
        ?.getAttribute("aria-labelledby"),
    ).toBe("original-label");
    const change = vi.fn();
    host.addEventListener("change", change);
    await open();
    await act(async () =>
      document
        .querySelector<HTMLButtonElement>(
          ".react-datepicker__day--006:not(.react-datepicker__day--outside-month)",
        )!
        .click(),
    );
    const data = new FormData(form);
    expect(data.get("ns[startDate][date]")).toBe("2026-11-06");
    expect(data.get("ns[startDate][time]")).toBe("20:00:00");
    expect(data.get("ns[startDate][timezone]")).toBe("America/Winnipeg");
    expect(data.get("ns[startDate][locale]")).toBe("en-CA");
    expect(change).toHaveBeenCalledTimes(2);
    expect(data.getAll("ns[startDate][date]")).toHaveLength(1);
  });

  it("follows Override and All Day changes without losing the original form's values", async () => {
    await render();
    await act(async () => {
      fieldset.disabled = true;
    });
    expect(host.querySelector<HTMLInputElement>("[data-picker-root] input")?.disabled).toBe(true);
    expect(new FormData(form).has("ns[startDate][date]")).toBe(false);
    await act(async () => {
      fieldset.disabled = false;
      fieldset.classList.add("is-all-day");
    });
    expect(host.querySelector<HTMLInputElement>("[data-picker-root] input")?.disabled).toBe(false);
    expect(host.querySelector<HTMLInputElement>("[data-picker-root] input")?.value).toBe(
      "2026-11-05",
    );
    await open();
    expect(document.querySelector(".react-datepicker__time-container")).toBeNull();
    expect(new FormData(form).get("ns[startDate][time]")).toBe("8:00 pm");
  });

  it("keeps inherited dates read-only and cleans up a portalled picker on dismissal", async () => {
    await render({ ...config, readOnly: true });
    expect(host.querySelector<HTMLInputElement>("[data-picker-root] input")?.disabled).toBe(true);
    await render();
    await open();
    expect(document.querySelector(".react-datepicker")).not.toBeNull();
    await act(async () => root.render(null));
    expect(document.querySelector(".react-datepicker")).toBeNull();
    expect(host.querySelector<HTMLElement>(".datetimewrapper")?.hidden).toBe(false);
    expect(host.querySelector("legend")?.id).toBe("original-label");
  });
});
