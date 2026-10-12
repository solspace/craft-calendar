import { craftFetch } from "@cal/utils/http";
import { generateUrl } from "@cal/utils/urls";
import { useCallback, useState } from "react";

export type AiGeneratedEvent = {
  title: string;
  description?: string;
  location?: string;
  startTimestamp: number;
  endTimestamp: number;
  allDay: boolean;
  calendarId?: number;
  calendarHandle?: string;
  repeatType?: string;
  repeatEndType?: string;
  until?: number | null;
  rrule?: string;
  timezone?: string;
  changedFields?: string[];
};

/** Snapshot of the event currently on the form, used for partial AI updates. */
export type AiCurrentEvent = {
  title: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  allDay: boolean;
  repeatType?: string;
  rrule?: string;
  calendarId?: number;
  calendarHandle?: string;
};

type GenerateEventResult =
  | { success: true; event: AiGeneratedEvent }
  | { success: false; error: string };

const getBrowserTimezone = (): string | undefined => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
};

export const useGenerateEventAi = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEvent = useCallback(
    async (prompt: string, currentEvent?: AiCurrentEvent | null): Promise<GenerateEventResult> => {
      const trimmed = prompt.trim();
      if (!trimmed) {
        return { success: false, error: "Please describe the event." };
      }

      setIsGenerating(true);
      setError(null);

      try {
        const response = await craftFetch(generateUrl("/api/ai/generate-event"), {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: trimmed,
            // Same source Diagnostics uses for "User Browser Timezone".
            // Relative phrases like "tomorrow at 9am" follow the user's clock.
            timezone: getBrowserTimezone(),
            ...(currentEvent ? { currentEvent } : {}),
          }),
        });

        const raw = await response.text();
        let data: (GenerateEventResult & { error?: string }) | null = null;

        try {
          data = JSON.parse(raw) as GenerateEventResult & { error?: string };
        } catch {
          const message = response.ok
            ? "Invalid response from server."
            : `Request failed (${response.status}).`;
          setError(message);

          return { success: false, error: message };
        }

        if (!response.ok || !data.success) {
          const message = data.error ?? "Failed to generate event.";
          setError(message);

          return { success: false, error: message };
        }

        return data;
      } catch {
        const message = "Could not reach the Calendar AI endpoint.";
        setError(message);

        return { success: false, error: message };
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  return {
    generateEvent,
    isGenerating,
    error,
    clearError: () => setError(null),
  };
};
