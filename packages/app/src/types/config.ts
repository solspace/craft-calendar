export type SiteMap = Record<string, string>;
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

export type CalendarConfig = {
  formats: DateFormats;
  language: string;
  overlapThreshold: number;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  currentDay: Date;
  siteMap: SiteMap;
  allowEventsToBeModifiedByDragAndDrop: boolean;
  isQuickCreateEnabled: boolean;
  isMultiSite: boolean;
  canEditEvents: boolean;
};
