import { UTCify, utcDateKey } from "@cal/utils/date";
import type { CalendarApi, EventMountArg } from "@fullcalendar/core";
import { type RefObject, useEffect, useState } from "react";

// The calendar carries floating wall times in UTC fields, including the viewer's clock.
export const getCalendarNow = () => UTCify(new Date());

export const useCalendarClock = () => {
  const [now, setNow] = useState(getCalendarNow);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      setNow(getCalendarNow());
      timer = setTimeout(refresh, 60_000 - (Date.now() % 60_000) + 10);
    };
    const onVisibilityChange = () => {
      if (!document.hidden) refresh();
    };
    refresh();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return now;
};

export const markCalendarEventTime = ({ el, event }: EventMountArg) => {
  el.dataset.calendarEventId = event.id;
};

const createIndicator = (label: string) => {
  const indicator = document.createElement("div");
  indicator.className = "calendar-now-indicator";
  indicator.setAttribute("aria-label", label);
  return indicator;
};

/**
 * Month/list have no native now-indicator slot. Attach presentation-only markers to their
 * rendered cells/rows so they never become events, consume event limits, or enter mutations.
 */
export const useCalendarNowIndicator = (
  root: RefObject<HTMLDivElement | null>,
  getApi: () => CalendarApi | undefined,
  now: Date,
  label: string,
  dateLabel: string,
  ready: boolean,
) => {
  useEffect(() => {
    const element = root.current;
    if (!ready || !element) return;

    let timer: ReturnType<typeof setTimeout>;
    const owned: HTMLElement[] = [];
    const removeMarkers = () => {
      for (const marker of owned) marker.remove();
      owned.length = 0;
    };
    const observe = () =>
      observer.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "data-calendar-event-id"],
      });
    const render = () => {
      observer.disconnect();
      removeMarkers();
      const api = getApi();
      const today = utcDateKey(now);
      const isUpcoming = (element: HTMLElement) => {
        const event = api?.getEventById(element.dataset.calendarEventId ?? "");
        return !event?.allDay && event?.start && event.start > now;
      };
      if (api?.view.type === "dayGridMonth") {
        const cell = element.querySelector<HTMLElement>(
          `.fc-daygrid-day[data-date="${today}"] .fc-daygrid-day-events`,
        );
        if (cell) {
          const events = Array.from(cell.querySelectorAll<HTMLElement>(".fc-event"))
            .map((event) => ({
              event,
              harness: event.closest<HTMLElement>(".fc-daygrid-event-harness"),
            }))
            .filter(({ harness }) => harness && getComputedStyle(harness).visibility !== "hidden");
          const upcoming = events.find(({ event }) => isUpcoming(event));
          const bounds = cell.getBoundingClientRect();
          const lastBottom = Math.max(
            0,
            ...events.map(({ harness }) => harness!.getBoundingClientRect().bottom - bounds.top),
          );
          const more = cell.querySelector<HTMLElement>(".fc-daygrid-more-link");
          const nextTop =
            upcoming?.harness?.getBoundingClientRect().top ?? more?.getBoundingClientRect().top;
          const indicator = createIndicator(label);
          indicator.classList.add("calendar-now-month");
          indicator.title = label;
          indicator.style.top = `${Math.max(4, nextTop === undefined ? lastBottom + 5 : nextTop - bounds.top - 2)}px`;
          cell.append(indicator);
          owned.push(indicator);
        }
      } else if (
        api?.view.type === "listMonth" &&
        now >= api.view.activeStart &&
        now < api.view.activeEnd
      ) {
        const list = element.querySelector<HTMLElement>(".fc-list");
        if (list) {
          let table = list.querySelector<HTMLTableElement>(".fc-list-table");
          if (!table) {
            table = document.createElement("table");
            table.className = "fc-list-table calendar-now-table";
            table.append(document.createElement("tbody"));
            list.prepend(table);
            owned.push(table);
          }
          const body = table.tBodies[0];
          const headers = Array.from(body.querySelectorAll<HTMLTableRowElement>(".fc-list-day"));
          let header = headers.find((row) => row.dataset.date === today);
          const nextDay = headers.find((row) => (row.dataset.date ?? "") > today) ?? null;
          if (!header) {
            header = document.createElement("tr");
            header.className = "fc-list-day fc-day-today calendar-now-day";
            const th = document.createElement("th");
            th.colSpan = 3;
            th.scope = "colgroup";
            const cushion = document.createElement("div");
            cushion.className = "fc-list-day-cushion";
            cushion.textContent = dateLabel;
            const badge = document.createElement("span");
            badge.className = "calendar-agenda-today";
            badge.textContent = Craft.t("calendar", "Today");
            cushion.append(badge);
            th.append(cushion);
            header.append(th);
            body.insertBefore(header, nextDay);
            owned.push(header);
          }
          let before = header.nextElementSibling;
          while (before && !before.classList.contains("fc-list-day")) {
            const event = before as HTMLElement;
            if (isUpcoming(event)) break;
            before = before.nextElementSibling;
          }
          const row = document.createElement("tr");
          row.className = "calendar-now-agenda-row";
          const td = document.createElement("td");
          td.colSpan = 3;
          const indicator = createIndicator(label);
          const text = document.createElement("span");
          text.textContent = label;
          indicator.append(text);
          td.append(indicator);
          row.append(td);
          body.insertBefore(row, before);
          owned.push(row);
        }
      }
      observe();
    };
    const scheduleRender = () => {
      clearTimeout(timer);
      timer = setTimeout(render, 0);
    };
    const observer = new MutationObserver(scheduleRender);
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRender);
    resizeObserver?.observe(element);
    render();
    window.addEventListener("resize", scheduleRender);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleRender);
      removeMarkers();
    };
  }, [root, getApi, now, label, dateLabel, ready]);
};
