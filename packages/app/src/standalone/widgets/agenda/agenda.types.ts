import type { DateFormats, WeekStartDay } from "@cal/types/config";

export type AgendaWidgetConfig = {
  formats: DateFormats;
  language: string;
  overlapThreshold: number;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  currentDay: Date;
  isMultiSite: boolean;

  calendars: string[];
  view: "month" | "week" | "day";
};
