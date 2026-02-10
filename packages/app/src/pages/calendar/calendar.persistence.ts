import { useLocalStorage } from "usehooks-ts";

const KEY = "solspace-calendar-view";

export type View = "dayGridMonth" | "timeGridWeek" | "timeGridDay";
type ViewSettings = {
  view: View;
};

const defaultState: ViewSettings = {
  view: "dayGridMonth",
};

export const useViewSettings = () => {
  const [value, setValue] = useLocalStorage<ViewSettings>(KEY, defaultState);

  const setView = (view: View) => {
    setValue({ view });
  };

  return {
    view: value.view,
    setView,
  };
};
