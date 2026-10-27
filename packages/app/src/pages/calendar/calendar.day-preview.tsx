import { OverlapFlag } from "@cal/components/overlap-warning/overlap-warning";
import { usePopover } from "@cal/contexts/popover/popover.context";
import type { DateFormats } from "@cal/types/config";
import { utcDateKey } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import type { EventApi } from "@fullcalendar/core";
import clsx from "clsx";
import { type MouseEvent as ReactMouseEvent, useEffect, useRef } from "react";
import { YearDayPreviewWrapper } from "./calendar.year.styles";

export type CalendarDayPreviewEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color: string;
  cancelled?: boolean;
  calendarName?: string;
  overlapCount?: number;
  editUrl?: string;
};
export type CalendarDayEventSelect = (
  id: string,
  anchor: HTMLElement,
  click: ReactMouseEvent<HTMLButtonElement>,
) => void;

export const getDayPreviewEvents = (events: EventApi[]): CalendarDayPreviewEvent[] =>
  events
    .filter((event) => event.start)
    .sort(
      (a, b) =>
        Number(b.allDay) - Number(a.allDay) ||
        a.start!.getTime() - b.start!.getTime() ||
        a.title.localeCompare(b.title),
    )
    .map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start!,
      end: event.end ?? event.start!,
      allDay: event.allDay,
      color: event.extendedProps.calendarColor || event.backgroundColor,
      calendarName: event.extendedProps.calendarName,
      cancelled: event.extendedProps.cancelled,
      overlapCount: event.extendedProps.overlaps?.count,
      editUrl: event.url,
    }));

export const CalendarDayPreview = ({
  date,
  events,
  anchor,
  onEventSelect,
  language,
  formats,
  compact = false,
  closable = false,
}: {
  date: Date;
  events: CalendarDayPreviewEvent[];
  anchor: HTMLElement;
  onEventSelect: CalendarDayEventSelect;
  language: string;
  formats: DateFormats;
  compact?: boolean;
  closable?: boolean;
}) => {
  const { hidePopover } = usePopover();
  const container = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
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
      if (event.key === "Escape") {
        hidePopover();
        if (closable) anchor.focus({ preventScroll: true });
      }
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
  }, [anchor, hidePopover, closable]);

  useEffect(() => {
    if (!closable) return;
    const frame = requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [closable]);

  const eventTime = (event: CalendarDayPreviewEvent): string => {
    const { start, end } = event;
    if (event.allDay) {
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
    <YearDayPreviewWrapper
      ref={container}
      $compact={compact}
      data-calendar-year-preview
      role={closable ? "dialog" : undefined}
      aria-label={closable ? dateFormatter.format(date) : undefined}
    >
      <div className="day-preview-heading">
        <h3>
          {date.toLocaleDateString(language, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </h3>
        {closable && (
          <button
            ref={closeButton}
            type="button"
            className="day-preview-close"
            aria-label={translate("Close")}
            onClick={() => {
              hidePopover();
              anchor.focus({ preventScroll: true });
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {!events.length && <p className="day-preview-empty">{translate("No events to display")}</p>}
      <ul>
        {events.map((event) => {
          const details = (
            <>
              <span className="year-preview-dot" style={{ backgroundColor: event.color }} />
              <span className="year-preview-details">
                <span className="year-preview-title">
                  <strong>
                    <OverlapFlag count={event.overlapCount} />
                    {event.title}
                  </strong>
                  {event.cancelled && (
                    <span className="year-preview-cancelled">{translate("Cancelled")}</span>
                  )}
                </span>
                <span className="year-preview-time">{eventTime(event)}</span>
                {event.calendarName && (
                  <span className="year-preview-calendar">{event.calendarName}</span>
                )}
              </span>
            </>
          );
          return (
            <li key={event.id}>
              {event.editUrl ? (
                <a href={event.editUrl} className={clsx({ "is-cancelled": event.cancelled })}>
                  {details}
                </a>
              ) : (
                <button
                  type="button"
                  className={clsx({ "is-cancelled": event.cancelled })}
                  onClick={(click) => onEventSelect(event.id, anchor, click)}
                >
                  {details}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </YearDayPreviewWrapper>
  );
};
