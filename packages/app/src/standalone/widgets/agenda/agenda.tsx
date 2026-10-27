import { PopoverProvider, usePopover } from "@cal/contexts/popover/popover.context";
import {
  type AgendaRange,
  AgendaRangeSelector,
  getAgendaRangeOptions,
} from "@cal/pages/calendar/calendar.agenda-range";
import { CalendarDayPreview, getDayPreviewEvents } from "@cal/pages/calendar/calendar.day-preview";
import {
  getCalendarEventClassNames,
  renderCalendarEventContent,
} from "@cal/pages/calendar/calendar.event-content";
import { createCalendarEventsSource } from "@cal/pages/calendar/calendar.events";
import {
  markCalendarEventTime,
  useCalendarClock,
  useCalendarNowIndicator,
} from "@cal/pages/calendar/calendar.now-indicator";
import { getCalendarTranslations } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import dayGrid from "@fullcalendar/daygrid";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getWidgetDayEvents,
  useWidgetResize,
  WidgetChevron,
  WidgetFooter,
  widgetCalendarUrl,
} from "../widget.shared";
import { AgendaWidgetWrapper } from "./agenda.styles";
import type { AgendaWidgetConfig } from "./agenda.types";

const NO_HIDDEN_CALENDARS = new Set<number>();
const views = {
  day: "timeGridDay",
  week: "timeGridWeek",
  month: "dayGridMonth",
  agenda: "listMonth",
} as const;
const viewLabels = { day: "Day", week: "Week", month: "Month", agenda: "Agenda" };
type WidgetView = keyof typeof views;

export const AgendaWidget: FC<{ config: AgendaWidgetConfig }> = ({ config }) => (
  <PopoverProvider>
    <AgendaCalendar config={config} />
  </PopoverProvider>
);

const AgendaCalendar: FC<{ config: AgendaWidgetConfig }> = ({ config }) => {
  const calendar = useRef<FullCalendar>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const now = useCalendarClock();
  const enabledViews = useMemo(() => {
    const all = Object.keys(views) as WidgetView[];
    const enabled = all.filter(
      (view) => !config.enabledViews || config.enabledViews.includes(view),
    );
    return enabled.length ? enabled : all;
  }, [config.enabledViews]);
  const [view, setView] = useState<WidgetView>(
    config.view && enabledViews.includes(config.view)
      ? config.view
      : enabledViews.includes("month")
        ? "month"
        : enabledViews[0],
  );
  const [date, setDate] = useState(now);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [agendaRange, setAgendaRange] = useState<AgendaRange>("month");
  const previousRange = useRef(agendaRange);
  const getApi = useCallback(() => calendar.current?.getApi(), []);
  const { showPopover, hidePopover } = usePopover();
  const moreLinkCleanup = useRef(new WeakMap<HTMLElement, () => void>());
  useEffect(() => {
    if (previousRange.current === agendaRange) return;
    previousRange.current = agendaRange;
    if (view === "agenda") getApi()?.refetchEvents();
  }, [agendaRange, getApi, view]);
  useWidgetResize(wrapper, calendar);
  const scrollToToday = useCallback(() => {
    const marker = wrapper.current?.querySelector<HTMLElement>(".calendar-now-agenda-row");
    const scroller = marker?.closest<HTMLElement>(".fc-scroller");
    if (marker && scroller) {
      scroller.scrollTop +=
        marker.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 48;
    }
  }, []);
  useEffect(() => {
    if (view !== "agenda" || loading) return;
    // The presentation-only Now row is attached after FullCalendar renders its events.
    const revealToday = () => {
      if (!wrapper.current?.querySelector(".calendar-now-agenda-row")) return;
      scrollToToday();
      observer.disconnect();
    };
    const observer = new MutationObserver(revealToday);
    if (wrapper.current) observer.observe(wrapper.current, { childList: true, subtree: true });
    const frame = requestAnimationFrame(revealToday);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [view, loading, scrollToToday]);

  const events = useMemo(
    () => createCalendarEventsSource(NO_HIDDEN_CALENDARS, config.currentSiteId, config.calendars),
    [config.currentSiteId, config.calendars],
  );
  const nowLabel = `${translate("Now")} · ${new Intl.DateTimeFormat(config.language, {
    ...config.formats.time.short.js,
    timeZone: "UTC",
  }).format(now)}`;
  useCalendarNowIndicator(
    wrapper,
    getApi,
    now,
    nowLabel,
    new Intl.DateTimeFormat(config.language, {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(now),
    true,
  );

  return (
    <AgendaWidgetWrapper ref={wrapper} data-view={view} aria-busy={loading}>
      <div className="calendar-widget-heading">
        <h3 aria-live="polite">{title}</h3>
        <div className="calendar-widget-nav">
          <button type="button" aria-label={translate("Previous")} onClick={() => getApi()?.prev()}>
            <WidgetChevron />
          </button>
          <button
            type="button"
            onClick={() => {
              getApi()?.today();
              requestAnimationFrame(scrollToToday);
            }}
          >
            {translate("Today")}
          </button>
          <button type="button" aria-label={translate("Next")} onClick={() => getApi()?.next()}>
            <WidgetChevron next />
          </button>
        </div>
      </div>
      {enabledViews.length > 1 && (
        <fieldset className="calendar-widget-view-switcher" aria-label={translate("Calendar View")}>
          {enabledViews.map((next) => (
            <button
              key={next}
              type="button"
              aria-pressed={view === next}
              onClick={() => {
                setView(next);
                getApi()?.changeView(views[next]);
              }}
            >
              {translate(viewLabels[next])}
            </button>
          ))}
        </fieldset>
      )}
      {view === "agenda" && (
        <div className="calendar-widget-agenda-range">
          <AgendaRangeSelector range={agendaRange} onChange={setAgendaRange} disabled={loading} />
        </div>
      )}
      <div className="calendar-widget-grid">
        <FullCalendar
          {...getCalendarTranslations()}
          ref={calendar}
          plugins={[dayGrid, timeGrid, list]}
          views={{ listMonth: getAgendaRangeOptions(agendaRange) }}
          initialView={views[view]}
          initialDate={config.currentDay}
          locale={config.language}
          timeZone="UTC"
          now={now}
          nowIndicator
          firstDay={config.weekStartDay}
          nextDayThreshold={`0${config.overlapThreshold || 0}:00:00`}
          fixedWeekCount={false}
          dayMaxEvents={2}
          moreLinkContent={({ num }) => `+${num}`}
          moreLinkDidMount={({ el }) => {
            const showDay = (event: Event) => {
              if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ")
                return;
              event.preventDefault();
              event.stopImmediatePropagation();
              const key = el.closest<HTMLElement>("[data-date]")?.dataset.date;
              if (!key) return;
              const day = new Date(`${key}T00:00:00Z`);
              const events = getDayPreviewEvents(
                getWidgetDayEvents(getApi()?.getEvents() ?? [], day),
              );
              showPopover(
                <CalendarDayPreview
                  compact
                  closable
                  date={day}
                  events={events}
                  anchor={el}
                  language={config.language}
                  formats={config.formats}
                  onEventSelect={() => {}}
                />,
                el,
                { position: ["bottom", "top", "right", "left"] },
              );
            };
            el.setAttribute("aria-haspopup", "dialog");
            el.removeAttribute("aria-expanded");
            el.addEventListener("click", showDay, true);
            el.addEventListener("keydown", showDay, true);
            moreLinkCleanup.current.set(el, () => {
              el.removeEventListener("click", showDay, true);
              el.removeEventListener("keydown", showDay, true);
            });
          }}
          moreLinkWillUnmount={({ el }) => moreLinkCleanup.current.get(el)?.()}
          height={view === "month" ? "auto" : 400}
          events={events}
          eventClassNames={getCalendarEventClassNames}
          eventContent={renderCalendarEventContent}
          eventDidMount={(arg) => {
            markCalendarEventTime(arg);
            arg.el.title = arg.event.title;
            arg.el.setAttribute("aria-label", arg.event.title);
          }}
          eventTimeFormat={config.formats.time.short.js}
          displayEventEnd={view === "agenda"}
          headerToolbar={false}
          navLinks={enabledViews.includes("day")}
          navLinkDayClick={(day) => {
            setView("day");
            getApi()?.changeView("timeGridDay", day);
          }}
          dayHeaderFormat={{ weekday: "short", day: view === "week" ? "numeric" : undefined }}
          listDayFormat={{ weekday: "long", month: "short", day: "numeric" }}
          listDaySideFormat={false}
          noEventsContent={translate(
            error
              ? "Couldn’t load events. Use Refresh to try again."
              : loading
                ? "Loading events…"
                : "No events in this date range.",
          )}
          loading={(pending) => {
            if (pending) {
              setError(false);
              hidePopover();
            }
            setLoading(pending);
          }}
          eventSourceFailure={() => setError(true)}
          datesSet={({ view: activeView }) => {
            hidePopover();
            setTitle(activeView.title);
            setDate(activeView.calendar.getDate());
          }}
          editable={false}
          selectable={false}
        />
      </div>
      {error && (
        <p className="calendar-widget-status" role="alert">
          {translate("Couldn’t load events. Use Refresh to try again.")}
        </p>
      )}
      <WidgetFooter
        href={widgetCalendarUrl(date, view, config.siteHandle)}
        loading={loading}
        refresh={() => getApi()?.refetchEvents()}
      />
    </AgendaWidgetWrapper>
  );
};
