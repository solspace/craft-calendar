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
  rrule?: string;
  timezone?: string;
};

type GenerateEventResult =
  | { success: true; event: AiGeneratedEvent }
  | { success: false; error: string };

export const useGenerateEventAi = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEvent = useCallback(async (prompt: string): Promise<GenerateEventResult> => {
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
        body: JSON.stringify({ prompt: trimmed }),
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
  }, []);

  return {
    generateEvent,
    isGenerating,
    error,
    clearError: () => setError(null),
  };
};
