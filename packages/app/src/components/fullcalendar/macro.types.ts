import type { CalendarApi } from "@fullcalendar/core";

export type DatePickerPosition = {
  top: number;
  left: number;
};

export type SiteMap = Record<string, string>;
export type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type GetCalendarApi = () => CalendarApi | undefined;

export type MacroCustomButtonInput = {
  text: string;
  icon?: string;
  click: (event: MouseEvent, element: HTMLElement) => void;
};

export type CalendarData = {
  currentDay?: string;
  currentSiteId?: string | number;
  firstDayOfWeek?: number | string;
  siteMap?: string | Record<string, unknown>;
};
