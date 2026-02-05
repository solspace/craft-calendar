import type { CalendarData, SiteMap, WeekStartDay } from "./macro.types";

type MacroCalendarData = {
  currentDay?: string;
  currentSiteId: string | null;
  siteMap: SiteMap;
  weekStartDay: WeekStartDay;
};

export const normalizeWeekStartDay = (value: number): WeekStartDay => {
  const normalized = ((value % 7) + 7) % 7;
  return normalized as WeekStartDay;
};

const parseSiteMap = (siteMap: CalendarData["siteMap"]): SiteMap => {
  if (!siteMap) {
    return {};
  }

  const source =
    typeof siteMap === "string"
      ? (() => {
          try {
            return JSON.parse(siteMap) as Record<string, unknown>;
          } catch {
            return {};
          }
        })()
      : siteMap;

  return Object.entries(source).reduce<SiteMap>((acc, [siteId, siteName]) => {
    if (typeof siteName === "string") {
      acc[siteId] = siteName;
    }

    return acc;
  }, {});
};

export const getMacroCalendarData = (
  $calendar: JQuery<HTMLElement>,
): MacroCalendarData => {
  const data = ($calendar.data() ?? {}) as CalendarData;
  const parsedFirstDayOfWeek = Number(data.firstDayOfWeek ?? 0);

  return {
    currentDay: data.currentDay,
    currentSiteId: data.currentSiteId ? String(data.currentSiteId) : null,
    siteMap: parseSiteMap(data.siteMap),
    weekStartDay: normalizeWeekStartDay(
      Number.isNaN(parsedFirstDayOfWeek) ? 0 : parsedFirstDayOfWeek,
    ),
  };
};
