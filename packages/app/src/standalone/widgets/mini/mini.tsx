import { calendarEvents } from "@cal/pages/calendar/calendar.events";
import { utcDatePath } from "@cal/utils/date";
import type { DayHeaderContentArg, EventInput } from "@fullcalendar/core/index.js";
import dayGrid from "@fullcalendar/daygrid";
import interaction, { type DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { type FC, useCallback, useLayoutEffect, useRef } from "react";
import { MiniWidgetWrapper } from "./mini.styles";
import type { MiniWidgetConfig } from "./mini.types";

export const Mini: FC<{ config: MiniWidgetConfig }> = ({ config }) => {
  const calendar = useRef<FullCalendar>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        calendar.current?.getApi().updateSize();
      });
    }, 600);
  }, []);

  const renderDayHeaderContent = useCallback((arg: DayHeaderContentArg) => {
    const weekday = new Intl.DateTimeFormat(undefined, {
      weekday: "narrow",
    }).format(arg.date);

    return <span className="fc-day-header-label">{weekday}</span>;
  }, []);

  const handleDateClick = useCallback((arg: DateClickArg) => {
    window.location.href = Craft.getCpUrl(`calendar/${utcDatePath(arg.date)}/day`);
  }, []);

  return (
    <MiniWidgetWrapper ref={wrapper}>
      <FullCalendar
        ref={calendar}
        themeSystem="bootstrap5"
        height={280}
        plugins={[dayGrid, interaction]}
        timeZone="UTC"
        locale={config.language}
        firstDay={config.weekStartDay}
        initialView={"dayGridMonth"}
        initialDate={config.currentDay}
        nextDayThreshold={`0${config.overlapThreshold || 0}:00:00`}
        events={async (info, success, failure) => {
          const events = (await calendarEvents(info, success, failure)) as EventInput[];

          events.forEach((event) => {
            const date = event.start.toString().slice(0, 10);
            const element = wrapper.current.querySelector(`.fc-day[data-date="${date}"]`);
            element.classList.add("fc-has-event");
          });

          return events;
        }}
        dayHeaderContent={renderDayHeaderContent}
        dateClick={handleDateClick}
        showNonCurrentDates={false}
        fixedWeekCount={false}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
      />
    </MiniWidgetWrapper>
  );
};
