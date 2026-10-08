// @vitest-environment jsdom
import type { DateFormats } from "@cal/types/config";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createEventBuilderStore } from "../store/store";
import { Editor } from "./editor";

describe("event editor date formats", () => {
  afterEach(() => vi.unstubAllGlobals());

  it.each([
    ["yyyy-MM-dd", "2026-09-16"],
    ["dd/MM/yyyy", "16/09/2026"],
    ["MM/dd/yyyy", "09/16/2026"],
  ])("uses the formatting locale's %s pattern with an English interface", async (pattern, date) => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    const formats = {
      date: { short: { icu: pattern } },
      datetime: { short: { icu: `${pattern} HH:mm` } },
      time: { short: { icu: "HH:mm" } },
    } as DateFormats;
    const start = Date.UTC(2026, 8, 16, 14) / 1000;
    const store = createEventBuilderStore({
      app: { pro: true, formats },
      event: {
        start,
        end: start + 3600,
        until: start,
        allDay: false,
        repeatType: "DAILY",
        repeatEndType: "ON_DATE",
        rrule: "DTSTART:20260916T140000Z\nRRULE:FREQ=DAILY;UNTIL=20260916T140000Z",
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    try {
      await act(async () => {
        root.render(
          <Provider store={store}>
            <Editor />
          </Provider>,
        );
      });

      expect(
        Array.from(
          container.querySelectorAll<HTMLInputElement>("input.text"),
          (input) => input.value,
        ),
      ).toEqual([`${date} 14:00`, `${date} 15:00`, date]);
      expect(container.textContent).toContain(`ending on ${date}.`);
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }
  });
});
