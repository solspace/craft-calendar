import { PopoverProvider } from "@cal/contexts/popover/popover.context";
import type { FC } from "react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CalendarCreateDraft } from "./calendar.create-session";
import { CalendarFullcalendar } from "./calendar.fullcalendar";
import { useHiddenCalendarSettings } from "./calendar.persistence";
import { AiCreateContext } from "./context/ai-create.context";
import { useConfig } from "./context/config.context";
import { HeaderAiCreate } from "./header-ai";
import { CalendarSidebar } from "./sidebar";

export const Calendar: FC = () => {
  const sidebarRoot = document.querySelector<HTMLDivElement>("[data-sidebar-root]");
  const headerAiRoot = document.querySelector<HTMLSpanElement>("[data-ai-create-root]");
  const { isSolspaceAiConnected, canEditEvents } = useConfig();
  const { hiddenCalendarIds, toggleCalendarVisibility } = useHiddenCalendarSettings();
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  const [applyAiDraftHandler, setApplyAiDraftHandler] = useState<
    ((draft: CalendarCreateDraft) => void) | null
  >(null);

  const registerApplyAiDraft = useCallback((handler: (draft: CalendarCreateDraft) => void) => {
    setApplyAiDraftHandler(() => handler);
  }, []);

  const applyAiDraft = useCallback(
    (draft: CalendarCreateDraft) => {
      applyAiDraftHandler?.(draft);
    },
    [applyAiDraftHandler],
  );

  return (
    <PopoverProvider>
      <AiCreateContext.Provider value={{ applyAiDraft }}>
        <CalendarFullcalendar
          hiddenCalendarIds={hiddenCalendarIds}
          registerApplyAiDraft={registerApplyAiDraft}
        />
        {headerAiRoot &&
          createPortal(
            <HeaderAiCreate
              buttonRef={aiButtonRef}
              isSolspaceAiConnected={isSolspaceAiConnected}
              canEditEvents={canEditEvents}
            />,
            headerAiRoot,
          )}
        {sidebarRoot &&
          createPortal(
            <CalendarSidebar
              hiddenCalendarIds={hiddenCalendarIds}
              onToggleCalendar={toggleCalendarVisibility}
            />,
            sidebarRoot,
          )}
      </AiCreateContext.Provider>
    </PopoverProvider>
  );
};
