import { OverlapFlag } from "@cal/components/overlap-warning/overlap-warning";
import { usePopover } from "@cal/contexts/popover/popover.context";
import { utcDateKey } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import type { EventRenderRange, SpecificViewContentArg } from "@fullcalendar/core";
import { sliceEvents } from "@fullcalendar/core";
import clsx from "clsx";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef } from "react";
import { YearCalendarWrapper, YearDayPreviewWrapper } from "./calendar.year.styles";
import { useConfig } from "./context/config.context";

const utcDate = (year: number, month: number, day: number) => new Date(Date.UTC(year, month, day));

const groupYearEvents = (events: EventRenderRange[]): Map<string, EventRenderRange[]> => {
  const byDay = new Map<string, EventRenderRange[]>();

  for (const event of events) {
    const start = event.range.start;
    const day = utcDate(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
    while (day < event.range.end) {
      const key = utcDateKey(day);
      const dayEvents = byDay.get(key) ?? [];
      dayEvents.push(event);
      byDay.set(key, dayEvents);
      day.setUTCDate(day.getUTCDate() + 1);
    }
  }

  for (const dayEvents of byDay.values()) {
    dayEvents.sort(
      (a, b) =>
        Number(b.def.allDay) - Number(a.def.allDay) ||
        (a.instance?.range.start.getTime() ?? 0) - (b.instance?.range.start.getTime() ?? 0) ||
        a.def.title.localeCompare(b.def.title),
    );
  }

  return byDay;
};

const eventColor = (event: EventRenderRange) =>
  event.def.extendedProps.calendarColor || event.ui.backgroundColor || "#607d9f";

const getDayMarkers = (events: EventRenderRange[]) => {
  const markers = new Map<string, { color: string; cancelled: boolean }>();
  for (const event of events) {
    const cancelled = Boolean(event.def.extendedProps.cancelled);
    const color = eventColor(event);
    const key = cancelled ? "cancelled" : String(event.def.extendedProps.calendar ?? color);
    markers.set(key, { color, cancelled });
  }
  return Array.from(markers.entries());
};

type YearEventSelect = (
  id: string,
  element: HTMLElement,
  event: ReactMouseEvent<HTMLButtonElement>,
) => void;

const YearDayPreview = ({
  date,
  events,
  anchor,
  onEventSelect,
}: {
  date: Date;
  events: EventRenderRange[];
  anchor: HTMLElement;
  onEventSelect: YearEventSelect;
}) => {
  const { hidePopover } = usePopover();
  const { language, formats } = useConfig();
  const container = useRef<HTMLDivElement>(null);
  const dateFormatter = new Intl.DateTimeFormat(language, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const timeFormatter = new Intl.DateTimeFormat(language, {
    ...formats.time.short.js,
    timeZone: "UTC",
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") hidePopover();
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!anchor.contains(target) && !container.current?.contains(target)) hidePopover();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [anchor, hidePopover]);

  const eventTime = (event: EventRenderRange): string => {
    if (!event.instance) return "";
    const { start, end } = event.instance.range;
    if (event.def.allDay) {
      const lastDay = new Date(end.getTime() - 1);
      return utcDateKey(start) === utcDateKey(lastDay)
        ? translate("All Day")
        : `${translate("All Day")} · ${dateFormatter.format(start)} – ${dateFormatter.format(lastDay)}`;
    }
    const sameDay = utcDateKey(start) === utcDateKey(end);
    const startTime = timeFormatter.format(start);
    const endTime = timeFormatter.format(end);
    return sameDay
      ? `${startTime} – ${endTime}`
      : `${dateFormatter.format(start)} ${startTime} – ${dateFormatter.format(end)} ${endTime}`;
  };

  return (
    <YearDayPreviewWrapper ref={container} data-calendar-year-preview>
      <h3>
        {date.toLocaleDateString(language, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </h3>
      <ul>
        {events.map((event) => (
          <li key={event.instance?.instanceId ?? event.def.defId}>
            <button
              type="button"
              className={clsx({ "is-cancelled": event.def.extendedProps.cancelled })}
              onClick={(click) => onEventSelect(event.def.publicId, anchor, click)}
            >
              <span className="year-preview-dot" style={{ backgroundColor: eventColor(event) }} />
              <span className="year-preview-details">
                <span className="year-preview-title">
                  <strong>
                    <OverlapFlag count={event.def.extendedProps.overlaps?.count} />
                    {event.def.title}
                  </strong>
                  {event.def.extendedProps.cancelled && (
                    <span className="year-preview-cancelled">{translate("Cancelled")}</span>
                  )}
                </span>
                <span className="year-preview-time">{eventTime(event)}</span>
                {event.def.extendedProps.calendarName && (
                  <span className="year-preview-calendar">
                    {event.def.extendedProps.calendarName}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </YearDayPreviewWrapper>
  );
};

export const CalendarYear = ({
  content,
  disabled,
  loading,
  error,
  search,
  onDateSelect,
  onMonthSelect,
  onEventSelect,
}: {
  content: SpecificViewContentArg;
  disabled: boolean;
  loading: boolean;
  error: boolean;
  search: string;
  onDateSelect: (date: Date) => void;
  onMonthSelect: (date: Date) => void;
  onEventSelect: YearEventSelect;
}) => {
  const { language, weekStartDay } = useConfig();
  const { showPopover, hidePopover } = usePopover();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const year = content.dateProfile.currentRange.start.getUTCFullYear();
  const byDay = useMemo(() => groupYearEvents(sliceEvents(content, true)), [content]);
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(language, { month: "long", timeZone: "UTC" }),
    [language],
  );
  const weekdayFormatter = useMemo(
    () => new Intl.DateTimeFormat(language, { weekday: "narrow", timeZone: "UTC" }),
    [language],
  );
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    utcDate(2023, 0, 1 + weekStartDay + index),
  );
  const todayKey = utcDateKey(new Date());

  useEffect(
    () => () => {
      clearTimeout(hoverTimer.current);
      hidePopover();
    },
    [hidePopover],
  );
  // biome-ignore lint/correctness/useExhaustiveDependencies: Discard previews when the visible year or its event data changes.
  useEffect(() => {
    clearTimeout(hoverTimer.current);
    hidePopover();
  }, [hidePopover, content.eventStore, year, disabled, loading]);

  const previewDay = (date: Date, events: EventRenderRange[], anchor: HTMLElement) => {
    if (disabled || loading || !events.length) return;
    showPopover(
      <YearDayPreview date={date} events={events} anchor={anchor} onEventSelect={onEventSelect} />,
      anchor,
      { position: ["bottom", "top", "right", "left"], closeDelayMs: 300 },
    );
  };

  return (
    <YearCalendarWrapper>
      <div className="calendar-year-grid">
        {Array.from({ length: 12 }, (_, month) => {
          const firstDay = utcDate(year, month, 1);
          const monthName = monthFormatter.format(firstDay);
          const leadingDays = (firstDay.getUTCDay() - weekStartDay + 7) % 7;
          const daysInMonth = utcDate(year, month + 1, 0).getUTCDate();
          return (
            <section key={month} className="calendar-year-month" aria-label={monthName}>
              <h3>
                <button type="button" disabled={disabled} onClick={() => onMonthSelect(firstDay)}>
                  {monthName}
                </button>
              </h3>
              <div className="calendar-year-weekdays" aria-hidden="true">
                {weekdays.map((day) => (
                  <span key={day.getUTCDay()}>{weekdayFormatter.format(day)}</span>
                ))}
              </div>
              <div className="calendar-year-days">
                {Array.from({ length: 42 }, (_, index) => {
                  const dayNumber = index - leadingDays + 1;
                  if (dayNumber < 1 || dayNumber > daysInMonth) return <span key={index} />;
                  const date = utcDate(year, month, dayNumber);
                  const key = utcDateKey(date);
                  const events = byDay.get(key) ?? [];
                  const markers = getDayMarkers(events);
                  const dateLabel = date.toLocaleDateString(language, {
                    dateStyle: "full",
                    timeZone: "UTC",
                  });
                  const countLabel = translate(
                    events.length === 1 ? "{count} event" : "{count} events",
                    { count: events.length },
                  );
                  const cancelledCount = events.filter(
                    (event) => event.def.extendedProps.cancelled,
                  ).length;
                  return (
                    <button
                      key={index}
                      type="button"
                      className={clsx("calendar-year-day", {
                        "is-today": key === todayKey,
                        "has-events": events.length > 0,
                      })}
                      data-date={key}
                      aria-label={`${dateLabel}, ${countLabel}${cancelledCount ? `, ${translate("Cancelled")}: ${cancelledCount}` : ""}`}
                      aria-current={key === todayKey ? "date" : undefined}
                      disabled={disabled}
                      onClick={() => {
                        clearTimeout(hoverTimer.current);
                        onDateSelect(date);
                      }}
                      onMouseEnter={(event) => {
                        const anchor = event.currentTarget;
                        clearTimeout(hoverTimer.current);
                        hoverTimer.current = setTimeout(
                          () => previewDay(date, events, anchor),
                          300,
                        );
                      }}
                      onMouseLeave={() => clearTimeout(hoverTimer.current)}
                      onFocus={(event) => {
                        clearTimeout(hoverTimer.current);
                        previewDay(date, events, event.currentTarget);
                      }}
                      onBlur={(event) => {
                        if (
                          !(event.relatedTarget instanceof HTMLElement) ||
                          !event.relatedTarget.closest("[data-calendar-year-preview]")
                        )
                          hidePopover();
                      }}
                    >
                      <span className="calendar-year-day-number">{dayNumber}</span>
                      <span className="calendar-year-markers" aria-hidden="true">
                        {markers.slice(0, 3).map(([markerKey, marker]) => (
                          <span
                            key={markerKey}
                            className={clsx("calendar-year-dot", {
                              "is-cancelled": marker.cancelled,
                            })}
                            style={{ backgroundColor: marker.color }}
                          />
                        ))}
                        {markers.length > 3 && <span className="calendar-year-more">+</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <div className="calendar-year-footer">
        <span role="status">
          {translate(
            error
              ? "Couldn’t load events. Use Refresh to try again."
              : loading
                ? "Loading events…"
                : byDay.size
                  ? "Hover a date to preview its events."
                  : search
                    ? "No matching events in this date range."
                    : "No events in this date range.",
          )}
        </span>
        <span className="calendar-year-legend">
          <span className="calendar-year-dot is-cancelled" aria-hidden="true" />
          {translate("Cancelled")}
        </span>
      </div>
    </YearCalendarWrapper>
  );
};
