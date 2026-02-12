import type { FC } from "react";
import { CalendarFullcalendar } from "./calendar.fullcalendar";
import { PopoverProvider } from "./popover/popover.context";

export const Calendar: FC = () => {
  return (
    <PopoverProvider>
      <CalendarFullcalendar />
    </PopoverProvider>
  );
};
