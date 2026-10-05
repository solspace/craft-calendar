import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import translate from "@cal/utils/translations";

export const buildCreateEventPayload = (
  event: CalendarCreateDraft,
  calendarId: number,
  siteId: number,
) => ({
  title: event.title || translate("New Event"),
  start: event.start,
  end: event.end,
  allDay: event.allDay,
  calendarId,
  siteId,
});
