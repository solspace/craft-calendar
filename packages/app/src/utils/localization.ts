import deCalendar from "@fullcalendar/core/locales/de";
import frCalendar from "@fullcalendar/core/locales/fr";
import itCalendar from "@fullcalendar/core/locales/it";
import nlCalendar from "@fullcalendar/core/locales/nl";
import type { Locale } from "date-fns";
import { de, enGB, enUS, fr, it, nl } from "date-fns/locale";
import translate from "./translations";

// FullCalendar compares this array by reference when rebuilding its date environment.
const calendarLocales = [deCalendar, frCalendar, itCalendar, nlCalendar];

export const getControlPanelLanguage = (): string =>
  typeof document === "undefined" ? "en-US" : document.documentElement.lang || "en-US";

export const getDateLocale = (language = getControlPanelLanguage()): Locale => {
  const code = language.toLowerCase().replaceAll("_", "-");
  if (code === "en-gb") return enGB;
  return ({ de, fr, it, nl } as Record<string, Locale>)[code.split("-")[0]] ?? enUS;
};

export const getDatePickerTranslations = () => ({
  locale: getDateLocale(),
  dateFormat: "P",
  chooseDayAriaLabelPrefix: translate("Choose date"),
  disabledDayAriaLabelPrefix: translate("Unavailable date"),
  weekAriaLabelPrefix: translate("Week"),
  monthAriaLabelPrefix: translate("Month"),
  timeCaption: translate("Time"),
  timeInputLabel: translate("Time"),
  previousMonthAriaLabel: translate("Previous month"),
  previousMonthButtonLabel: translate("Previous month"),
  nextMonthAriaLabel: translate("Next month"),
  nextMonthButtonLabel: translate("Next month"),
  previousYearAriaLabel: translate("Previous year"),
  previousYearButtonLabel: translate("Previous year"),
  nextYearAriaLabel: translate("Next year"),
  nextYearButtonLabel: translate("Next year"),
  ariaLabelClose: translate("Close"),
  weekLabel: translate("Week"),
});

export const getCalendarTranslations = () => ({
  locale: getControlPanelLanguage(),
  locales: calendarLocales,
  buttonText: {
    today: translate("Today"),
    month: translate("Month"),
    week: translate("Week"),
    day: translate("Day"),
    list: translate("Agenda"),
  },
  buttonHints: {
    prev: translate("Previous"),
    next: translate("Next"),
    today: translate("Today"),
  },
  allDayText: translate("All Day"),
  noEventsText: translate("No events to display"),
  moreLinkText: (count: number) => translate("+{count} more", { count }),
  weekText: translate("Week"),
});
