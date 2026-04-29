import { calendarEvents } from "@cal/pages/calendar/calendar.events";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import { AgendaWidgetWrapper } from "@widgets/agenda/agenda.styles";
import type { FC } from "react";
import type { AgendaWidgetConfig } from "./agenda.types";

export const AgendaWidget: FC<{ config: AgendaWidgetConfig }> = ({ config }) => {
  return (
    <AgendaWidgetWrapper>
      <FullCalendar
        themeSystem="bootstrap5"
        plugins={[dayGrid, timeGrid]}
        initialView="dayGridMonth"
        initialDate={config.currentDay}
        locale={config.language}
        timeZone="UTC"
        firstDay={config.weekStartDay}
        nextDayThreshold={`0${config.overlapThreshold || 0}:00:00`}
        fixedWeekCount
        dayMaxEventRows
        height={500}
        events={calendarEvents}
        eventTimeFormat={config.timeFormat.js}
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
