import { utcDatePath } from "@cal/utils/date";
import type { CalendarApi } from "@fullcalendar/core/index.js";
import { clearCalendarEventsCache } from "./calendar.events";
import { getUrlView, getViewUrlSuffix, type View } from "./calendar.persistence";
import type { CustomButtonInput } from "./calendar.types";

export const changeCalendarUrl = (date: Date, view?: View) => {
  const currentView = view ?? getUrlView();
  const suffix = currentView ? `/${getViewUrlSuffix(currentView)}` : "";
  const nextUrl = new URL(
    Craft.getCpUrl(`calendar/${utcDatePath(date)}${suffix}`),
    window.location.origin,
  );
  nextUrl.search = window.location.search;

  if (nextUrl.toString() !== window.location.href) {
    history.pushState("data", "", nextUrl.toString());
  }
};

type Options = {
  datePickerButton: CustomButtonInput;
};

type CreateCustomButtons = (
  api: CalendarApi,
  options: Options,
) => Record<string, CustomButtonInput>;

export const headerToolbarEnd = "refresh prev,today,datepicker,next";

export const createCustomButtons: CreateCustomButtons = (
  api,
  { datePickerButton },
): Record<string, CustomButtonInput> => {
  return {
    prev: {
      text: Craft.t("calendar", "Previous"),
      icon: "chevron-left",
      click: () => {
        api.prev();
        changeCalendarUrl(api.getDate());
      },
    },
    next: {
      text: Craft.t("calendar", "Next"),
      icon: "chevron-right",
      click: () => {
        api.next();
        changeCalendarUrl(api.getDate());
      },
    },
    refresh: {
      text: Craft.t("calendar", "Refresh"),
      icon: "refresh",
      click: () => {
        clearCalendarEventsCache();
        api.refetchEvents();
      },
    },
    datepicker: datePickerButton,
  };
};
