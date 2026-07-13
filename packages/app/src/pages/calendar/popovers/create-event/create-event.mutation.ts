import { usePopover } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { craftFetch } from "@cal/utils/http";
import { generateUrl } from "@cal/utils/urls";
import { useCallback, useState } from "react";
import { clearCalendarEventsCache } from "../../calendar.events";
import { useConfig } from "../../context/config.context";
import { buildCreateEventPayload } from "./create-event.operations";

type UseCreateEventOptions = {
  refetchEvents?: () => void;
  onSuccess?: () => void;
};

export const useCreateEvent = ({ refetchEvents, onSuccess }: UseCreateEventOptions) => {
  const { hidePopover } = usePopover();
  const { currentSiteId } = useConfig();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = useCallback(
    async (event: CalendarCreateDraft, calendarId: number) => {
      setIsFetching(true);
      setError(null);

      try {
        const response = await craftFetch(generateUrl("/api/events"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildCreateEventPayload(event, calendarId, currentSiteId)),
        });

        if (!response.ok) {
          let payload = null;
          try {
            payload = await response.json();
          } catch {
            // The fallback below handles non-JSON error responses.
          }

          let message = payload?.message || "Failed to create event";
          if (Array.isArray(payload?.errors)) {
            message = payload.errors.join(" ");
          }

          throw new Error(message);
        }

        await response.json();

        clearCalendarEventsCache();
        refetchEvents?.();
        onSuccess?.();
        hidePopover();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to create event");
        }
      } finally {
        setIsFetching(false);
      }
    },
    [hidePopover, onSuccess, refetchEvents, currentSiteId],
  );

  return {
    createEvent,
    error,
    isFetching,
  };
};
