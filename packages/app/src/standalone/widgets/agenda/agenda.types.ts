import type { CalendarConfig } from "@cal/types/config";

export type AgendaWidgetConfig = CalendarConfig & {
  calendars: string[];
  view: "month" | "week" | "day";
};
