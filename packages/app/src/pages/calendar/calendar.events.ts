import { craftFetch } from "@cal/utils/http";
import type { EventInput, EventSourceFunc } from "@fullcalendar/core";
import { differenceInDays, format, startOfDay, subDays } from "date-fns";

const rangeCache = new Map<string, EventInput[]>();
const inflightRequests = new Map<string, Promise<EventInput[]>>();

const toRangeKey = (startIso: string, endIso: string): string => `${startIso}|${endIso}`;
const toDate = (date: Date): string => format(date, "yyyy-MM-dd");

const fetchRange = (start: Date, end: Date): Promise<EventInput[]> => {
  const startIso = toDate(start);
  const endIso = toDate(end);

  const key = toRangeKey(startIso, endIso);
  const cached = rangeCache.get(key);

  if (cached) {
    console.log(` - ✅[${key}]: cache hit with ${cached.length} events`);
    return Promise.resolve(cached);
  }

  const inflight = inflightRequests.get(key);
  if (inflight) {
    return inflight;
  }

  const url = new URL(Craft.getCpUrl("calendar/api/events"), window.location.origin);
  url.searchParams.set("start", startIso);
  url.searchParams.set("end", endIso);

  console.log(` - ❌[${key}]: fetching events from API`);

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

const prefetchAdjacentRanges = (start: Date, end: Date) => {
  const diffInDays = differenceInDays(end, start);
  if (diffInDays <= 0) {
    return;
  }

  const prevStart = subDays(start, diffInDays);
  const prevEnd = subDays(end, diffInDays);
  const nextStart = subDays(start, -diffInDays);
  const nextEnd = subDays(end, -diffInDays);

  fetchRange(prevStart, prevEnd).catch(() => {});
  fetchRange(nextStart, nextEnd).catch(() => {});
};

export const clearCalendarEventsCache = () => {
  rangeCache.clear();
  inflightRequests.clear();
};

export const calendarEvents: EventSourceFunc = (info, success, failure) => {
  const start = startOfDay(info.start);
  const end = startOfDay(info.end);

  return fetchRange(start, end)
    .then((data) => {
      success(data);
      prefetchAdjacentRanges(start, end);
    })
    .catch(failure);
};
