export type SiteMap = Record<string, string>;
export type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type FullCalendarDateFormat = Intl.DateTimeFormatOptions & {
  meridiem?: "lowercase" | "short" | "narrow" | boolean;
};

export type DateFormatConfig = {
  php: string;
  js: FullCalendarDateFormat;
  datepicker: string;
};

export type CalendarConfig = {
  dateFormat: DateFormatConfig;
  timeFormat: DateFormatConfig;
  language: string;
  overlapThreshold: number;
  weekStartDay: WeekStartDay;
  currentSiteId: number;
  currentDay: Date;
  siteMap: SiteMap;
  isQuickCreateEnabled: boolean;
  isMultiSite: boolean;
  canEditEvents: boolean;
};
