import { utcDateKey, utcDateTimeString } from "@cal/utils/date";
import { craftFetch } from "@cal/utils/http";
import { notifications } from "@cal/utils/notifications";
import translate from "@cal/utils/translations";
import type { EventApi, EventInput, EventSourceFunc } from "@fullcalendar/core";

const rangeCache = new Map<string, EventInput[]>();
const inflightRequests = new Map<string, Promise<EventInput[]>>();

export type EventMutationScope = "occurrence" | "following" | "series";

type EventMutationArgs = {
  event: EventApi;
  siteId?: number;
  refetchEvents: () => void;
};

type ScopedEventMutationArgs = EventMutationArgs & {
  recurrenceId?: string | null;
  scope?: EventMutationScope;
};

// A drag or resize already shows on the calendar, so it's reverted when saving it fails
type EventChangeArgs = ScopedEventMutationArgs & {
  revert?: () => void;
};

type OpenOccurrenceEditorArgs = {
  eventId: number;
  recurrenceId: string;
  siteId?: number;
  onSave: () => void;
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
  search = "",
): string => JSON.stringify([startIso, endIso, siteId, calendars, search]);

const fetchRange = (
  start: Date,
  end: Date,
  siteId?: number,
  calendars?: string | string[],
  search = "",
): Promise<EventInput[]> => {
  const startIso = utcDateKey(start);
  const endIso = utcDateKey(end);
  const calendarsParam = normalizeCalendarsParam(calendars);

  const searchParam = search.trim();
  const key = toRangeKey(startIso, endIso, siteId, calendarsParam, searchParam);
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
  if (searchParam) {
    url.searchParams.set("criteria[search]", searchParam);
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

export const getEventId = (id: string): number => Number.parseInt(id.split("-", 1)[0] || id, 10);

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

// A failure the server explained. Its message is meant for the user.
class EventMutationError extends Error {}

const requestEventMutation = async (
  path: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  // Without asking for JSON, Craft answers a failure with an empty page and a flash message
  const response = await craftFetch(Craft.getCpUrl(`calendar/api/events/${path}`), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: Record<string, unknown> | null = await response.json().catch((): null => null);

  if (!response.ok || !data || data.success === false) {
    throw new EventMutationError(typeof data?.message === "string" ? data.message : "");
  }

  return data;
};

const showMutationError = (error: unknown, fallbackMessage: string): void => {
  notifications.error(
    error instanceof EventMutationError && error.message ? error.message : fallbackMessage,
  );
};

/**
 * Saves a change to an event, then reloads the calendar. When that fails, the user is told why.
 */
const mutateEvent = async (
  path: string,
  { event, siteId, refetchEvents, revert }: EventMutationArgs & { revert?: () => void },
  fields: Record<string, unknown>,
  fallbackMessage: string,
): Promise<boolean> => {
  try {
    await requestEventMutation(path, { eventId: getEventId(String(event.id)), siteId, ...fields });
  } catch (error) {
    revert?.();
    showMutationError(error, fallbackMessage);

    return false;
  }

  clearCalendarEventsCache();
  refetchEvents();

  return true;
};

// Occurrence IDs end in their recurrence ID (`YmdHis`), which stays the same when an occurrence moves.
// It keeps its time even when the occurrence itself has been made all-day.
export const getRecurrenceIdFromId = (id: string): string | null => {
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

  return serializeEventDate(new Date(Date.UTC(year, month, day, hours, minutes, seconds)), false);
};

export const moveEvent = (args: EventChangeArgs): Promise<boolean> => {
  const { event, recurrenceId, scope = "series" } = args;

  return mutateEvent(
    "move",
    args,
    {
      scope,
      recurrenceId,
      start: serializeEventDate(event.start, event.allDay),
      end: serializeEventDate(event.end, event.allDay),
      allDay: event.allDay,
    },
    translate("Couldn’t save event."),
  );
};

export const resizeEvent = (args: EventChangeArgs & { oldEvent: EventApi }): Promise<boolean> => {
  const { event, oldEvent, recurrenceId, scope = "series" } = args;

  return mutateEvent(
    "resize",
    args,
    {
      scope,
      recurrenceId,
      start: serializeEventDate(event.start, event.allDay),
      end: serializeEventDate(event.end, event.allDay),
      oldStart: serializeEventDate(oldEvent.start, oldEvent.allDay),
      oldEnd: serializeEventDate(oldEvent.end, oldEvent.allDay),
      startDeltaSeconds: diffSeconds(event.start, oldEvent.start),
      endDeltaSeconds: diffSeconds(event.end, oldEvent.end),
      allDay: event.allDay,
    },
    translate("Couldn’t save event."),
  );
};

export const deleteEvent = (args: ScopedEventMutationArgs): Promise<boolean> => {
  const { recurrenceId, scope = "series" } = args;

  return mutateEvent("delete", args, { scope, recurrenceId }, translate("Couldn’t delete event."));
};

/**
 * Cancelled occurrences stay on the calendar, marked as not taking place.
 */
export const setOccurrenceCancelled = (
  args: EventMutationArgs & { recurrenceId: string; cancelled: boolean },
): Promise<boolean> => {
  const { recurrenceId, cancelled } = args;

  return mutateEvent(
    "cancel",
    args,
    { recurrenceId, cancelled },
    translate("Couldn’t save the occurrence."),
  );
};

/**
 * Starts "Edit this and following": a draft of the event from the occurrence onward, which splits the
 * event there when it's applied. Returns the URL to edit it at, or null after telling the user why not.
 */
export const editFollowing = async ({
  event,
  recurrenceId,
  siteId,
}: {
  event: EventApi;
  recurrenceId: string;
  siteId?: number;
}): Promise<string | null> => {
  try {
    const data = await requestEventMutation("edit-following", {
      eventId: getEventId(String(event.id)),
      recurrenceId,
      siteId,
    });

    if (typeof data.url !== "string") {
      throw new EventMutationError("");
    }

    return data.url;
  } catch (error) {
    showMutationError(error, translate("Couldn’t open the occurrences for editing."));

    return null;
  }
};

/**
 * Opens a single occurrence in the occurrence slideout. `eventId` can be a draft's ID,
 * in which case changes are saved into that draft.
 */
export const openOccurrenceEditor = ({
  eventId,
  recurrenceId,
  siteId,
  onSave,
}: OpenOccurrenceEditorArgs): void => {
  const params: Record<string, string | number> = { eventId, recurrenceId };
  if (siteId !== undefined) {
    params.siteId = siteId;
  }

  const slideout = new Craft.CpScreenSlideout("calendar/occurrences/edit", { params });
  slideout.on("submit", () => {
    clearCalendarEventsCache();
    onSave();
  });
};

export const clearCalendarEventsCache = () => {
  rangeCache.clear();
  inflightRequests.clear();
};

export const createCalendarEventsSource = (
  hiddenCalendarIds: Set<number>,
  siteId?: number,
  calendars?: string | string[],
  search = "",
): EventSourceFunc => {
  return (info, success, failure): Promise<EventInput[]> => {
    const start = info.start;
    const end = info.end;

    return fetchRange(start, end, siteId, calendars, search)
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
