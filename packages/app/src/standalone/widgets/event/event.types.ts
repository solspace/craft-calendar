import type { DateFormats, WeekStartDay } from "@cal/types/config";

export type EventWidgetConfig = {
  formats: DateFormats;
  weekStartDay: WeekStartDay;
  timeInterval: number;
  eventDuration: number;
  allDayDefault: boolean;
  overlapThreshold: number;
  currentSiteId: number;
  currentDay: Date;

  calendars: Record<number, string>;
};
