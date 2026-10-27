import { clearCalendarEventsCache } from "@cal/pages/calendar/calendar.events";
import { utcDatePath } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import type { EventApi } from "@fullcalendar/core";
import type FullCalendar from "@fullcalendar/react";
import { type RefObject, useEffect } from "react";
import { css } from "styled-components";

// FullCalendar uses exclusive end dates, including midnight after an all-day event's last day.
export const getWidgetDayEvents = (events: EventApi[], day: Date) =>
  events.filter(
    (event) =>
      event.start &&
      event.start.getTime() < day.getTime() + 86_400_000 &&
      (event.end?.getTime() ?? event.start.getTime() + 1) > day.getTime(),
  );

export const widgetCalendarUrl = (date: Date, view = "month", siteHandle?: string) => {
  const url = new URL(
    Craft.getCpUrl(`calendar/${utcDatePath(date)}/${view}`),
    window.location.origin,
  );
  const site = siteHandle ?? new URLSearchParams(window.location.search).get("site");
  if (site) url.searchParams.set("site", site);
  return url.toString();
};

export const useWidgetResize = (
  wrapper: RefObject<HTMLDivElement | null>,
  calendar: RefObject<FullCalendar | null>,
) => {
  useEffect(() => {
    if (!wrapper.current) return;
    let frame: number;
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => calendar.current?.getApi().updateSize());
          });
    observer?.observe(wrapper.current);
    const refresh = () => calendar.current?.getApi().refetchEvents();
    window.addEventListener("calendar:events-changed", refresh);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("calendar:events-changed", refresh);
    };
  }, [wrapper, calendar]);
};

export const WidgetChevron = ({ next = false }: { next?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d={next ? "m6 3 5 5-5 5" : "m10 3-5 5 5 5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WidgetFooter = ({
  href,
  refresh,
  loading = false,
}: {
  href: string;
  refresh?: () => void;
  loading?: boolean;
}) => (
  <div className="calendar-widget-footer">
    <a href={href}>
      {translate("View calendar")} <span aria-hidden="true">→</span>
    </a>
    {refresh && (
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          clearCalendarEventsCache();
          refresh();
        }}
      >
        {translate(loading ? "Loading…" : "Refresh")}
      </button>
    )}
  </div>
);

export const widgetChrome = css`
  min-width: 0;
  color: var(--text-color, #33404d);

  .calendar-widget-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
    margin-bottom: 12px;
    h3 {
      flex: 1 1 120px;
      margin: 0;
      color: var(--gray-700);
      font-size: 15px;
      font-weight: 600;
      line-height: 28px;
    }
  }

  .calendar-widget-nav {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    flex: 0 0 auto;
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      margin: 0;
      padding: 0 5px;
      border: 0;
      border-radius: 4px;
      background: var(--button-bg, #edf0f5);
      color: var(--gray-600);
      font: inherit;
      font-size: 11px;
      cursor: pointer;
      &:hover { background: var(--button-bg--hover, #e1e7ef); }
      svg { display: block; flex: 0 0 auto; }
    }
  }

  .calendar-widget-view-switcher {
    display: flex;
    min-inline-size: 0;
    border: 0;
    margin: 0 0 12px;
    gap: 2px;
    padding: 3px;
    border-radius: 6px;
    background: var(--gray-100, #edf0f5);
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 0;
      min-width: 0;
      min-height: 28px;
      margin: 0;
      padding: 0 6px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: var(--gray-600);
      font: inherit;
      font-size: 11px;
      line-height: 20px;
      cursor: pointer;
      &[aria-pressed="true"] { background: var(--gray-500); color: white; }
      &:hover:not([aria-pressed="true"]) { background: var(--gray-200); }
    }
  }

  .calendar-widget-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
    font-size: 12px;
    line-height: 20px;
    a { display: inline-flex; align-items: center; gap: 6px; }
    button {
      appearance: none;
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--link-color);
      font: inherit;
      cursor: pointer;
      &:hover { text-decoration: underline; }
      &:disabled { opacity: 0.6; cursor: wait; }
    }
  }

  .calendar-widget-status {
    margin: 8px 0 0;
    color: var(--light-text-color, #596673);
    font-size: 12px;
    line-height: 1.5;
  }

  .calendar-widget-nav button:focus-visible,
  .calendar-widget-view-switcher button:focus-visible,
  .calendar-widget-footer button:focus-visible {
    outline: 2px solid var(--link-color);
    outline-offset: 2px;
  }
`;
