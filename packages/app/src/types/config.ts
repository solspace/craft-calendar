export type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type FullCalendarDateFormat = Intl.DateTimeFormatOptions & {
  meridiem?: "lowercase" | "short" | "narrow" | boolean;
};

type FormatTypes = "date" | "time" | "datetime";
type FormatLengths = "short" | "medium" | "long" | "full";

type FormatOrigins = {
  php: string;
  icu?: string;
  js: FullCalendarDateFormat;
};

export type DateFormats = Record<FormatTypes, Record<FormatLengths, FormatOrigins>>;

export type EventActionIcon =
  | "clone-dashed"
  | "pencil"
  | "calendar-pen"
  | "ban"
  | "rotate-left"
  | "trash";

export type CalendarConfig = {
  eventActionIcons?: Partial<Record<EventActionIcon, string>>;
  calendars: Record<number, string>;
  calendarColors?: Record<number, string | null>;
  quickCreateFields?: Record<number, { location?: string; description?: string }>;
  quickCreateRequiredFields?: Record<number, { location?: boolean; description?: boolean }>;
  formats: DateFormats;
  language: string;
  overlapThreshold: number;
  timeInterval: number;
  eventDuration: number;
  allDayDefault: boolean;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  currentDay: Date;
  isDragAndDropEnabled: boolean;
  isQuickCreateEnabled: boolean;
  isMultiSite: boolean;
  canEditEvents: boolean;
};
