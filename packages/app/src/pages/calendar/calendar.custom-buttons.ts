import { utcDatePath } from "@cal/utils/date";
import type { CalendarApi } from "@fullcalendar/core/index.js";
import { clearCalendarEventsCache } from "./calendar.events";
import type { CustomButtonInput } from "./calendar.types";

export const changeCalendarUrl = (date?: Date) => {
  let url: string;
  if (date) {
    url = Craft.getCpUrl(`calendar/${utcDatePath(date)}`);
  } else {
    const currentUrl = new URL(window.location.href);
    if (/\/(day|week|month)$/.test(currentUrl.pathname)) {
      currentUrl.pathname = currentUrl.pathname.replace(/\/(day|week|month)$/, "");
    }

    url = currentUrl.toString();
  }

  history.pushState("data", "", url);
};

type Options = {
  datePickerButton: CustomButtonInput;
};

type CreateCustomButtons = (
  api: CalendarApi,
  options: Options,
) => Record<string, CustomButtonInput>;

export const headerToolbarEnd = "refresh datepicker prev,today,next";

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
