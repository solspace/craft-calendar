export type SiteMap = Record<string, string>;
export type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarConfig = {
  dateFormat: string;
  timeFormat: string;
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
