import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import translate from "@cal/utils/translations";

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

export const buildCreateEventPayload = (
  event: CalendarCreateDraft,
  calendarId: number,
  siteId: number,
  details?: QuickCreateDetails,
) => {
  if (!event.repeatType || event.repeatType === "NEVER") {
    return {
      title: event.title || translate("New Event"),
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      calendarId,
      siteId,
      repeatType: "NEVER" as const,
      repeatEndType: "NEVER" as const,
      ...(details && { details }),
    };
  }

  // Prefer COUNT/UNTIL from the rrule so AI drafts with "for 8 weeks" validate.
  const fromRrule = inferRepeatEndTypeFromRrule(event.rrule);
  const repeatEndType = fromRrule !== "NEVER" ? fromRrule : event.repeatEndType || "NEVER";

  return {
    title: event.title || translate("New Event"),
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    calendarId,
    siteId,
    repeatType: event.repeatType,
    repeatEndType,
    rrule: event.rrule || "",
    ...(repeatEndType === "ON_DATE" && event.until != null ? { until: event.until } : {}),
    ...(details && { details }),
  };
};
