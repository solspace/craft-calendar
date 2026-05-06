import type { DateFormats, WeekStartDay } from "@cal/types/config";

export type MiniWidgetConfig = {
  formats: DateFormats;
  language: string;
  overlapThreshold: number;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  currentDay: Date;

  calendars: string[];
};
