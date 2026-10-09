import type { CalendarTab } from "@cal/types/config";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const HIDDEN_CALENDARS_KEY = "solspace-calendar-hidden-calendars";

export type View = "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listMonth" | "calendarYear";
const viewByUrlSuffix: Record<CalendarTab, View> = {
  day: "timeGridDay",
  week: "timeGridWeek",
  month: "dayGridMonth",
  year: "calendarYear",
  agenda: "listMonth",
};

export const getUrlView = (): View | null => {
  const suffix = window.location.pathname.split("/").filter(Boolean).at(-1);

  return suffix ? viewByUrlSuffix[suffix as CalendarTab] || null : null;
};

export const getViewUrlSuffix = (view: View): string =>
  Object.entries(viewByUrlSuffix).find(([, value]) => value === view)?.[0] ?? "month";

export const useViewSettings = (defaultTab: CalendarTab = "month", enabledTabs?: CalendarTab[]) => {
  const enabledViews = useMemo(() => {
    const tabs = Object.keys(viewByUrlSuffix) as CalendarTab[];
    const enabled = tabs.filter((tab) => !enabledTabs || enabledTabs.includes(tab));
    return (enabled.length ? enabled : tabs).map((tab) => viewByUrlSuffix[tab]);
  }, [enabledTabs]);
  const resolveView = useCallback(
    (preferred: View): View => {
      if (enabledViews.includes(preferred)) return preferred;
      if (enabledViews.includes(viewByUrlSuffix[defaultTab])) return viewByUrlSuffix[defaultTab];
      return enabledViews.includes("dayGridMonth") ? "dayGridMonth" : enabledViews[0];
    },
    [defaultTab, enabledViews],
  );
  const [view, setViewState] = useState<View>(() =>
    resolveView(getUrlView() || viewByUrlSuffix[defaultTab] || "dayGridMonth"),
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const setView = (view: View) => {
    setViewState(resolveView(view));
    setIsReady(true);
  };

  return {
    view,
    setView,
    isReady,
    enabledViews,
    resolveView,
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
