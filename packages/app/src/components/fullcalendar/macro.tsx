import dayGrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { type FC, useCallback, useMemo, useRef } from "react";
import { getMacroCalendarData } from "./macro.calendar-data";
import { createMacroCustomButtons, getMacroHeaderToolbarEnd } from "./macro.custom-buttons";
import { useMacroDateSelector } from "./macro.date-selector";
import { macroEvents } from "./macro.events";
import { useMacroViewSettings, type View } from "./macro.persistence";
import { useMacroSitePicker } from "./macro.site-picker";
import { MacroWrapper } from "./macro.styles";

export const FullCalendarMacro: FC = () => {
  const $calendar = useMemo(() => $("#calendar-app"), []);
  const { view, setView } = useMacroViewSettings();
  const { currentDay, currentSiteId, siteMap, weekStartDay } = useMemo(
    () => getMacroCalendarData($calendar),
    [$calendar],
  );

  const calendar = useRef<FullCalendar>(null);
  const getApi = useCallback(() => calendar.current?.getApi(), []);

  const { hasSitePicker, sitePickerButton } = useMacroSitePicker({
    $calendar,
    currentSiteId,
    siteMap,
    getApi,
  });

  const { datePickerButton, dateSelector } = useMacroDateSelector({
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
      createMacroCustomButtons({
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
    <MacroWrapper>
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
        events={macroEvents}
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
    </MacroWrapper>
  );
};
