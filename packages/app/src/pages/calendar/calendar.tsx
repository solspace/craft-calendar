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

export const Calendar: FC = () => {
  const $calendar = useMemo(() => $("#calendar-app"), []);
  const { view, setView } = useViewSettings();
  const { currentDay, currentSiteId, siteMap, weekStartDay } = useMemo(
    () => getMacroCalendarData($calendar),
    [$calendar],
  );

  const calendar = useRef<FullCalendar>(null);
  const getApi = useCallback(() => calendar.current?.getApi(), []);

  const { hasSitePicker, sitePickerButton } = useSitePicker({
    $calendar,
    currentSiteId,
    siteMap,
    getApi,
  });

  const { datePickerButton, dateSelector } = useDateSelector({
    getApi,
    weekStartDay,
  });

  const changeUrl = useCallback(() => {
    const api = getApi();
    if (!api) {
      return;
    }

    const url = Craft.getCpUrl(`calendar/${format(api.getDate(), "yyyy/MM/dd")}`);
    history.pushState("data", "", url);
  }, [getApi]);

  const customButtons = useMemo(
    () =>
      createCustomButtons({
        onPrev: () => {
          getApi()?.prev();
          changeUrl();
        },
        onNext: () => {
          getApi()?.next();
          changeUrl();
        },
        onToday: () => {
          getApi()?.today();
          changeUrl();
        },
        onRefresh: () => {
          getApi()?.refetchEvents();
        },
        datePickerButton,
        sitePickerButton,
      }),
    [datePickerButton, getApi, sitePickerButton, changeUrl],
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
        eventClick={console.log}
        dateClick={console.log}
        events={calendarEvents}
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
        eventChange={console.log}
      />

      {dateSelector}
    </CalendarWrapper>
  );
};
