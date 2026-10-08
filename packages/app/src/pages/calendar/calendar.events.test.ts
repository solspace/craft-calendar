// @vitest-environment jsdom
import type { EventApi } from "@fullcalendar/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteEvent,
  editFollowing,
  getRecurrenceIdFromId,
  moveEvent,
  setOccurrenceCancelled,
} from "./calendar.events";

const event = {
  id: "42-20261014100000",
  start: new Date("2026-10-15T10:00:00Z"),
  end: new Date("2026-10-15T11:00:00Z"),
  allDay: false,
} as unknown as EventApi;

const respondWith = (status: number, body: unknown) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status }));

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
