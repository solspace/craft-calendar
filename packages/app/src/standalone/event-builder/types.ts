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
  timeInterval?: number;
  eventDuration?: number;
  allDayDefault?: boolean;
  overlapThreshold?: number;
};

export type SeriesPart = {
  url: string;
  start: number;
};

export type BuilderContext = {
  eventId: number | null;
  siteId: number;
  // Set on a draft made with "Edit this and following": the occurrence the draft continues the event from
  splitAt?: number | null;
  // The events before and after this one in its series
  series?: {
    earlier: SeriesPart | null;
    later: SeriesPart | null;
  };
};

export type BuilderConfig = {
  app: AppConfig;
  event: Event;
  context?: BuilderContext;
};
