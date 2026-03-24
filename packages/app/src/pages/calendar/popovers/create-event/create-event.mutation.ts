import { usePopover } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { craftFetch } from "@cal/utils/http";
import { generateUrl } from "@cal/utils/urls";
import { useCallback, useState } from "react";
import { clearCalendarEventsCache } from "../../calendar.events";
import { useConfig } from "../../context/config.context";

type UseCreateEventOptions = {
  refetchEvents?: () => void;
  onSuccess?: () => void;
};

export const useCreateEvent = ({ refetchEvents, onSuccess }: UseCreateEventOptions) => {
  const { hidePopover } = usePopover();
  const { currentSiteId } = useConfig();
  const [isFetching, setIsFetching] = useState(false);

  const createEvent = useCallback(
    async (event: CalendarCreateDraft) => {
      if (!event) {
        return;
      }

      setIsFetching(true);

      const { title, start, end, allDay } = event;

      try {
        const response = await craftFetch(generateUrl("/api/events"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title || "New Event",
            start,
            end,
            allDay,
            siteId: currentSiteId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create event");
        }

        await response.json();

        clearCalendarEventsCache();
        refetchEvents?.();
        onSuccess?.();
        hidePopover();
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [hidePopover, onSuccess, refetchEvents, currentSiteId],
  );

  return {
    createEvent,
    isFetching,
  };
};
