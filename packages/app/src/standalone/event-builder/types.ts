import type { DateFormats, WeekStartDay } from "@cal/types/config";

export type RepeatType = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM" | "NEVER";
export type RepeatEndType = "NEVER" | "AFTER" | "ON_DATE";

export type Event = {
  start: number;
  end: number;
  until?: number;
  timezone?: string;

  allDay: boolean;
  repeatType: RepeatType;
  repeatEndType: RepeatEndType;
  rrule?: string;
};

export type AppConfig = {
  pro: boolean;
  formats?: DateFormats;
  weekStartDay?: WeekStartDay;
};

export type BuilderConfig = {
  app: AppConfig;
  event: Event;
};
