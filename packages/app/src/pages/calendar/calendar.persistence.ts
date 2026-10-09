import type { CalendarTab } from "@cal/types/config";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const HIDDEN_CALENDARS_KEY = "solspace-calendar-hidden-calendars";

export type View = "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listMonth" | "calendarYear";
const viewByUrlSuffix: Record<string, View> = {
  month: "dayGridMonth",
  week: "timeGridWeek",
  day: "timeGridDay",
  agenda: "listMonth",
  year: "calendarYear",
};

export const getUrlView = (): View | null => {
  const suffix = window.location.pathname.split("/").filter(Boolean).at(-1);

  return suffix ? viewByUrlSuffix[suffix] || null : null;
};

export const getViewUrlSuffix = (view: View): string =>
  Object.entries(viewByUrlSuffix).find(([, value]) => value === view)?.[0] ?? "month";

export const useViewSettings = (defaultTab: CalendarTab = "month") => {
  const [view, setViewState] = useState<View>(
    () => getUrlView() || viewByUrlSuffix[defaultTab] || "dayGridMonth",
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const setView = (view: View) => {
    setViewState(view);
    setIsReady(true);
  };

  return {
    view,
    setView,
    isReady,
  };
};

export const useHiddenCalendarSettings = () => {
  const [hiddenCalendarIds, setHiddenCalendarIds] = useLocalStorage<number[]>(
    HIDDEN_CALENDARS_KEY,
    [],
  );

  const toggleCalendarVisibility = (calendarId: number) => {
    setHiddenCalendarIds((current) => {
      if (current.includes(calendarId)) {
        return current.filter((id) => id !== calendarId);
      }

      return [...current, calendarId];
    });
  };

  return {
    hiddenCalendarIds,
    toggleCalendarVisibility,
  };
};
