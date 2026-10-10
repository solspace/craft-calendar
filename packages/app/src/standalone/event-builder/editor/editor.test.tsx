// @vitest-environment jsdom
import { openOccurrenceEditor } from "@cal/pages/calendar/calendar.events";
import type { DateFormats } from "@cal/types/config";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { findElementEditor, getDraftEventId } from "../occurrence-editor";
import { createEventBuilderStore } from "../store/store";
import { Editor } from "./editor";

vi.mock("@cal/pages/calendar/calendar.events", () => ({ openOccurrenceEditor: vi.fn() }));
vi.mock("../occurrence-editor", () => ({ findElementEditor: vi.fn(), getDraftEventId: vi.fn() }));

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

  it("refreshes the occurrence list after a preview edit is saved to the draft", async () => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Craft", {
      getActionUrl: (action: string) => `/${action}`,
      t: (_category: string, message: string) => message,
    });
    const editor = { settings: { elementId: 12 } } as Craft.ElementEditor;
    vi.mocked(findElementEditor).mockReturnValue(editor);
    vi.mocked(getDraftEventId).mockImplementation(async () => {
      editor.settings.elementId = 34;
      return 34;
    });
    const now = new Date();
    const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 14) / 1000;
    const stamp = new Date(start * 1000).toISOString().replace(/[-:]/g, "").slice(0, 15);
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ occurrences: [] as unknown[] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          occurrences: [
            {
              recurrenceId: new Date(start * 1000).toISOString().slice(0, 19).replace("T", " "),
              start,
              end: start + 3600,
              allDay: false,
              title: "Customized title",
              changes: ["Title"],
              cancelled: true,
              orphaned: false,
            },
          ],
        }),
      });
    vi.stubGlobal("fetch", fetch);
    const store = createEventBuilderStore({
      app: {
        pro: true,
        formats: {
          date: { short: { icu: "yyyy-MM-dd" } },
          datetime: { short: { icu: "yyyy-MM-dd HH:mm" } },
          time: { short: { icu: "HH:mm" } },
        } as DateFormats,
      },
      event: {
        start,
        end: start + 3600,
        allDay: false,
        repeatType: "CUSTOM",
        repeatEndType: "NEVER",
        rrule: `DTSTART:${stamp}\nRRULE:FREQ=DAILY`,
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    try {
      await act(async () => {
        root.render(
          <Provider store={store}>
            <Editor context={{ eventId: 12, siteId: 2 }} />
          </Provider>,
        );
      });
      expect(container.textContent).not.toContain("Edited occurrences");

      await act(async () =>
        container.querySelector<HTMLButtonElement>(".occurrence-edit")!.click(),
      );
      const { onSave } = vi.mocked(openOccurrenceEditor).mock.calls[0][0];
      await act(async () => onSave());

      expect(container.textContent).toContain("Customized title");
      expect(container.querySelector(".fc-cancelled-date")).not.toBeNull();
      expect(container.querySelector("li.is-cancelled .occurrence-state")?.textContent).toBe(
        "Cancelled",
      );
      expect(fetch.mock.calls[1][0].searchParams.get("eventId")).toBe("34");
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }
  });
});
