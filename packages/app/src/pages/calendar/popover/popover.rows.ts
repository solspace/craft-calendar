import type { EventApi } from "@fullcalendar/core/index.js";
import { format, subDays } from "date-fns";

export const getPopupRows = (event: EventApi): Array<[string, string]> => {
  const allDay = event.allDay;
  const repeats = Boolean(event.extendedProps.repeats ?? event.extendedProps.rrule);

  return [
    [Craft.t("calendar", "Starts"), formatEventDate(event.start, allDay)],
    [Craft.t("calendar", "Ends"), formatEventDate(event.end, allDay, true)],
    [Craft.t("calendar", "All Day"), Craft.t("calendar", allDay ? "Yes" : "No")],
    [Craft.t("calendar", "Repeats"), Craft.t("calendar", repeats ? "Yes" : "No")],
  ];
};

const formatEventDate = (date: Date | null, allDay: boolean, isEnd = false): string => {
  if (!date) {
    return Craft.t("calendar", "N/A");
  }

  if (allDay && isEnd) {
    return format(subDays(date, 1), "PPP");
  }

  return format(date, allDay ? "PPP" : "PPP p");
};
