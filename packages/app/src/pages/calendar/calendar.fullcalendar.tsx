import { usePopover } from "@cal/contexts/popover/popover.context";
import type { ShowPopoverOptions } from "@cal/contexts/popover/popover.types";
import { UTCifyDateOnly, utcDateKey } from "@cal/utils/date";
import { getCalendarTranslations, getDateLocale } from "@cal/utils/localization";
import type {
  CalendarApi,
  DateSelectArg,
  DatesSetArg,
  DayHeaderContentArg,
  EventApi,
  EventDropArg,
  EventMountArg,
} from "@fullcalendar/core/index.js";
import dayGrid from "@fullcalendar/daygrid";
import interaction, { type DateClickArg, type EventResizeDoneArg } from "@fullcalendar/interaction";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import { addDays } from "date-fns";
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildCreateDraftEventInput,
  buildCreateDraftFromSelection,
  type CalendarCreateDraft,
  isCreateDraftEvent,
  syncCreateDraftEvent,
} from "./calendar.create-session";
import {
  changeCalendarUrl,
  createCustomButtons,
  headerToolbarEnd,
} from "./calendar.custom-buttons";
import { useDateSelector } from "./calendar.date-selector";
import {
  getCalendarEventClassNames,
  getCalendarEventClickAction,
  renderCalendarEventContent,
} from "./calendar.event-content";
import {
  createCalendarEventsSource,
  type EventMutationScope,
  getRecurrenceIdFromId,
  moveEvent,
  resizeEvent,
} from "./calendar.events";
import { useViewSettings, type View } from "./calendar.persistence";
import { CalendarSearch, getCalendarSearch } from "./calendar.search";
import { CalendarWrapper } from "./calendar.styles";
import { useConfig } from "./context/config.context";
import { PopoverCreateEvent } from "./popovers/create-event/create-event";
import { PopoverModifyEvent } from "./popovers/modify-event/modify";
import { PopoverViewEvent } from "./popovers/view-event/view-event";

type CalendarFullcalendarProps = {
  hiddenCalendarIds: number[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  miniDateSelection: Date | null;
  onMiniDateSelectionHandled: () => void;
};

const weekHeaderWeekdayFormatter = new Intl.DateTimeFormat(getDateLocale().code, {
  weekday: "short",
  timeZone: "UTC",
});
const weekHeaderDayFormatter = new Intl.DateTimeFormat(getDateLocale().code, {
  day: "numeric",
  timeZone: "UTC",
});

const calendarViewOptions = {
  dayGridMonth: {
    dayHeaderFormat: {
      weekday: "long" as const,
    },
  },
  listMonth: {
    displayEventEnd: true,
    listDayFormat: { weekday: "long" as const, month: "long" as const, day: "numeric" as const },
    listDaySideFormat: false as const,
  },
};

const hoverPopoverOptions: ShowPopoverOptions = {
  closeDelayMs: 300,
  position: ["bottom", "top", "right", "left"],
};

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}:00`;
};

const isRecurringEvent = (event: EventApi) =>
  Boolean(event.extendedProps?.rrule || event.extendedProps?.repeats);

export const CalendarFullcalendar: FC<CalendarFullcalendarProps> = ({
  hiddenCalendarIds,
  selectedDate,
  onDateChange,
  miniDateSelection,
  onMiniDateSelectionHandled,
}) => {
  const { hidePopover, showPopover } = usePopover();
  const { view, setView, isReady } = useViewSettings();
  const {
    currentDay,
    language,
    formats,
    weekStartDay,
    overlapThresholdString,
    allDayDefault,
    eventDuration,
    timeInterval,
    canEditEvents,
    isDragAndDropEnabled,
    isQuickCreateEnabled,
    currentSiteId,
  } = useConfig();
  const canCreateEvents = canEditEvents && isQuickCreateEnabled;

  const calendar = useRef<FullCalendar>(null);
  const calendarFilterKey = hiddenCalendarIds.join(",");
  const lastCalendarFilterKey = useRef<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isDraggingRef = useRef(false);
  const scopePromptCount = useRef(0);
  const [draft, setDraft] = useState<CalendarCreateDraft | null>(null);
  const [draftAnchorEl, setDraftAnchorEl] = useState<HTMLElement | null>(null);
  const [isFetchingEvents, setIsFetchingEvents] = useState(false);
  const [search, setSearch] = useState(getCalendarSearch);
  const [eventsError, setEventsError] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: The dependency is needed to get the latest calendar instance for the API.
  const getApi = useCallback(() => calendar.current?.getApi(), [calendar.current]);
  const api = useMemo(() => getApi() as CalendarApi, [getApi]);
  const popoverOptions = useMemo<ShowPopoverOptions>(
    () => ({
      alignment: "center",
      position: ["right", "left", "bottom", "top"],
    }),
    [],
  );

  const { datePickerButton, dateSelector } = useDateSelector(api);
  const hiddenCalendarIdSet = useMemo(() => new Set(hiddenCalendarIds), [hiddenCalendarIds]);
  const timeIntervalDuration = formatDuration(timeInterval);
  const events = useMemo(
    () => createCalendarEventsSource(hiddenCalendarIdSet, currentSiteId, undefined, search),
    [hiddenCalendarIdSet, currentSiteId, search],
  );

  const customButtons = useMemo(
    () =>
      createCustomButtons(api, {
        datePickerButton,
      }),
    [datePickerButton, api],
  );

  const refetchEvents = useCallback(() => {
    calendar.current?.getApi().refetchEvents();
  }, []);

  const clearDraft = useCallback(() => {
    setDraft(null);
    setDraftAnchorEl(null);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const calendarApi = calendar.current?.getApi();
    if (!calendarApi) {
      return;
    }

    if (lastCalendarFilterKey.current === null) {
      lastCalendarFilterKey.current = calendarFilterKey;

      return;
    }

    if (lastCalendarFilterKey.current === calendarFilterKey) {
      return;
    }

    lastCalendarFilterKey.current = calendarFilterKey;
    calendarApi.refetchEvents();
  }, [calendarFilterKey, isReady]);

  const cancelDraft = useCallback(() => {
    clearDraft();
    hidePopover();
  }, [clearDraft, hidePopover]);

  const handleSearchChange = useCallback(
    (value: string) => {
      if (value === search) return;
      clearTimeout(hoverTimer.current);
      cancelDraft();
      setSearch(value);
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set("search", value);
      } else {
        url.searchParams.delete("search");
      }
      history.replaceState(null, "", url);
    },
    [search, cancelDraft],
  );

  useEffect(() => {
    const calendarApi = calendar.current?.getApi();
    if (!calendarApi) {
      return;
    }

    const existingDraft = calendarApi.getEvents().find((event) => isCreateDraftEvent(event));
    if (!draft) {
      existingDraft?.remove();

      return;
    }

    if (existingDraft) {
      syncCreateDraftEvent(existingDraft, draft);

      return;
    }

    calendarApi.addEvent(buildCreateDraftEventInput(draft));
  }, [draft]);

  useEffect(() => {
    if (!draft) {
      hidePopover();

      return;
    }

    if (!draftAnchorEl) {
      hidePopover();

      return;
    }

    showPopover(
      <PopoverCreateEvent
        draft={draft}
        onChange={setDraft}
        refetchEvents={refetchEvents}
        onConfirm={clearDraft}
        onCancel={cancelDraft}
      />,
      draftAnchorEl,
      popoverOptions,
    );
  }, [
    cancelDraft,
    clearDraft,
    draft,
    draftAnchorEl,
    hidePopover,
    popoverOptions,
    refetchEvents,
    showPopover,
  ]);

  const handleDraftSelection = useCallback(
    (selection: DateSelectArg) => {
      hidePopover();
      selection.view.calendar
        .getEvents()
        .find((event) => isCreateDraftEvent(event))
        ?.remove();
      setDraftAnchorEl(null);
      setDraft(buildCreateDraftFromSelection(selection, { allDayDefault, eventDuration }));
      selection.view.calendar.unselect();
    },
    [allDayDefault, eventDuration, hidePopover],
  );

  // selectMinDistance requires a drag, so a plain click/tap never starts a selection.
  // Double-clicking a date (month view), day (week view), or hour (day view) creates
  // a single-cell draft the same way a drag-select would, matching Calendar 5.
  const handleDateDoubleClick = useCallback(
    (arg: DateClickArg) => {
      if (arg.jsEvent.detail < 2) {
        return;
      }

      hidePopover();
      api
        .getEvents()
        .find((event) => isCreateDraftEvent(event))
        ?.remove();
      setDraftAnchorEl(null);
      setDraft(
        buildCreateDraftFromSelection(
          {
            start: arg.date,
            end: arg.allDay ? addDays(arg.date, 1) : arg.date,
            allDay: arg.allDay,
          },
          {
            allDayDefault,
            eventDuration,
          },
        ),
      );
    },
    [api, allDayDefault, eventDuration, hidePopover],
  );

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  useEffect(() => {
    const calendarApi = calendar.current?.getApi();
    if (!calendarApi || !miniDateSelection) {
      return;
    }

    calendarApi.changeView(
      calendarApi.view.type === "listMonth" ? "listMonth" : "timeGridDay",
      miniDateSelection,
    );

    changeCalendarUrl(miniDateSelection);

    onMiniDateSelectionHandled();
  }, [miniDateSelection, onMiniDateSelectionHandled]);

  useEffect(() => {
    const calendarApi = calendar.current?.getApi();
    if (!calendarApi || utcDateKey(calendarApi.getDate()) === utcDateKey(selectedDate)) {
      return;
    }

    calendarApi.gotoDate(selectedDate);
  }, [selectedDate]);

  const cancelHoverPopover = useCallback(() => clearTimeout(hoverTimer.current), []);

  const dismissPopoverForInteraction = useCallback(() => {
    isDraggingRef.current = true;
    clearTimeout(hoverTimer.current);
    hidePopover();
  }, [hidePopover]);

  const endInteraction = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleEventDidMount = useCallback((arg: EventMountArg) => {
    if (isCreateDraftEvent(arg.event)) {
      setDraftAnchorEl(arg.el);
    }
  }, []);

  const handleEventWillUnmount = useCallback((arg: EventMountArg) => {
    if (isCreateDraftEvent(arg.event)) {
      setDraftAnchorEl((current) => (current === arg.el ? null : current));
    }
  }, []);

  // Saves a drag or resize. For a recurring event, the user first picks which occurrences it changes.
  const handleEventChange = useCallback(
    (action: "move" | "resize", arg: EventDropArg | EventResizeDoneArg) => {
      if (isCreateDraftEvent(arg.event)) {
        arg.revert();

        return;
      }

      const save = (scope?: EventMutationScope) => {
        const args = {
          event: arg.event,
          recurrenceId: getRecurrenceIdFromId(String(arg.event.id)),
          scope,
          siteId: currentSiteId,
          refetchEvents,
          revert: arg.revert,
        };

        return action === "move"
          ? moveEvent(args)
          : resizeEvent({ ...args, oldEvent: arg.oldEvent });
      };

      if (!isRecurringEvent(arg.event)) {
        void save();

        return;
      }

      // A change that couldn't be saved is reverted, so its prompt has nothing left to save
      const select = async (scope: EventMutationScope) => {
        const saved = await save(scope);
        if (!saved) {
          hidePopover();
        }

        return saved;
      };

      // Each change gets its own prompt, which reverts it when replaced without a choice
      showPopover(
        <PopoverModifyEvent
          key={++scopePromptCount.current}
          action={action}
          onSelect={select}
          onCancel={arg.revert}
        />,
        arg.jsEvent,
      );
    },
    [currentSiteId, hidePopover, refetchEvents, showPopover],
  );

  const handleNavLinkDayClick = useCallback((date: Date) => {
    const utcDate = UTCifyDateOnly(date);

    changeCalendarUrl(utcDate);
    calendar.current?.getApi().changeView("timeGridDay", utcDate);
  }, []);

  const getDayHeaderClassNames = useCallback(
    (arg: { date: Date; view: { type: string } }): string[] => {
      if (arg.view.type !== "timeGridWeek") {
        return [];
      }

      return utcDateKey(arg.date) === utcDateKey(currentDay) ? ["fc-title-today"] : [];
    },
    [currentDay],
  );

  const renderDayHeaderContent = useCallback((arg: DayHeaderContentArg) => {
    if (arg.view.type !== "timeGridWeek") {
      return arg.text;
    }

    const weekday = weekHeaderWeekdayFormatter.format(arg.date);
    const dayNumber = weekHeaderDayFormatter.format(arg.date);

    return (
      <>
        <span className="fc-day-header-label">{weekday}</span>
        <span className="fc-day-header-date">{dayNumber}</span>
      </>
    );
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <CalendarWrapper className={isFetchingEvents ? "is-fetching-events" : undefined}>
      <CalendarSearch initialSearch={search} onSearchChange={handleSearchChange} />
      <FullCalendar
        {...getCalendarTranslations()}
        ref={calendar}
        themeSystem="bootstrap5"
        plugins={[dayGrid, timeGrid, list, interaction]}
        customButtons={customButtons}
        initialView={view}
        initialDate={currentDay}
        height={view === "listMonth" ? "auto" : undefined}
        locale={language}
        views={calendarViewOptions}
        timeZone="UTC"
        firstDay={weekStartDay}
        nextDayThreshold={overlapThresholdString}
        fixedWeekCount
        dayMaxEventRows
        editable={canEditEvents && isDragAndDropEnabled}
        selectable={canCreateEvents}
        selectMirror={false}
        selectMinDistance={5}
        slotDuration={timeIntervalDuration}
        snapDuration={timeIntervalDuration}
        navLinks
        navLinkDayClick={handleNavLinkDayClick}
        select={canCreateEvents ? handleDraftSelection : undefined}
        dateClick={canCreateEvents ? handleDateDoubleClick : undefined}
        dayHeaderClassNames={getDayHeaderClassNames}
        dayHeaderContent={renderDayHeaderContent}
        events={events}
        eventClassNames={getCalendarEventClassNames}
        eventContent={renderCalendarEventContent}
        progressiveEventRendering
        eventTimeFormat={formats.time.short.js}
        loading={(loading) => {
          if (loading) setEventsError(false);
          setIsFetchingEvents(loading);
        }}
        eventSourceFailure={() => setEventsError(true)}
        noEventsContent={() => (
          <span role="status">
            {Craft.t(
              "calendar",
              eventsError
                ? "Couldn’t load events. Use Refresh to try again."
                : isFetchingEvents
                  ? "Loading events…"
                  : search
                    ? "No matching events in this date range."
                    : "No events in this date range.",
            )}
          </span>
        )}
        eventDidMount={handleEventDidMount}
        eventWillUnmount={handleEventWillUnmount}
        eventMouseEnter={(arg) => {
          if (arg.view.type !== "dayGridMonth" && arg.view.type !== "listMonth") {
            return;
          }

          if (isDraggingRef.current) {
            return;
          }

          if (getCalendarEventClickAction(arg.event, arg.jsEvent.target) === "ignore") {
            return;
          }

          clearTimeout(hoverTimer.current);
          hoverTimer.current = setTimeout(
            () => showPopover(<PopoverViewEvent fcEvent={arg} />, arg.el, hoverPopoverOptions),
            300,
          );

          arg.jsEvent.preventDefault();
          arg.jsEvent.stopPropagation();
        }}
        eventMouseLeave={cancelHoverPopover}
        eventDragStart={dismissPopoverForInteraction}
        eventDragStop={endInteraction}
        eventResizeStart={dismissPopoverForInteraction}
        eventResizeStop={endInteraction}
        eventClick={(arg) => {
          if (getCalendarEventClickAction(arg.event, arg.jsEvent.target) !== "open") {
            return;
          }

          showPopover(<PopoverViewEvent fcEvent={arg} />, arg.el);

          arg.jsEvent.preventDefault();
          arg.jsEvent.stopPropagation();
        }}
        eventDrop={(arg) => handleEventChange("move", arg)}
        eventResize={(arg) => handleEventChange("resize", arg)}
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          end: headerToolbarEnd,
        }}
        buttonText={{
          dayGridMonth: Craft.t("calendar", "Month"),
          timeGridWeek: Craft.t("calendar", "Week"),
          timeGridDay: Craft.t("calendar", "Day"),
          listMonth: Craft.t("calendar", "Agenda"),
          today: Craft.t("calendar", "Today"),
        }}
        datesSet={({ view }: DatesSetArg) => {
          onDateChange(view.calendar.getDate());

          setTimeout(() => {
            setView(view.type as View);
            changeCalendarUrl();
          }, 50);
        }}
      />

      {dateSelector}
    </CalendarWrapper>
  );
};
