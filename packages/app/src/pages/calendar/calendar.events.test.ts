// @vitest-environment jsdom
import type { EventApi, EventSourceFuncArg } from "@fullcalendar/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearCalendarEventsCache,
  createCalendarEventsSource,
  deleteEvent,
  duplicateEvent,
  editFollowing,
  getRecurrenceIdFromId,
  moveEvent,
  replayEventHistory,
  setOccurrenceCancelled,
} from "./calendar.events";

const event = {
  id: "42-20261014100000",
  start: new Date("2026-10-15T10:00:00Z"),
  end: new Date("2026-10-15T11:00:00Z"),
  allDay: false,
} as unknown as EventApi;

const respondWith = (status: number, body: unknown) =>
  vi.fn(
    async (_url: string | URL, _init: RequestInit) =>
      new Response(JSON.stringify(body), { status }),
  );

describe("calendar events", () => {
  it("reads the recurrence ID of an occurrence", () => {
    expect(getRecurrenceIdFromId("42-20261014100000")).toBe("2026-10-14T10:00:00");
  });

  it("keeps the time of an all-day occurrence's recurrence ID", () => {
    expect(getRecurrenceIdFromId("42-20261014000000")).toBe("2026-10-14T00:00:00");
  });

  it("ignores IDs that aren't occurrence IDs", () => {
    expect(getRecurrenceIdFromId("42")).toBeNull();
    expect(getRecurrenceIdFromId("draft-create")).toBeNull();
  });
});

describe("calendar search feed", () => {
  const range = {
    start: new Date("2026-10-01T00:00:00Z"),
    end: new Date("2026-11-01T00:00:00Z"),
  } as EventSourceFuncArg;

  beforeEach(() => {
    clearCalendarEventsCache();
    vi.stubGlobal("Craft", { getCpUrl: (path: string) => `/admin/${path}` });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("separates cached searches, preserves calendar/site filters, and restores unfiltered results", async () => {
    const fetch = vi.fn(async (url: URL) => {
      const search = url.searchParams.get("criteria[search]");
      return new Response(
        JSON.stringify([
          { id: search || "all", title: search || "All events", calendar: 1 },
          { id: "hidden", title: "Hidden event", calendar: 2 },
        ]),
      );
    });
    vi.stubGlobal("fetch", fetch);
    const success = vi.fn();
    const failure = vi.fn();
    const load = (search: string) =>
      createCalendarEventsSource(new Set([2]), 3, ["1", "2"], search)(range, success, failure);

    await load("");
    expect(success).toHaveBeenLastCalledWith([expect.objectContaining({ id: "all" })]);
    await load(" room two ");
    expect(success).toHaveBeenLastCalledWith([expect.objectContaining({ id: "room two" })]);
    const url = fetch.mock.calls[1][0];
    expect(url.searchParams.get("criteria[search]")).toBe("room two");
    expect(url.searchParams.get("siteId")).toBe("3");
    expect(url.searchParams.get("calendars")).toBe("1,2");
    expect(url.searchParams.get("start")).toBe("2026-10-01");
    expect(url.searchParams.get("end")).toBe("2026-11-01");
    await load("other");
    await load("");
    expect(success).toHaveBeenLastCalledWith([expect.objectContaining({ id: "all" })]);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(failure).not.toHaveBeenCalled();
  });

  it("does not cache failed searches", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response("", { status: 500 }))
      .mockResolvedValueOnce(new Response("[]"));
    vi.stubGlobal("fetch", fetch);
    const failure = vi.fn();
    const source = createCalendarEventsSource(new Set(), undefined, undefined, "meeting");
    await source(range, vi.fn(), failure);
    await source(range, vi.fn(), failure);
    expect(failure).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

describe("calendar event changes", () => {
  const displayError = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("Craft", {
      getCpUrl: (path: string) => `/admin/${path}`,
      t: (_category: string, message: string) => message,
      cp: { displayError },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    displayError.mockReset();
  });

  it("records history only after the server saves a change", async () => {
    const fetch = respondWith(200, { success: true, historyToken: "trusted-token" });
    vi.stubGlobal("fetch", fetch);
    const onHistoryEntry = vi.fn();
    await moveEvent({ event, refetchEvents: vi.fn(), onHistoryEntry });
    expect(JSON.parse(String(fetch.mock.calls[0][1].body))).toMatchObject({ recordHistory: true });
    expect(onHistoryEntry).toHaveBeenCalledWith("trusted-token");
    vi.stubGlobal("fetch", respondWith(200, { success: false, message: "Cannot save" }));
    await moveEvent({ event, refetchEvents: vi.fn(), onHistoryEntry });
    expect(onHistoryEntry).toHaveBeenCalledOnce();
  });

  it("replays trusted server history tokens without posting schedules", async () => {
    const fetch = respondWith(200, { success: true });
    vi.stubGlobal("fetch", fetch);
    expect(await replayEventHistory("trusted-token", "undo")).toBe(true);
    expect(fetch.mock.calls[0][0]).toBe("/admin/calendar/api/events/history");
    expect(JSON.parse(String(fetch.mock.calls[0][1].body))).toEqual({
      token: "trusted-token",
      direction: "undo",
    });
  });

  it("duplicates the source event in the selected site and returns its edit URL", async () => {
    const fetch = respondWith(200, { success: true, url: "/admin/calendar/events/99" });
    vi.stubGlobal("fetch", fetch);
    expect(await duplicateEvent(event, 2)).toBe("/admin/calendar/events/99");
    expect(fetch.mock.calls[0][0]).toBe("/admin/calendar/api/events/duplicate");
    expect(JSON.parse(String(fetch.mock.calls[0][1].body))).toEqual({ eventId: 42, siteId: 2 });
  });

  it("asks for JSON, sends the site and reloads the calendar", async () => {
    const fetch = respondWith(200, { success: true });
    vi.stubGlobal("fetch", fetch);
    const refetchEvents = vi.fn();

    const wasMoved = await moveEvent({
      event,
      recurrenceId: "2026-10-14T10:00:00",
      scope: "occurrence",
      siteId: 2,
      refetchEvents,
    });

    expect(wasMoved).toBe(true);
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/admin/calendar/api/events/move");
    expect(new Headers(init.headers).get("Accept")).toBe("application/json");
    expect(JSON.parse(String(init.body))).toMatchObject({
      eventId: 42,
      siteId: 2,
      scope: "occurrence",
      recurrenceId: "2026-10-14T10:00:00",
    });
    expect(refetchEvents).toHaveBeenCalledOnce();
    expect(displayError).not.toHaveBeenCalled();
  });

  it("shows the server's reason and reverts the change when it fails", async () => {
    vi.stubGlobal("fetch", respondWith(400, { message: "Event could not be found" }));
    const refetchEvents = vi.fn();
    const revert = vi.fn();

    expect(await moveEvent({ event, refetchEvents, revert })).toBe(false);
    expect(displayError).toHaveBeenCalledWith("Event could not be found");
    expect(revert).toHaveBeenCalledOnce();
    expect(refetchEvents).not.toHaveBeenCalled();
  });

  it("falls back to a general message when the server doesn't give one", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );

    expect(await deleteEvent({ event, refetchEvents: vi.fn() })).toBe(false);
    expect(displayError).toHaveBeenCalledWith("Couldn’t delete event.");
  });

  it("treats an empty answer as a failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 200 })),
    );

    const wasCancelled = await setOccurrenceCancelled({
      event,
      recurrenceId: "2026-10-14T10:00:00",
      cancelled: true,
      refetchEvents: vi.fn(),
    });

    expect(wasCancelled).toBe(false);
    expect(displayError).toHaveBeenCalledWith("Couldn’t save the occurrence.");
  });

  it("tells the user why the following occurrences can't be edited", async () => {
    vi.stubGlobal("fetch", respondWith(400, { message: "Occurrence could not be found" }));

    expect(await editFollowing({ event, recurrenceId: "2026-10-14T10:00:00" })).toBeNull();
    expect(displayError).toHaveBeenCalledWith("Occurrence could not be found");
  });
});
