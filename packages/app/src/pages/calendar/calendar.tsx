import { PopoverProvider } from "@cal/contexts/popover/popover.context";
import type { FC } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CalendarFullcalendar } from "./calendar.fullcalendar";
import { useHiddenCalendarSettings } from "./calendar.persistence";
import { useConfig } from "./context/config.context";
import { MiniCalendar } from "./mini-calendar";
import { CalendarSidebar } from "./sidebar";
import { SidebarContent, SidebarDivider } from "./sidebar.styles";

export const Calendar: FC = () => {
  const sidebarRoot = document.querySelector<HTMLDivElement>("[data-sidebar-root]");
  const { hiddenCalendarIds, toggleCalendarVisibility } = useHiddenCalendarSettings();
  const { currentDay } = useConfig();
  const [selectedDate, setSelectedDate] = useState(() => new Date(currentDay));
  const [miniDateSelection, setMiniDateSelection] = useState<Date | null>(null);

  const handleMiniDateSelect = (date: Date) => {
    setSelectedDate(date);
    setMiniDateSelection(date);
  };

  return (
    <PopoverProvider>
      <CalendarFullcalendar
        hiddenCalendarIds={hiddenCalendarIds}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        miniDateSelection={miniDateSelection}
        onMiniDateSelectionHandled={() => setMiniDateSelection(null)}
      />
      {sidebarRoot &&
        createPortal(
          <SidebarContent>
            <CalendarSidebar
              hiddenCalendarIds={hiddenCalendarIds}
              onToggleCalendar={toggleCalendarVisibility}
            />
            <SidebarDivider />
            <MiniCalendar selectedDate={selectedDate} onDateSelect={handleMiniDateSelect} />
          </SidebarContent>,
          sidebarRoot,
        )}
    </PopoverProvider>
  );
};
