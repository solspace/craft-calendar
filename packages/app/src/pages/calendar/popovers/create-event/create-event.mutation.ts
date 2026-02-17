import { usePopover } from "@cal/contexts/popover/popover.context";
import { craftFetch } from "@cal/utils/http";
import { generateUrl } from "@cal/utils/urls";
import { useCallback, useState } from "react";
import type { CreateEventState } from "./create-event";

export const useCreateEvent = () => {
  const { hidePopover } = usePopover();
  const [isFetching, setIsFetching] = useState(false);

  const createEvent = useCallback(
    async (event: CreateEventState) => {
      console.log(event);
      if (!event) {
        return;
      }

      setIsFetching(true);

      const start = event.start;
      const end = event.end;

      try {
        const response = await craftFetch(generateUrl("/api/events"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "New Event",
            start,
            end,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create event");
        }

        const data = await response.json();
        console.log("event created", data);
        hidePopover();
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [hidePopover],
  );

  return {
    createEvent,
    isFetching,
  };
};
