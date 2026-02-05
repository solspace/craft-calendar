import type { EventInput, EventSourceFunc } from "@fullcalendar/core";
import axios from "axios";

export const macroEvents: EventSourceFunc = (info, success, failure) => {
  axios
    .get<EventInput[]>("/api/events", {
      params: {
        start: info.start,
        end: info.end,
      },
    })
    .then((res) => {
      success(res.data);
    })
    .catch(failure);
};
