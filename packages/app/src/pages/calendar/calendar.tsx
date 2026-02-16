import { PopoverProvider } from "@cal/contexts/popover/popover.context";
import type { FC } from "react";
import { CalendarFullcalendar } from "./calendar.fullcalendar";

export const Calendar: FC = () => {
  return (
    <PopoverProvider>
      <CalendarFullcalendar />
    </PopoverProvider>
  );
};
