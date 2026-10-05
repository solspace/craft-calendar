// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEventBuilderStore } from "../../store/store";
import { CalendarPreview } from "./calendar-preview";

describe("calendar preview rendering", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
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
