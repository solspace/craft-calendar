import type { DateFormats, WeekStartDay } from "@cal/types/config";

export type EventWidgetConfig = {
  formats: DateFormats;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  currentDay: Date;

  calendars: Record<number, string>;
};
