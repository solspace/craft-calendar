// @vitest-environment jsdom
import { craftFetch } from "@cal/utils/http";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Provider } from "react-redux";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { eventActions } from "../store/event.slice";
import { createEventBuilderStore } from "../store/store";
import { type EditedOccurrence, EditedOccurrences } from "./edited-occurrences";

vi.mock("@cal/utils/http", () => ({ craftFetch: vi.fn() }));
vi.mock("@cal/pages/calendar/calendar.events", () => ({ openOccurrenceEditor: vi.fn() }));
vi.mock("../occurrence-editor", () => ({
  findElementEditor: (): null => null,
  getDraftEventId: vi.fn(),
}));

let root: Root;
let container: HTMLDivElement;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("Craft", {
    getActionUrl: (action: string) => `/actions/${action}`,
    t: (_category: string, message: string) => message,
  });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("updates the parent's recap when unsaved schedule checks orphan or restore an edit", async () => {
  const start = Date.UTC(2026, 9, 6, 10) / 1000;
  const edit: EditedOccurrence = {
    recurrenceId: "2026-10-13 10:00:00",
    start: start + 604800,
    end: start + 608400,
    allDay: false,
    title: null,
    changes: [],
    cancelled: true,
    orphaned: false,
  };
  let orphaned = [edit.recurrenceId];
  vi.mocked(craftFetch).mockImplementation(
    async (url) =>
      ({
        ok: true,
        json: async () =>
          String(url).endsWith("check-schedule") ? { orphaned } : { occurrences: [edit] },
      }) as Response,
  );
  const store = createEventBuilderStore({
    app: { pro: true },
    event: {
      start,
      end: start + 3600,
      allDay: false,
      repeatType: "WEEKLY",
      repeatEndType: "NEVER",
      rrule: "DTSTART:20261006T100000\nRRULE:FREQ=WEEKLY",
    },
  });
  const changed = vi.fn();
  await act(async () =>
    root.render(
      <Provider store={store}>
        <EditedOccurrences context={{ eventId: 12, siteId: 1 }} onOccurrencesChanged={changed} />
      </Provider>,
    ),
  );
  expect(changed).toHaveBeenLastCalledWith([expect.objectContaining({ orphaned: false })]);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(400);
  });
  expect(changed).toHaveBeenLastCalledWith([expect.objectContaining({ orphaned: true })]);

  orphaned = [];
  await act(async () => {
    store.dispatch(eventActions.setRepeatType("DAILY"));
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(400);
  });
  expect(changed).toHaveBeenLastCalledWith([expect.objectContaining({ orphaned: false })]);
});
