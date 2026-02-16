import { usePopover } from "@cal/contexts/popover/popover.context";
import dayGrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { type FC, useCallback, useMemo, useRef } from "react";
import { createCustomButtons, getMacroHeaderToolbarEnd } from "./calendar.custom-buttons";
import { getMacroCalendarData } from "./calendar.data";
import { useDateSelector } from "./calendar.date-selector";
import { calendarEvents } from "./calendar.events";
import { useViewSettings, type View } from "./calendar.persistence";
import { useSitePicker } from "./calendar.site-picker";
import { CalendarWrapper } from "./calendar.styles";
import { PopoverCreateEvent } from "./popovers/create-event/create-event";

export const CalendarFullcalendar: FC = () => {
  const $calendar = useMemo(() => $("#calendar-app"), []);
  const { showPopover } = usePopover();
  const { view, setView } = useViewSettings();
  const { currentDay, currentSiteId, siteMap, weekStartDay } = useMemo(
    () => getMacroCalendarData($calendar),
    [$calendar],
  );

  const calendar = useRef<FullCalendar>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: The dependency is needed to get the latest calendar instance for the API.
  const getApi = useCallback(() => calendar.current?.getApi(), [calendar.current]);
  const api = useMemo(() => getApi(), [getApi]);

  const { hasSitePicker, sitePickerButton } = useSitePicker({
    $calendar,
    currentSiteId,
    siteMap,
    api,
  });

  const { datePickerButton, dateSelector } = useDateSelector({
    api,
    weekStartDay,
  });

  const changeUrl = useCallback(() => {
    const url = Craft.getCpUrl(`calendar/${format(api.getDate(), "yyyy/MM/dd")}`);
    history.pushState("data", "", url);
  }, [api]);

  const customButtons = useMemo(
    () =>
      createCustomButtons({
        onPrev: () => {
          api.prev();
          changeUrl();
        },
        onNext: () => {
          api.next();
          changeUrl();
        },
        onToday: () => {
          api.today();
          changeUrl();
        },
        onRefresh: () => {
          api.refetchEvents();
        },
        datePickerButton,
        sitePickerButton,
      }),
    [datePickerButton, api, sitePickerButton, changeUrl],
  );

  return (
    <CalendarWrapper>
      <FullCalendar
        ref={calendar}
        themeSystem="bootstrap5"
        plugins={[dayGrid, timeGrid, list, interaction]}
        customButtons={customButtons}
        initialView={view}
        initialDate={currentDay}
        firstDay={weekStartDay}
        eventClick={(arg) => {
          console.log(arg);
          showPopover(<div>{arg.event.title}</div>, arg.el);
        }}
        dateClick={(arg) => {
          console.log(arg);
          showPopover(<PopoverCreateEvent event={arg} />, arg.dayEl, {
            alignment: "center",
            position: ["right", "bottom", "left"],
          });
        }}
        events={calendarEvents}
        eventChange={console.log}
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: getMacroHeaderToolbarEnd(hasSitePicker),
        }}
        datesSet={({ view }) => {
          setTimeout(() => {
            setView(view.type as View);
          }, 50);
        }}
      />

      {dateSelector}
    </CalendarWrapper>
  );
};
