import type { FC } from "react";
import { CalendarFullcalendar } from "./calendar.fullcalendar";
import { EventPopover } from "./popover/popover";
import { PopoverProvider } from "./popover/popover.context";

export const Calendar: FC = () => {
  return (
    <PopoverProvider>
      <CalendarFullcalendar />
      <EventPopover />
    </PopoverProvider>
  );
};
