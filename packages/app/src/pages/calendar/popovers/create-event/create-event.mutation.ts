import { usePopover } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { craftFetch } from "@cal/utils/http";
import translate from "@cal/utils/translations";
import { generateUrl } from "@cal/utils/urls";
import { useCallback, useState } from "react";
import { clearCalendarEventsCache } from "../../calendar.events";
import { useConfig } from "../../context/config.context";
import { buildCreateEventPayload, type QuickCreateDetails } from "./create-event.operations";

type UseCreateEventOptions = {
  refetchEvents?: () => void;
  onSuccess?: () => void;
};

export const useCreateEvent = ({ refetchEvents, onSuccess }: UseCreateEventOptions) => {
  const { hidePopover } = usePopover();
  const { currentSiteId } = useConfig();
  const [pendingAction, setPendingAction] = useState<"create" | "prepare" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveEvent = useCallback(
    async (
      event: CalendarCreateDraft,
      calendarId: number,
      details: QuickCreateDetails | undefined,
      prepare: boolean,
    ): Promise<string | null> => {
      setPendingAction(prepare ? "prepare" : "create");
      setError(null);

      try {
        const payload = buildCreateEventPayload(event, calendarId, currentSiteId, details);
        if (prepare) payload.title = event.title;
        const response = await craftFetch(
          generateUrl(prepare ? "/api/events/prepare" : "/api/events"),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

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

        const result = await response.json();
        if (prepare) {
          if (typeof result?.url !== "string" || !result.url) {
            throw new Error(translate("Couldn’t create event."));
          }
          return result.url;
        }

        clearCalendarEventsCache();
        refetchEvents?.();
        onSuccess?.();
        hidePopover();
        return null;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to create event");
        }
        return null;
      } finally {
        setPendingAction(null);
      }
    },
    [hidePopover, onSuccess, refetchEvents, currentSiteId],
  );

  return {
    createEvent: (event: CalendarCreateDraft, calendarId: number, details?: QuickCreateDetails) =>
      saveEvent(event, calendarId, details, false),
    prepareEvent: (event: CalendarCreateDraft, calendarId: number, details?: QuickCreateDetails) =>
      saveEvent(event, calendarId, details, true),
    error,
    isFetching: pendingAction !== null,
    isOpeningEditor: pendingAction === "prepare",
  };
};
