import type { DateFormats, WeekStartDay } from "@cal/types/config";

export type AgendaWidgetConfig = {
  formats: DateFormats;
  language: string;
  overlapThreshold: number;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  siteHandle?: string;
  currentDay: Date;
  isMultiSite: boolean;

  calendars: string | string[];
  view: "month" | "week" | "day" | "agenda" | null;
  enabledViews?: Array<"month" | "week" | "day" | "agenda">;
};
