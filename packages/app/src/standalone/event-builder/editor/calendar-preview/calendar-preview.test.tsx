// @vitest-environment jsdom
import { openOccurrenceEditor } from "@cal/pages/calendar/calendar.events";
import type { DateFormats } from "@cal/types/config";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { EditedOccurrence } from "../../edited-occurrences/edited-occurrences";
import { getDraftEventId } from "../../occurrence-editor";
import { createEventBuilderStore } from "../../store/store";
import { CalendarPreview } from "./calendar-preview";

vi.mock("@cal/pages/calendar/calendar.events", () => ({ openOccurrenceEditor: vi.fn() }));
vi.mock("../../occurrence-editor", () => ({ getDraftEventId: vi.fn() }));

describe("calendar preview rendering", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  const renderEditablePreview = async (
    eventId: number | null,
    rrule = true,
    formats?: DateFormats,
    editedOccurrences?: EditedOccurrence[],
  ) => {
    const now = new Date();
    const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 10, 30) / 1000;
    const stamp = new Date(start * 1000).toISOString().replace(/[-:]/g, "").slice(0, 15);
    const store = createEventBuilderStore({
      app: { pro: true, weekStartDay: 1, formats },
      event: {
        start,
        end: start + 3600,
        allDay: false,
        repeatType: rrule ? "CUSTOM" : "NEVER",
        repeatEndType: "NEVER",
        rrule: rrule ? `DTSTART:${stamp}\nRRULE:FREQ=DAILY` : undefined,
      },
    });
    const onOccurrenceSaved = vi.fn();

    await act(async () => {
      root.render(
        <Provider store={store}>
          <CalendarPreview
            context={{ eventId, siteId: 2 }}
            onOccurrenceSaved={onOccurrenceSaved}
            editedOccurrences={editedOccurrences}
          />
        </Provider>,
      );
    });

    return { start, onOccurrenceSaved, store };
  };

  const makeCancellation = (start: number, orphaned = false): EditedOccurrence => ({
    recurrenceId: new Date(start * 1000).toISOString().slice(0, 19).replace("T", " "),
    start,
    end: start + 3600,
    allDay: false,
    title: null,
    changes: [],
    cancelled: true,
    orphaned,
  });

  it("marks a cancelled occurrence in the grid and date list, and clears it after reset", async () => {
    const { start } = await renderEditablePreview(12);
    await renderEditablePreview(12, true, undefined, [makeCancellation(start)]);

    expect(container.querySelectorAll(".fc-cancelled-date")).toHaveLength(1);
    expect(container.querySelector(".fc-cancelled-date [title]")?.getAttribute("title")).toContain(
      "Cancelled",
    );
    expect(container.querySelector("li.is-cancelled")?.textContent).toContain("Cancelled");
    expect(container.querySelector("li.is-cancelled .occurrence-edit")).not.toBeNull();

    await renderEditablePreview(12, true, undefined, []);

    expect(container.querySelector(".fc-cancelled-date")).toBeNull();
    expect(container.querySelector("li.is-cancelled")).toBeNull();
  });

  it("places a moved occurrence on its edited date and opens the original anchor", async () => {
    const { start } = await renderEditablePreview(12);
    const moved = {
      ...makeCancellation(start + 86400),
      cancelled: false,
      start: start + 2 * 86400 + 3600,
      end: start + 2 * 86400 + 7200,
      title: "Special workshop",
      changes: ["Title", "Times"],
    };
    await renderEditablePreview(12, true, undefined, [moved]);
    const oldDate = new Date((start + 86400) * 1000).toISOString().slice(0, 10);
    const newDate = new Date(moved.start * 1000).toISOString().slice(0, 10);
    expect(container.querySelector(`[data-date="${oldDate}"].fc-has-event`)).toBeNull();
    expect(
      container
        .querySelector(`[data-date="${newDate}"].fc-edited-date [title]`)
        ?.getAttribute("title"),
    ).toContain("Special workshop");
    const row = container.querySelector<HTMLLIElement>("li.is-edited")!;
    expect(row.title).toContain("Special workshop");
    expect(row.title).toContain("11:30");
    expect(row.textContent).not.toContain("Special workshop");
    expect(row.querySelector(".occurrence-state")?.textContent).toBe("Edited occurrence");
    vi.mocked(getDraftEventId).mockResolvedValue(34);
    await act(async () => row.querySelector<HTMLButtonElement>(".occurrence-edit")!.click());
    expect(openOccurrenceEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        recurrenceId: moved.recurrenceId.replace(" ", "T"),
        eventId: 34,
      }),
    );
  });

  it("removes a moved occurrence from its schedule anchor, leaving the destination's other occurrence", async () => {
    const { start } = await renderEditablePreview(12);
    const moved = {
      ...makeCancellation(start + 86400),
      cancelled: false,
      start: start + 2 * 86400,
      end: start + 2 * 86400 + 3600,
    };
    const { store } = await renderEditablePreview(12, true, undefined, [moved]);
    await act(async () =>
      container.querySelector<HTMLButtonElement>("li.is-edited .occurrence-remove")!.click(),
    );
    const original = new Date((start + 86400) * 1000)
      .toISOString()
      .replace(/[-:]/g, "")
      .slice(0, 15);
    const destination = new Date(moved.start * 1000)
      .toISOString()
      .replace(/[-:]/g, "")
      .slice(0, 15);
    expect(store.getState().event.rrule).toContain(`EXDATE:${original}`);
    expect(store.getState().event.rrule).not.toContain(`EXDATE:${destination}`);
  });

  it("does not mark orphaned cancellations or a different scheduled time on the same date", async () => {
    const { start } = await renderEditablePreview(12);
    await renderEditablePreview(12, true, undefined, [
      makeCancellation(start, true),
      makeCancellation(start + 3600),
    ]);

    expect(container.querySelector(".fc-cancelled-date")).toBeNull();
    expect(container.querySelector("li.is-cancelled")).toBeNull();
  });

  it("updates the schedule recap after an occurrence is cancelled or reset", async () => {
    const { start } = await renderEditablePreview(12);
    await renderEditablePreview(12, true, undefined, [makeCancellation(start)]);
    expect(container.querySelector('ul[aria-label="Schedule changes"]')?.textContent).toBe(
      "1 cancelled occurrence",
    );
    await renderEditablePreview(12, true, undefined, [makeCancellation(start, true)]);
    expect(container.querySelector('ul[aria-label="Schedule changes"]')?.textContent).toBe(
      "1 edit off schedule",
    );
    await renderEditablePreview(12, true, undefined, []);
    expect(container.querySelector('ul[aria-label="Schedule changes"]')).toBeNull();
  });

  it("uses Craft's year-first formatting pattern for occurrence labels", async () => {
    const { start } = await renderEditablePreview(12, true, {
      date: { short: { icu: "yyyy-MM-dd" } },
    } as DateFormats);
    const date = new Date(start * 1000).toISOString().slice(0, 10);
    const edit = container.querySelector<HTMLButtonElement>(".occurrence-edit")!;

    expect(edit.getAttribute("aria-label")).toBe(`Edit occurrence on ${date}`);
    expect(edit.closest("li")?.querySelector("span")?.textContent).toBe(date);
  });

  it("opens the first occurrence in the draft and notifies the builder after saving", async () => {
    const { start, onOccurrenceSaved } = await renderEditablePreview(12);
    vi.mocked(getDraftEventId).mockResolvedValue(34);
    const button = container.querySelector<HTMLButtonElement>(".occurrence-edit");
    expect(button).not.toBeNull();

    await act(async () => button!.click());

    expect(openOccurrenceEditor).toHaveBeenCalledWith({
      eventId: 34,
      recurrenceId: new Date(start * 1000).toISOString().slice(0, 19),
      siteId: 2,
      onSave: expect.any(Function),
    });
    const { onSave } = vi.mocked(openOccurrenceEditor).mock.calls[0][0];
    onSave();
    expect(onOccurrenceSaved).toHaveBeenCalledOnce();
  });

  it("disables occurrence actions while the draft is saving", async () => {
    await renderEditablePreview(12);
    let finishSaving!: (id: number) => void;
    vi.mocked(getDraftEventId).mockImplementation(
      () =>
        new Promise((resolve) => {
          finishSaving = resolve;
        }),
    );
    await act(async () => {
      container.querySelector<HTMLButtonElement>(".occurrence-edit")!.click();
    });

    expect(openOccurrenceEditor).not.toHaveBeenCalled();
    expect(
      Array.from(container.querySelectorAll<HTMLButtonElement>("button[aria-label]"))
        .filter((button) => /occurrence/i.test(button.getAttribute("aria-label") ?? ""))
        .every((button) => button.disabled),
    ).toBe(true);

    await act(async () => finishSaving(34));
    expect(container.querySelector<HTMLButtonElement>(".occurrence-edit")!.disabled).toBe(false);
    expect(openOccurrenceEditor).toHaveBeenCalledOnce();
  });

  it("shows an error instead of opening an occurrence when the draft cannot be saved", async () => {
    const displayError = vi.fn();
    vi.stubGlobal("Craft", {
      cp: { displayError },
      t: (_category: string, message: string) => message,
    });
    await renderEditablePreview(12);
    vi.mocked(getDraftEventId).mockRejectedValue(new Error("Couldn’t save draft."));

    await act(async () => container.querySelector<HTMLButtonElement>(".occurrence-edit")!.click());

    expect(openOccurrenceEditor).not.toHaveBeenCalled();
    expect(displayError).toHaveBeenCalledWith("Couldn’t open the occurrence for editing.");
    expect(container.querySelector<HTMLButtonElement>(".occurrence-edit")!.disabled).toBe(false);
  });

  it.each([
    [null, true],
    [12, false],
  ])("does not offer occurrence editing without a saved repeating event (%s, %s)", async (eventId, rrule) => {
    await renderEditablePreview(eventId as number | null, rrule as boolean);
    expect(container.querySelector(".occurrence-edit")).toBeNull();
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    document.documentElement.lang = "";
    vi.unstubAllGlobals();
  });

  it.each([
    "en",
    "de",
    "nl",
    "fr",
    "it",
  ])("mounts, navigates, and excludes occurrences in %s without an update loop", async (language) => {
    document.documentElement.lang = language;
    // Keep the recurrence in the real calendar's initial visible month.
    const now = new Date();
    const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 10) / 1000;
    const stamp = new Date(start * 1000).toISOString().replace(/[-:]/g, "").slice(0, 15);
    const store = createEventBuilderStore({
      app: { pro: true, weekStartDay: 1 },
      event: {
        start,
        end: start + 3600,
        allDay: false,
        repeatType: "CUSTOM",
        repeatEndType: "NEVER",
        rrule: `DTSTART:${stamp}\nRRULE:FREQ=DAILY`,
      },
    });

    await act(async () => {
      root.render(
        <Provider store={store}>
          <CalendarPreview />
        </Provider>,
      );
    });
    expect(container.querySelectorAll(".fc-col-header-cell")).toHaveLength(7);
    expect(container.querySelector(".fc-has-event")).not.toBeNull();

    const heading = container.querySelector(".fc-toolbar-title")?.textContent;
    await act(async () => {
      container.querySelector<HTMLButtonElement>(".fc-next-button")!.click();
    });
    expect(container.querySelector(".fc-toolbar-title")?.textContent).not.toBe(heading);

    const remove = container.querySelector<HTMLButtonElement>(
      'button[aria-label^="Exclude occurrence on"]',
    );
    expect(remove).not.toBeNull();
    await act(async () => remove!.click());
    expect(store.getState().event.rrule).toContain("EXDATE:");
    expect(container.querySelector(".fc-excluded-date")).not.toBeNull();
  });
});
