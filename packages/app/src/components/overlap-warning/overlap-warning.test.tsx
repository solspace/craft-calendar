// @vitest-environment jsdom

import type { DateFormats } from "@cal/types/config";
import { replace } from "@cal/utils/translations";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LiveOverlapWarning, OverlapWarning } from "./overlap-warning";

let container: HTMLDivElement;
let root: Root;
const schedule = { start: 1791972000, end: 1791975600, calendarId: 1, siteId: 2 };
const conflict = {
  count: 1,
  events: [
    {
      id: "43-date",
      title: "<script>unsafe</script>",
      url: "/admin/calendar/events/43",
      start: schedule.start,
      end: schedule.end,
      allDay: false,
    },
  ],
};
const response = (data: unknown) => new Response(JSON.stringify(data));
const render = async (enabled = true, start = schedule.start) => {
  await act(async () =>
    root.render(<LiveOverlapWarning enabled={enabled} schedule={{ ...schedule, start }} />),
  );
};
const flush = async () => {
  await act(async () => vi.advanceTimersByTimeAsync(500));
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("Craft", {
    getCpUrl: (path: string) => `/admin/${path}`,
    csrfTokenValue: "token",
    t: (_category: string, text: string, params: Record<string, string | number | boolean>) =>
      replace(text, params),
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

describe("live overlap warnings", () => {
  it.each([
    3, 4, 10,
  ])("shows three details with an accurate remainder for %s conflicts", async (count) => {
    const events = Array.from({ length: Math.min(count, 5) }, (_, index) => ({
      ...conflict.events[0],
      id: String(index),
      title: `Conflict ${index + 1}`,
    }));
    await act(async () => root.render(<OverlapWarning result={{ count, events }} />));
    expect(container.querySelectorAll("li")).toHaveLength(3);
    expect(container.textContent).not.toContain("Conflict 4");
    if (count > 3) expect(container.textContent).toContain(`And ${count - 3} more`);
    else expect(container.textContent).not.toContain("more");
  });
  it("does no work when disabled", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await render(false);
    await flush();
    expect(fetch).not.toHaveBeenCalled();
    expect(container.textContent).toBe("");
  });
  it("debounces checks and renders safe linked details", async () => {
    const fetch = vi.fn(async (_input: RequestInfo | URL, _init: RequestInit) =>
      response(conflict),
    );
    vi.stubGlobal("fetch", fetch);
    await render();
    await render(true, schedule.start + 60);
    await flush();
    expect(fetch).toHaveBeenCalledOnce();
    expect(JSON.parse(String(fetch.mock.calls[0][1].body))).toMatchObject({
      calendarId: 1,
      siteId: 2,
      start: schedule.start + 60,
    });
    expect(container.textContent).toContain("You can still save.");
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("a")?.textContent).toBe("<script>unsafe</script>");
  });
  it("ignores stale responses after the schedule changes", async () => {
    let resolveOld: (value: Response) => void = () => {};
    const fetch = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            resolveOld = resolve;
          }),
      )
      .mockResolvedValueOnce(response({ count: 0, events: [] }));
    vi.stubGlobal("fetch", fetch);
    await render();
    await flush();
    await render(true, schedule.start + 60);
    await flush();
    await act(async () => resolveOld(response(conflict)));
    expect(container.textContent).toContain("No overlaps found.");
    expect(container.textContent).not.toContain("Scheduling conflict");
  });
  it("uses the editor's date and time formats without a blank trailing status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => response(conflict)),
    );
    const formats = {
      date: { short: { icu: "yyyy-MM-dd" } },
      time: { short: { icu: "h:mm a" } },
    } as DateFormats;
    await act(async () =>
      root.render(<LiveOverlapWarning enabled schedule={schedule} formats={formats} />),
    );
    await flush();
    expect(container.querySelector("li small")?.textContent).toBe("2026-10-14 10:00 AM - 11:00 AM");
    expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
  });
  it("shows a check failure without blocking the editor", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
    await render();
    await flush();
    expect(container.textContent).toContain("Couldn’t check for overlaps. You can still save.");
  });
  it("states the bounded scope for recurring schedules", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => response({ ...conflict, recurring: true, through: "2027-10-14" })),
    );
    await render();
    await flush();
    expect(container.textContent).toContain(
      "Checked up to 100 occurrences within one year, through 2027-10-14.",
    );
  });
});
