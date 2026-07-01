import { craftFetch } from "@cal/utils/http";
import { generateUrl } from "@cal/utils/urls";
import { useCallback, useEffect, useState } from "react";

export type CalendarSidebarCalendar = {
  id: number;
  title: string;
  color: {
    base: string;
    light: string;
    dark: string;
    contrast: string;
  };
  description: string;
};

type UseCalendarsResult = {
  data: CalendarSidebarCalendar[];
  error: Error | null;
  isPending: boolean;
  refetch: () => Promise<void>;
};

const fetchCalendars = async (signal?: AbortSignal): Promise<CalendarSidebarCalendar[]> => {
  const response = await craftFetch(generateUrl("/api/calendars"), { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch calendars");
  }

  return response.json();
};

export const useCalendars = (): UseCalendarsResult => {
  const [data, setData] = useState<CalendarSidebarCalendar[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const refetch = useCallback(async (signal?: AbortSignal) => {
    setIsFetching(true);
    setError(null);

    try {
      const calendars = await fetchCalendars(signal);

      setData(calendars);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setError(error instanceof Error ? error : new Error("Failed to fetch calendars"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void refetch(controller.signal);

    return () => {
      controller.abort();
    };
  }, [refetch]);

  return {
    data,
    error,
    isPending: isFetching,
    refetch,
  };
};
