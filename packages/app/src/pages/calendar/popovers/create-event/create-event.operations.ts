import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import translate from "@cal/utils/translations";
import { buildQuickCreateRecurrence } from "./create-event.recurrence";

export type QuickCreateDetails = {
  location?: string;
  description?: string;
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
  ...buildQuickCreateRecurrence(event),
  ...(details && { details }),
});
