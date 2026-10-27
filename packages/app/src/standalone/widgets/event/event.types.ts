import type { CalendarConfig, DateFormats, WeekStartDay } from "@cal/types/config";

export type EventWidgetConfig = {
  language?: string;
  timezone?: string;
  calendarColors?: CalendarConfig["calendarColors"];
  calendarAllowRepeating?: CalendarConfig["calendarAllowRepeating"];
  quickCreateFields?: CalendarConfig["quickCreateFields"];
  quickCreateRequiredFields?: CalendarConfig["quickCreateRequiredFields"];
  showOverlapWarnings?: boolean;
  showMoreDetails?: boolean;
  formats: DateFormats;
  weekStartDay: WeekStartDay;
  timeInterval: number;
  eventDuration: number;
  allDayDefault: boolean;
  overlapThreshold: number;
  currentSiteId: number;
  siteHandle?: string;
  currentDay: Date;

  calendars: Record<number, string>;
};
