import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const KEY = "solspace-calendar-view";

export type View = "dayGridMonth" | "timeGridWeek" | "timeGridDay";
type ViewSettings = {
  view: View;
};

const defaultState: ViewSettings = {
  view: "dayGridMonth",
};

const viewByUrlSuffix: Record<string, View> = {
  month: "dayGridMonth",
  week: "timeGridWeek",
  day: "timeGridDay",
};

const getUrlView = (): View | null => {
  const suffix = window.location.pathname.split("/").filter(Boolean).at(-1);

  return suffix ? viewByUrlSuffix[suffix] || null : null;
};

export const useViewSettings = () => {
  const [value, setValue] = useLocalStorage<ViewSettings>(KEY, defaultState);
  const [view, setViewState] = useState<View>(value.view);
  const [isReady, setIsReady] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: we only want to run this on mount
  useEffect(() => {
    const urlView = getUrlView();
    const initialView = urlView || value.view;

    if (urlView) {
      setViewState(initialView);
    }

    setIsReady(true);
  }, []);

  const setView = (view: View) => {
    setViewState(view);
    setValue({ view });
    setIsReady(true);
  };

  return {
    view,
    setView,
    isReady,
  };
};
