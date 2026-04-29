import { calendarEvents } from "@cal/pages/calendar/calendar.events";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import { AgendaWidgetWrapper } from "@widgets/agenda/agenda.styles";
import { type FC, useLayoutEffect, useRef } from "react";
import type { AgendaWidgetConfig } from "./agenda.types";

export const AgendaWidget: FC<{ config: AgendaWidgetConfig }> = ({ config }) => {
  const calendar = useRef<FullCalendar>(null);
  const { formats, view } = config;

  let initialView: string;
  switch (view) {
    case "day":
      initialView = "timeGridDay";
      break;
    case "week":
      initialView = "timeGridWeek";
      break;
    case "month":
      initialView = "dayGridMonth";
      break;
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        calendar.current?.getApi().updateSize();
      });
    }, 600);
  }, []);

  return (
    <AgendaWidgetWrapper>
      <FullCalendar
        ref={calendar}
        themeSystem="bootstrap5"
        plugins={[dayGrid, timeGrid]}
        initialView={initialView}
        initialDate={config.currentDay}
        locale={config.language}
        timeZone="UTC"
        firstDay={config.weekStartDay}
        nextDayThreshold={`0${config.overlapThreshold || 0}:00:00`}
        fixedWeekCount
        dayMaxEventRows
        height={500}
        events={calendarEvents}
        eventTimeFormat={formats.time.short.js}
        headerToolbar={{
          start: "title",
          end: "prev,today,next",
        }}
        buttonText={{
          today: Craft.t("calendar", "Today"),
        }}
        editable={false}
        selectable={false}
      />
    </AgendaWidgetWrapper>
  );
};
