import type { EventInput, EventSourceFunc } from "@fullcalendar/core";

export const calendarEvents: EventSourceFunc = (info, success, failure) => {
  const url = new URL(Craft.getCpUrl("calendar/api/events"), window.location.origin);
  url.searchParams.set("start", info.start.toISOString());
  url.searchParams.set("end", info.end.toISOString());

  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: EventInput[] = await response.json();
      success(data);
    })
    .catch(failure);
};
