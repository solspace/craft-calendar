import { FullCalendarMacro } from "@cal/components/fullcalendar/macro";
import type FullCalendar from "@fullcalendar/react";
import { type FC, useRef } from "react";

export const Calendar: FC = () => {
  const $calendar = $("#calendar-app");
  const { currentDay, siteMap, overlapThreshold, language, firstDayOfWeek, timeFormat } =
    $calendar.data();

  const calendar = useRef<FullCalendar>(null);
  const api = calendar.current?.getApi();

  return <FullCalendarMacro />;
};
