import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";

export const buildCreateEventPayload = (
  event: CalendarCreateDraft,
  calendarId: number,
  siteId: number,
) => ({
  title: event.title || "New Event",
  start: event.start,
  end: event.end,
  allDay: event.allDay,
  calendarId,
  siteId,
});
