import type { Event } from "@cal/types/event";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const qkEvents = {
  range: (start: Date, end: Date) => ["events", "range", { start, end }] as const,
};

export const useEventsQuery = (start: Date, end: Date) => {
  return useQuery({
    queryKey: qkEvents.range(start, end),
    queryFn: () => {
      return axios
        .get<Event[]>("/api/events", {
          params: {
            start: start.toISOString(),
            end: end.toISOString(),
          },
        })
        .then((res) => res.data);
    },
  });
};
