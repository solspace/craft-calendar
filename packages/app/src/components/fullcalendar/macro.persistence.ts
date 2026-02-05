import { useLocalStorage } from "usehooks-ts";

const KEY = "solspace-calendar-macro-view";

export type View = "dayGridMonth" | "timeGridWeek" | "timeGridDay";
type MacroViewSettings = {
  view: View;
};

const defaultState: MacroViewSettings = {
  view: "dayGridMonth",
};

export const useMacroViewSettings = () => {
  const [value, setValue] = useLocalStorage<MacroViewSettings>(KEY, defaultState);

  const setView = (view: View) => {
    setValue({ view });
  };

  return {
    view: value.view,
    setView,
  };
};
