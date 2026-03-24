import { utcDatePath } from "@cal/utils/date";
import type { CalendarApi } from "@fullcalendar/core/index.js";
import { clearCalendarEventsCache } from "./calendar.events";
import type { CustomButtonInput } from "./calendar.types";

export const changeCalendarUrl = (date: Date) => {
  const url = Craft.getCpUrl(`calendar/${utcDatePath(date)}`);
  history.pushState("data", "", url);
};

type Options = {
  datePickerButton: CustomButtonInput;
  sitePickerButton?: CustomButtonInput;
};

type CreateCustomButtons = (
  api: CalendarApi,
  options: Options,
) => Record<string, CustomButtonInput>;

export const getMacroHeaderToolbarEnd = (hasSitePicker: boolean): string =>
  hasSitePicker
    ? "sitepicker refresh datepicker prev,today,next"
    : "refresh datepicker prev,today,next";

export const createCustomButtons: CreateCustomButtons = (
  api,
  { datePickerButton, sitePickerButton },
): Record<string, CustomButtonInput> => {
  const buttons: Record<string, CustomButtonInput> = {
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

  if (sitePickerButton) {
    buttons.sitepicker = sitePickerButton;
  }

  return buttons;
};
