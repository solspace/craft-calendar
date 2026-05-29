import { usePopover } from "@cal/contexts/popover/popover.context";
import type { ShowPopoverOptions } from "@cal/contexts/popover/popover.types";
import { UTCifyDateOnly, utcDateKey } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import type {
  CalendarApi,
  DateSelectArg,
  DayHeaderContentArg,
  EventApi,
  EventDropArg,
  EventMountArg,
} from "@fullcalendar/core/index.js";
import dayGrid from "@fullcalendar/daygrid";
import interaction, { type EventResizeDoneArg } from "@fullcalendar/interaction";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
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
  getMacroHeaderToolbarEnd,
} from "./calendar.custom-buttons";
import { useDateSelector } from "./calendar.date-selector";
import {
  getCalendarEventClassNames,
  getCalendarEventClickAction,
  renderCalendarEventContent,
} from "./calendar.event-content";
import { calendarEvents, getOccurrenceDateFromId, moveEvent, resizeEvent } from "./calendar.events";
import { useViewSettings, type View } from "./calendar.persistence";
import { useSitePicker } from "./calendar.site-picker";
import { CalendarWrapper } from "./calendar.styles";
import { useConfig } from "./context/config.context";
import { PopoverCreateEvent } from "./popovers/create-event/create-event";
import { PopoverModifyEvent } from "./popovers/modify-event/modify";
import { PopoverViewEvent } from "./popovers/view-event/view-event";

export const CalendarFullcalendar: FC = () => {
  const { hidePopover, showPopover } = usePopover();
  const { view, setView, isReady } = useViewSettings();
  const { currentDay, language, formats, weekStartDay, overlapThresholdString, canEditEvents, allowEventsToBeModifiedByDragAndDrop } = useConfig();

  const calendar = useRef<FullCalendar>(null);
  const [draft, setDraft] = useState<CalendarCreateDraft | null>(null);
  const [draftAnchorEl, setDraftAnchorEl] = useState<HTMLElement | null>(null);

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

  const { hasSitePicker, sitePickerButton } = useSitePicker(api);
  const { datePickerButton, dateSelector } = useDateSelector(api);

  const customButtons = useMemo(
    () =>
      createCustomButtons(api, {
        datePickerButton,
        sitePickerButton,
      }),
    [datePickerButton, api, sitePickerButton],
  );

  const isRecurringEvent = (event: EventApi) =>
    Boolean(event.extendedProps?.rrule || event.extendedProps?.repeats);

  const refetchEvents = useCallback(() => {
    calendar.current?.getApi().refetchEvents();
  }, []);

  const clearDraft = useCallback(() => {
    setDraft(null);
    setDraftAnchorEl(null);
  }, []);

  const cancelDraft = useCallback(() => {
    clearDraft();
    hidePopover();
  }, [clearDraft, hidePopover]);

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
      setDraft(buildCreateDraftFromSelection(selection));
      selection.view.calendar.unselect();
    },
    [hidePopover],
  );

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

  const handleRecurringMove = useCallback(
    (arg: EventDropArg) => {
      const occurrenceDate = getOccurrenceDateFromId(String(arg.event.id), arg.event.allDay);

      showPopover(
        <PopoverModifyEvent
          actionLabel={translate("moving")}
          onOnlyThisOccurrence={async () => {
            const wasMoved = await moveEvent({
              event: arg.event,
              occurrenceDate,
              scope: "occurrence",
              refetchEvents,
              revert: arg.revert,
            });

            if (wasMoved) {
              hidePopover();
            }
          }}
          onAllOccurrences={async () => {
            const wasMoved = await moveEvent({
              event: arg.event,
              occurrenceDate,
              scope: "series",
              refetchEvents,
              revert: arg.revert,
            });

            if (wasMoved) {
              hidePopover();
            }
          }}
          onCancel={arg.revert}
        />,
        arg.jsEvent,
      );
    },
    [hidePopover, refetchEvents, showPopover],
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

    const weekday = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      timeZone: "UTC",
    }).format(arg.date);
    const dayNumber = new Intl.DateTimeFormat(undefined, {
      day: "numeric",
      timeZone: "UTC",
    }).format(arg.date);

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
    <CalendarWrapper>
      <FullCalendar
        ref={calendar}
        themeSystem="bootstrap5"
        plugins={[dayGrid, timeGrid, list, interaction]}
        customButtons={customButtons}
        initialView={view}
        initialDate={currentDay}
        locale={language}
        timeZone="UTC"
        firstDay={weekStartDay}
        nextDayThreshold={overlapThresholdString}
        fixedWeekCount
        dayMaxEventRows
        editable={canEditEvents && allowEventsToBeModifiedByDragAndDrop}
        selectable
        selectMirror={false}
        selectMinDistance={5}
        navLinks
        navLinkDayClick={handleNavLinkDayClick}
        select={handleDraftSelection}
        dayHeaderClassNames={getDayHeaderClassNames}
        dayHeaderContent={renderDayHeaderContent}
        events={calendarEvents}
        eventClassNames={getCalendarEventClassNames}
        eventContent={renderCalendarEventContent}
        eventTimeFormat={formats.time.short.js}
        eventDidMount={handleEventDidMount}
        eventWillUnmount={handleEventWillUnmount}
        eventClick={(arg) => {
          const action = getCalendarEventClickAction(arg.event, arg.jsEvent.target);
          if (action !== "open") {
            return;
          }

          showPopover(<PopoverViewEvent fcEvent={arg} />, arg.el);

          arg.jsEvent.preventDefault();
          arg.jsEvent.stopPropagation();
        }}
        eventDrop={(arg) => {
          if (isCreateDraftEvent(arg.event)) {
            arg.revert();

            return;
          }

          if (isRecurringEvent(arg.event)) {
            handleRecurringMove(arg);

            return;
          }

          void moveEvent({
            event: arg.event,
            refetchEvents,
            revert: arg.revert,
          });
        }}
        eventResize={(arg: EventResizeDoneArg) => {
          if (isCreateDraftEvent(arg.event)) {
            arg.revert();

            return;
          }

          void resizeEvent({
            event: arg.event,
            oldEvent: arg.oldEvent,
            refetchEvents,
            revert: arg.revert,
          });
        }}
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: getMacroHeaderToolbarEnd(hasSitePicker),
        }}
        buttonText={{
          dayGridMonth: Craft.t("calendar", "Month"),
          timeGridWeek: Craft.t("calendar", "Week"),
          timeGridDay: Craft.t("calendar", "Day"),
          today: Craft.t("calendar", "Today"),
        }}
        datesSet={({ view }) => {
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
