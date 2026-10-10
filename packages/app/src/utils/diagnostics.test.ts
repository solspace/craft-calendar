// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const source = readFileSync(
  resolve(import.meta.dirname, "../../../plugin/src/Resources/js/diagnostics.js"),
  "utf8",
);
const setup = (clipboard?: { writeText: (text: string) => Promise<void> }) => {
  document.documentElement.lang = "de-DE";
  document.body.innerHTML = `
    <button id="calendar-copy-diagnostics">Copy Support Report</button>
    <div id="calendar-diagnostics">
      <dl>${["timezone", "offset", "clock", "language", "dst"]
        .map(
          (key) =>
            `<dt>${key}</dt><dd>${key === "language" ? `<code data-browser-value="${key}"></code>` : `<span data-browser-value="${key}"></span>`}</dd>`,
        )
        .join("")}</dl>
      <details class="calendar-diag-report"><textarea id="calendar-diagnostic-report">Server report</textarea></details>
      <p id="calendar-diagnostic-copy-status"></p>
    </div>`;
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: clipboard });
  vi.stubGlobal("Craft", {
    t: (_category: string, message: string, params: Record<string, string> = {}) =>
      Object.entries(params).reduce(
        (text, [key, value]) => text.replace(`{${key}}`, value),
        message,
      ),
  });
  // Execute the actual CP asset, including its DOM and clipboard behavior.
  new Function(source)();
};

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("Calendar diagnostic report", () => {
  it("includes browser timezone, fractional UTC offsets, and seasonal offsets", () => {
    vi.spyOn(Date.prototype, "getTimezoneOffset").mockReturnValue(-345);
    setup();
    expect(document.querySelector('[data-browser-value="offset"]')?.textContent).toBe("UTC+05:45");
    expect(document.querySelector('[data-browser-value="dst"]')?.textContent).toBe(
      "January: UTC+05:45; July: UTC+05:45",
    );
    const report = document.querySelector<HTMLTextAreaElement>("textarea")?.value;
    expect(report).toContain("Server report\n\nUser / Browser");
    expect(report).toContain(`timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
  });

  it("copies the complete report", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setup({ writeText });
    document.querySelector<HTMLButtonElement>("button")?.click();
    await Promise.resolve();
    expect(document.getElementById("calendar-diagnostic-copy-status")?.textContent).toBe(
      "Diagnostic report copied.",
    );
    expect(writeText).toHaveBeenCalledWith(document.querySelector("textarea")?.value);
    expect(document.querySelector("button")?.textContent).toBe("Copied!");
    await vi.advanceTimersByTimeAsync(3000);
    expect(document.querySelector("button")?.textContent).toBe("Copy Support Report");
  });

  it.each([
    undefined,
    { writeText: () => Promise.reject(new Error("denied")) },
  ])("offers keyboard copying when clipboard access is unavailable", async (clipboard) => {
    setup(clipboard);
    document.querySelector<HTMLButtonElement>("button")?.click();
    await vi.waitFor(() => expect(document.querySelector("details")?.open).toBe(true));
    const report = document.querySelector("textarea");
    expect(document.activeElement).toBe(report);
    expect(report?.selectionEnd).toBe(report?.value.length);
    expect(document.getElementById("calendar-diagnostic-copy-status")?.textContent).toBe(
      "Copy the selected report using your keyboard.",
    );
  });

  it("keeps the report available if browser timezone detection fails", () => {
    vi.spyOn(Intl, "DateTimeFormat").mockImplementation(() => {
      throw new Error("unavailable");
    });
    setup();
    expect(document.querySelector('[data-browser-value="timezone"]')?.textContent).toBe(
      "Unavailable",
    );
    expect(document.querySelector("textarea")?.value).toContain("Server report");
  });
});
