// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCreateEvent } from "./create-event.mutation";

const { fetch, hide, clearCache } = vi.hoisted(() => ({
  fetch: vi.fn(),
  hide: vi.fn(),
  clearCache: vi.fn(),
}));
vi.mock("@cal/utils/http", () => ({ craftFetch: fetch }));
vi.mock("@cal/utils/urls", () => ({ generateUrl: (path: string) => path }));
vi.mock("@cal/contexts/popover/popover.context", () => ({
  usePopover: () => ({ hidePopover: hide }),
}));
vi.mock("../../calendar.events", () => ({ clearCalendarEventsCache: clearCache }));
vi.mock("../../context/config.context", () => ({ useConfig: () => ({ currentSiteId: 4 }) }));

describe("quick-create full editor handoff", () => {
  let container: HTMLDivElement;
  let root: Root;
  let operations: ReturnType<typeof useCreateEvent>;
  const onSuccess = vi.fn();
  const refetchEvents = vi.fn();
  const event = { id: "draft-create-event", title: "Yoga", start: 100, end: 3700, allDay: false };
  const Controller = () => {
    operations = useCreateEvent({ onSuccess, refetchEvents });
    return <div>{operations.error}</div>;
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    await act(async () => root.render(<Controller />));
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("prepares a draft with the full popup payload and returns its editor URL without publishing", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: "/admin/calendar/events/42?draftId=9&fresh=1" }),
    });
    const details = { location: "", description: "Bring a mat.\nDoors open at 6." };
    let url: string | null = null;
    await act(async () => {
      url = await operations.prepareEvent(event, 12, details);
    });
    expect(url).toBe("/admin/calendar/events/42?draftId=9&fresh=1");
    expect(fetch).toHaveBeenCalledOnce();
    const [path, request] = fetch.mock.calls[0];
    expect(path).toBe("/api/events/prepare");
    expect(request.method).toBe("POST");
    expect(JSON.parse(request.body)).toEqual({
      title: "Yoga",
      start: 100,
      end: 3700,
      allDay: false,
      calendarId: 12,
      siteId: 4,
      details,
    });
    expect(onSuccess).not.toHaveBeenCalled();
    expect(refetchEvents).not.toHaveBeenCalled();
    expect(clearCache).not.toHaveBeenCalled();
    expect(hide).not.toHaveBeenCalled();
    expect(operations.isFetching).toBe(false);
  });

  it("preserves the exclusive all-day end and an empty title when preparing the full editor", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: "/admin/calendar/events/42?draftId=9" }),
    });
    const allDay = { ...event, title: "", allDay: true, start: 1791244800, end: 1791504000 };
    await act(async () => {
      await operations.prepareEvent(allDay, 12);
    });
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
      title: "",
      allDay: true,
      start: allDay.start,
      end: allDay.end,
    });
  });

  it("keeps the popup open and exposes validation errors if preparation fails", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ errors: ["Could not save event"] }),
    });
    let url: string | null = "";
    await act(async () => {
      url = await operations.prepareEvent(event, 12);
    });
    expect(url).toBeNull();
    expect(operations.error).toBe("Could not save event");
    expect(hide).not.toHaveBeenCalled();
    expect(operations.isFetching).toBe(false);
  });

  it("still creates and refreshes an event through the normal quick-create action", async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 42 }) });
    await act(async () => {
      await operations.createEvent(event, 12);
    });
    expect(fetch.mock.calls[0][0]).toBe("/api/events");
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(refetchEvents).toHaveBeenCalledOnce();
    expect(clearCache).toHaveBeenCalledOnce();
    expect(hide).toHaveBeenCalledOnce();
  });
});
