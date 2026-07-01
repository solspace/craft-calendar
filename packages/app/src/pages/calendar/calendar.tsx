import { PopoverProvider } from "@cal/contexts/popover/popover.context";
import type { FC } from "react";
import { createPortal } from "react-dom";
import { CalendarFullcalendar } from "./calendar.fullcalendar";
import { useHiddenCalendarSettings } from "./calendar.persistence";
import { CalendarSidebar } from "./sidebar";

export const Calendar: FC = () => {
  const sidebarRoot = document.querySelector<HTMLDivElement>("[data-sidebar-root]");
  const { hiddenCalendarIds, toggleCalendarVisibility } = useHiddenCalendarSettings();

  return (
    <PopoverProvider>
      <CalendarFullcalendar hiddenCalendarIds={hiddenCalendarIds} />
      {sidebarRoot &&
        createPortal(
          <CalendarSidebar
            hiddenCalendarIds={hiddenCalendarIds}
            onToggleCalendar={toggleCalendarVisibility}
          />,
          sidebarRoot,
        )}
    </PopoverProvider>
  );
};
