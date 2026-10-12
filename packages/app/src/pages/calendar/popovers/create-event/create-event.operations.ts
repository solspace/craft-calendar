import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import translate from "@cal/utils/translations";
import { buildQuickCreateRecurrence } from "./create-event.recurrence";

export type QuickCreateDetails = {
  location?: string;
  description?: string;
};

const inferRepeatEndTypeFromRrule = (rrule?: string): "NEVER" | "AFTER" | "ON_DATE" => {
  if (!rrule) {
    return "NEVER";
  }

  if (/(?:^|;)COUNT=\d+/i.test(rrule)) {
    return "AFTER";
  }

  if (/(?:^|;)UNTIL=/i.test(rrule)) {
    return "ON_DATE";
  }

  return "NEVER";
};

export const buildCreateEventRecurrence = (
  event: CalendarCreateDraft,
): {
  repeatType: string;
  repeatEndType: string;
  rrule?: string;
  until?: number;
} => {
  if (event.recurrence) {
    return buildQuickCreateRecurrence(event) ?? { repeatType: "NEVER", repeatEndType: "NEVER" };
  }
  if (!event.repeatType || event.repeatType === "NEVER") {
    return { repeatType: "NEVER", repeatEndType: "NEVER" };
  }
  const fromRrule = inferRepeatEndTypeFromRrule(event.rrule);
  const repeatEndType = fromRrule !== "NEVER" ? fromRrule : event.repeatEndType || "NEVER";
  return {
    repeatType: event.repeatType,
    repeatEndType,
    rrule: event.rrule || "",
    ...(repeatEndType === "ON_DATE" && event.until != null ? { until: event.until } : {}),
  };
};

export const buildCreateEventPayload = (
  event: CalendarCreateDraft,
  calendarId: number,
  siteId: number,
  details?: QuickCreateDetails,
) => ({
  title: event.title || translate("New Event"),
  start: event.start,
  end: event.end,
  allDay: event.allDay,
  calendarId,
  siteId,
  ...buildCreateEventRecurrence(event),
  ...(details && { details }),
});
