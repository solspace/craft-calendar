// @vitest-environment jsdom
import type { DateFormats } from "@cal/types/config";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createEventBuilderStore } from "../store/store";
import { EditedOccurrences } from "./edited-occurrences";

describe("edited occurrences", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows a new preview override immediately and reloads from the current draft", async () => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Craft", {
      getActionUrl: (action: string) => `/${action}`,
      t: (_category: string, message: string) => message,
    });
    const editor = {
      settings: { elementId: 12 },
      ensureIsDraftOrRevision: vi.fn().mockResolvedValue(undefined),
      checkForm: vi.fn().mockResolvedValue(undefined),
    };
    vi.stubGlobal("jQuery", () => ({ closest: () => ({ data: () => editor }) }));
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ occurrences: [] as unknown[] }) })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          occurrences: [
            {
              recurrenceId: "20260904140000",
              start: Date.UTC(2026, 8, 4, 14) / 1000,
              end: Date.UTC(2026, 8, 4, 15) / 1000,
              allDay: false,
              title: "Special occurrence",
              changes: ["Title"],
              cancelled: false,
              orphaned: false,
            },
          ],
        }),
      })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ occurrences: [] as unknown[] }) });
    vi.stubGlobal("fetch", fetch);
    const store = createEventBuilderStore({
      app: {
        pro: true,
        formats: {
          date: { short: { icu: "yyyy-MM-dd" } },
          time: { short: { icu: "HH:mm" } },
        } as DateFormats,
      },
      event: { start: 0, end: 3600, allDay: false, repeatType: "DAILY", repeatEndType: "NEVER" },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const onOccurrencesChanged = vi.fn();
    const confirm = vi
      .spyOn(window, "confirm")
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const render = (refreshKey: number) =>
      root.render(
        <Provider store={store}>
          <EditedOccurrences
            context={{ eventId: 12, siteId: 2 }}
            refreshKey={refreshKey}
            onOccurrencesChanged={onOccurrencesChanged}
          />
        </Provider>,
      );

    try {
      await act(async () => render(0));
      expect(container.textContent).toBe("");
      editor.settings.elementId = 34;

      await act(async () => render(1));

      expect(container.textContent).toContain("Edited occurrences");
      expect(container.textContent).toContain("Special occurrence");
      expect(container.querySelector(".occurrence-date")?.textContent).toBe(
        "2026-09-04 14:00 - 15:00",
      );
      expect(fetch.mock.calls[1][0].searchParams.get("eventId")).toBe("34");
      expect(fetch.mock.calls[1][0].searchParams.get("siteId")).toBe("2");

      const discard = container.querySelector<HTMLButtonElement>(".occurrence-discard")!;
      await act(async () => discard.click());
      expect(confirm).toHaveBeenCalledWith("Remove everything this occurrence changes?");
      expect(fetch).toHaveBeenCalledTimes(2);

      await act(async () => discard.click());
      expect(editor.ensureIsDraftOrRevision).toHaveBeenCalledOnce();
      expect(editor.checkForm).toHaveBeenCalledWith(false, true);
      expect(JSON.parse(fetch.mock.calls[2][1].body)).toEqual({
        eventId: 34,
        siteId: 2,
        recurrenceId: "20260904140000",
      });
      expect(container.textContent).toBe("");
      expect(onOccurrencesChanged).toHaveBeenLastCalledWith([]);
    } finally {
      confirm.mockRestore();
      await act(async () => root.unmount());
      container.remove();
    }
  });
});
