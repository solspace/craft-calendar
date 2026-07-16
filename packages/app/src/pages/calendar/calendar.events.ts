import { utcDateKey, utcDateTimeString } from "@cal/utils/date";
import { craftFetch } from "@cal/utils/http";
import type { EventApi, EventInput, EventSourceFunc } from "@fullcalendar/core";

const rangeCache = new Map<string, EventInput[]>();
const inflightRequests = new Map<string, Promise<EventInput[]>>();

export type EventMutationScope = "occurrence" | "series";

type EventMutationArgs = {
  refetchEvents: () => void;
  revert?: () => void;
};

type MoveEventArgs = EventMutationArgs & {
  event: EventApi;
  occurrenceDate?: string | null;
  scope?: EventMutationScope;
};

type ResizeEventArgs = EventMutationArgs & {
  event: EventApi;
  oldEvent: EventApi;
};

type DeleteEventArgs = EventMutationArgs & {
  event: EventApi;
  occurrenceDate?: string | null;
  scope?: EventMutationScope;
};

const normalizeCalendarsParam = (calendars?: string | string[]): string | undefined => {
  if (calendars === undefined || calendars === "*") {
    return undefined;
  }

  const value = Array.isArray(calendars) ? calendars.join(",") : calendars;

  return "" === value ? undefined : value;
};

const toRangeKey = (
  startIso: string,
  endIso: string,
  siteId?: number,
  calendars?: string,
): string => `${startIso}|${endIso}|${siteId ?? ""}|${calendars ?? ""}`;

const fetchRange = (
  start: Date,
  end: Date,
  siteId?: number,
  calendars?: string | string[],
): Promise<EventInput[]> => {
  const startIso = utcDateKey(start);
  const endIso = utcDateKey(end);
  const calendarsParam = normalizeCalendarsParam(calendars);

  const key = toRangeKey(startIso, endIso, siteId, calendarsParam);
  const cached = rangeCache.get(key);

  if (cached) {
    return Promise.resolve(cached);
  }

  const inflight = inflightRequests.get(key);
  if (inflight) {
    return inflight;
  }

  const url = new URL(Craft.getCpUrl("calendar/api/events"), window.location.origin);
  url.searchParams.set("start", startIso);
  url.searchParams.set("end", endIso);
  if (siteId !== undefined) {
    url.searchParams.set("siteId", String(siteId));
  }
  if (calendarsParam !== undefined) {
    url.searchParams.set("calendars", calendarsParam);
  }

  const request = craftFetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: EventInput[] = await response.json();
      rangeCache.set(key, data);

      return data;
    })
    .finally(() => {
      inflightRequests.delete(key);
    });

  inflightRequests.set(key, request);

  return request;
};

const getEventId = (id: string): number => Number.parseInt(id.split("-", 1)[0] || id, 10);

const serializeEventDate = (value: Date | null, allDay: boolean): string | null => {
  if (!value) {
    return null;
  }

  if (allDay) {
    return utcDateKey(value);
  }

  return utcDateTimeString(value);
};

const diffSeconds = (next: Date | null, previous: Date | null): number | null => {
  if (!next || !previous) {
    return null;
  }

  return Math.round((next.getTime() - previous.getTime()) / 1000);
};

const requestEventMutation = async (path: string, body: Record<string, unknown>) => {
  const response = await craftFetch(Craft.getCpUrl(`calendar/api/events/${path}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (data?.success === false) {
    throw new Error(data?.message || `Failed to ${path} event`);
  }
};

export const getOccurrenceDateFromId = (id: string, allDay: boolean): string | null => {
  const match = /^\d+-(\d{8})(\d{6})$/.exec(id);
  if (!match) {
    return null;
  }

  const [, date, time] = match;
  const year = Number.parseInt(date.slice(0, 4), 10);
  const month = Number.parseInt(date.slice(4, 6), 10) - 1;
  const day = Number.parseInt(date.slice(6, 8), 10);
  const hours = Number.parseInt(time.slice(0, 2), 10);
  const minutes = Number.parseInt(time.slice(2, 4), 10);
  const seconds = Number.parseInt(time.slice(4, 6), 10);

  return serializeEventDate(new Date(Date.UTC(year, month, day, hours, minutes, seconds)), allDay);
};

export const moveEvent = async ({
  event,
  occurrenceDate,
  scope = "series",
  refetchEvents,
  revert,
}: MoveEventArgs): Promise<boolean> => {
  try {
    await requestEventMutation("move", {
      eventId: getEventId(String(event.id)),
      scope,
      occurrenceDate,
      start: serializeEventDate(event.start, event.allDay),
      end: serializeEventDate(event.end, event.allDay),
      allDay: event.allDay,
    });

    clearCalendarEventsCache();
    refetchEvents();

    return true;
  } catch (error) {
    console.error("Error moving event:", error);
    revert?.();

    return false;
  }
};

export const resizeEvent = async ({
  event,
  oldEvent,
  refetchEvents,
  revert,
}: ResizeEventArgs): Promise<boolean> => {
  try {
    await requestEventMutation("resize", {
      eventId: getEventId(String(event.id)),
      scope: "series",
      start: serializeEventDate(event.start, event.allDay),
      end: serializeEventDate(event.end, event.allDay),
      oldStart: serializeEventDate(oldEvent.start, oldEvent.allDay),
      oldEnd: serializeEventDate(oldEvent.end, oldEvent.allDay),
      startDeltaSeconds: diffSeconds(event.start, oldEvent.start),
      endDeltaSeconds: diffSeconds(event.end, oldEvent.end),
      allDay: event.allDay,
    });

    clearCalendarEventsCache();
    refetchEvents();

    return true;
  } catch (error) {
    console.error("Error resizing event:", error);
    revert?.();

    return false;
  }
};

export const deleteEvent = async ({
  event,
  occurrenceDate,
  scope = "series",
  refetchEvents,
  revert,
}: DeleteEventArgs): Promise<boolean> => {
  try {
    await requestEventMutation("delete", {
      eventId: getEventId(String(event.id)),
      scope,
      occurrenceDate,
    });

    clearCalendarEventsCache();
    refetchEvents();

    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    revert?.();

    return false;
  }
};

export const clearCalendarEventsCache = () => {
  rangeCache.clear();
  inflightRequests.clear();
};

export const createCalendarEventsSource = (
  hiddenCalendarIds: Set<number>,
  siteId?: number,
  calendars?: string | string[],
): EventSourceFunc => {
  return (info, success, failure): Promise<EventInput[]> => {
    const start = info.start;
    const end = info.end;

    return fetchRange(start, end, siteId, calendars)
      .then((data) => {
        let events: EventInput[];

        if (hiddenCalendarIds.size) {
          events = data.filter((event) => !hiddenCalendarIds.has(event.calendar));
        } else {
          events = data;
        }

        success(events);

        return events;
      })
      .catch((error) => {
        failure(error);

        return [] as EventInput[];
      });
  };
};
