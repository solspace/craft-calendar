import { PopoverProvider, usePopover } from "@cal/contexts/popover/popover.context";
import { CalendarDayPreview, getDayPreviewEvents } from "@cal/pages/calendar/calendar.day-preview";
import { createCalendarEventsSource } from "@cal/pages/calendar/calendar.events";
import { useCalendarClock } from "@cal/pages/calendar/calendar.now-indicator";
import { getCalendarTranslations } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import type { EventApi } from "@fullcalendar/core";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getWidgetDayEvents as getMiniDayEvents,
  useWidgetResize,
  WidgetChevron,
  WidgetFooter,
  widgetCalendarUrl,
} from "../widget.shared";
import { MiniWidgetWrapper } from "./mini.styles";
import type { MiniWidgetConfig } from "./mini.types";

const NO_HIDDEN_CALENDARS = new Set<number>();

export { getWidgetDayEvents as getMiniDayEvents } from "../widget.shared";

export const Mini: FC<{ config: MiniWidgetConfig }> = ({ config }) => (
  <PopoverProvider>
    <MiniCalendarWidget config={config} />
  </PopoverProvider>
);

const MiniCalendarWidget: FC<{ config: MiniWidgetConfig }> = ({ config }) => {
  const calendar = useRef<FullCalendar>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const now = useCalendarClock();
  const [date, setDate] = useState(now);
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState<EventApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { showPopover, hidePopover } = usePopover();
  const previewDay = useCallback(
    (anchor: HTMLElement) => {
      if (loading || error) return;
      const key = anchor.closest<HTMLElement>("[data-date]")?.dataset.date;
      if (!key) return;
      const date = new Date(`${key}T00:00:00Z`);
      const dayEvents = getMiniDayEvents(events, date);
      showPopover(
        <CalendarDayPreview
          compact
          date={date}
          anchor={anchor}
          language={config.language}
          formats={config.formats}
          events={getDayPreviewEvents(dayEvents)}
          onEventSelect={(id) => {
            const event = dayEvents.find((event) => event.id === id);
            if (event?.url) window.location.href = event.url;
          }}
        />,
        anchor,
        { position: ["bottom", "top", "right", "left"], closeDelayMs: 300 },
      );
    },
    [loading, error, events, config.language, config.formats, showPopover],
  );
  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    let timer: ReturnType<typeof setTimeout>;
    hidePopover();
    const anchorFor = (event: Event) =>
      event.target instanceof HTMLElement
        ? event.target.closest<HTMLElement>(".fc-daygrid-day-number[href]")
        : null;
    const onHover = (event: MouseEvent) => {
      const anchor = anchorFor(event);
      if (!anchor || (event.relatedTarget instanceof Node && anchor.contains(event.relatedTarget)))
        return;
      clearTimeout(timer);
      timer = setTimeout(() => previewDay(anchor), 300);
    };
    const onLeave = (event: MouseEvent) => {
      const anchor = anchorFor(event);
      if (anchor && !(event.relatedTarget instanceof Node && anchor.contains(event.relatedTarget)))
        clearTimeout(timer);
    };
    const onFocus = (event: FocusEvent) => {
      const anchor = anchorFor(event);
      if (anchor) {
        clearTimeout(timer);
        previewDay(anchor);
      }
    };
    const onBlur = (event: FocusEvent) => {
      if (
        !(event.relatedTarget instanceof HTMLElement) ||
        !event.relatedTarget.closest("[data-calendar-year-preview]")
      )
        hidePopover();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" || !anchorFor(event)) return;
      const firstEvent = document.querySelector<HTMLElement>(
        "[data-calendar-year-preview] :is(a[href], button)",
      );
      if (firstEvent) {
        event.preventDefault();
        firstEvent.focus();
      }
    };
    element.addEventListener("mouseover", onHover);
    element.addEventListener("mouseout", onLeave);
    element.addEventListener("focusin", onFocus);
    element.addEventListener("focusout", onBlur);
    element.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      hidePopover();
      element.removeEventListener("mouseover", onHover);
      element.removeEventListener("mouseout", onLeave);
      element.removeEventListener("focusin", onFocus);
      element.removeEventListener("focusout", onBlur);
      element.removeEventListener("keydown", onKey);
    };
  }, [hidePopover, previewDay]);
  useWidgetResize(wrapper, calendar);
  const handleEventsSet = useCallback((next: EventApi[]) => setEvents(next), []);
  const source = useMemo(
    () => createCalendarEventsSource(NO_HIDDEN_CALENDARS, config.currentSiteId, config.calendars),
    [config.currentSiteId, config.calendars],
  );

  return (
    <MiniWidgetWrapper ref={wrapper} aria-busy={loading}>
      <div className="calendar-widget-heading">
        <h3 aria-live="polite">{title}</h3>
        <div className="calendar-widget-nav">
          <button
            type="button"
            aria-label={translate("Previous month")}
            onClick={() => calendar.current?.getApi().prev()}
          >
            <WidgetChevron />
          </button>
          <button type="button" onClick={() => calendar.current?.getApi().today()}>
            {translate("Today")}
          </button>
          <button
            type="button"
            aria-label={translate("Next month")}
            onClick={() => calendar.current?.getApi().next()}
          >
            <WidgetChevron next />
          </button>
        </div>
      </div>
      <FullCalendar
        {...getCalendarTranslations()}
        ref={calendar}
        plugins={[dayGrid]}
        initialView="dayGridMonth"
        initialDate={config.currentDay}
        locale={config.language}
        timeZone="UTC"
        now={now}
        firstDay={config.weekStartDay}
        height="auto"
        events={source}
        eventsSet={handleEventsSet}
        eventContent={() => null}
        dayHeaderFormat={{ weekday: "narrow" }}
        dayCellContent={(arg) => {
          const dayEvents = getMiniDayEvents(events, arg.date);
          const colors = [...new Set(dayEvents.map((event) => event.backgroundColor))].slice(0, 3);
          return (
            <span className="calendar-mini-date">
              <span>{arg.dayNumberText}</span>
              <span className="visually-hidden">
                {translate(dayEvents.length === 1 ? "1 event" : "{count} events", {
                  count: dayEvents.length,
                })}
              </span>
              <span className="calendar-mini-dots" aria-hidden="true">
                {colors.map((color) => (
                  <i key={color} style={{ background: color || "var(--gray-500)" }} />
                ))}
              </span>
            </span>
          );
        }}
        dayCellDidMount={({ el, date, isDisabled }) => {
          if (isDisabled) return;
          el.querySelector(".fc-daygrid-day-number")?.setAttribute(
            "href",
            widgetCalendarUrl(date, "day", config.siteHandle),
          );
        }}
        showNonCurrentDates={false}
        fixedWeekCount={false}
        headerToolbar={false}
        loading={(pending) => {
          if (pending) setError(false);
          setLoading(pending);
        }}
        eventSourceFailure={() => setError(true)}
        datesSet={({ view }) => {
          setDate(view.calendar.getDate());
          setTitle(view.title);
        }}
      />
      {error && (
        <p className="calendar-widget-status" role="alert">
          {translate("Couldn’t load events. Use Refresh to try again.")}
        </p>
      )}
      <WidgetFooter
        href={widgetCalendarUrl(date, "month", config.siteHandle)}
        loading={loading}
        refresh={() => calendar.current?.getApi().refetchEvents()}
      />
    </MiniWidgetWrapper>
  );
};
