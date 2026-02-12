import type { EventHoveringArg } from "@fullcalendar/core";
import type { FC, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type PopoverContextValue = {
  event: EventHoveringArg["event"] | null;
  anchorRect: DOMRect | null;
  isOpen: boolean;
  onEventMouseEnter: (arg: EventHoveringArg) => void;
  onEventMouseLeave: () => void;
  onPopoverMouseEnter: () => void;
  onPopoverMouseLeave: () => void;
  setPopoverElement: (element: HTMLElement | null) => void;
};

const HIDE_DELAY = 20;

const PopoverContext = createContext<PopoverContextValue | null>(null);

export const PopoverProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<EventHoveringArg["event"] | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const eventElementRef = useRef<HTMLElement | null>(null);
  const popoverElementRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    setEvent(null);
    setAnchorRect(null);
    eventElementRef.current = null;
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimeout();
    timeoutRef.current = window.setTimeout(closePopover, HIDE_DELAY);
  }, [clearHideTimeout, closePopover]);

  const onEventMouseEnter = useCallback(
    (arg: EventHoveringArg) => {
      clearHideTimeout();
      eventElementRef.current = arg.el;
      setEvent(arg.event);
      setAnchorRect(arg.el.getBoundingClientRect());
      setIsOpen(true);
    },
    [clearHideTimeout],
  );

  const onEventMouseLeave = useCallback(() => {
    scheduleHide();
  }, [scheduleHide]);

  const onPopoverMouseEnter = useCallback(() => {
    clearHideTimeout();
  }, [clearHideTimeout]);

  const onPopoverMouseLeave = useCallback(() => {
    scheduleHide();
  }, [scheduleHide]);

  const setPopoverElement = useCallback((element: HTMLElement | null) => {
    popoverElementRef.current = element;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerMove = (pointerEvent: PointerEvent) => {
      const target = pointerEvent.target as Node | null;
      if (!target) {
        return;
      }

      const insideEvent = eventElementRef.current?.contains(target) ?? false;
      const insidePopover = popoverElementRef.current?.contains(target) ?? false;

      if (insideEvent || insidePopover) {
        clearHideTimeout();
      } else {
        scheduleHide();
      }
    };

    window.addEventListener("pointermove", onPointerMove, true);

    return () => {
      window.removeEventListener("pointermove", onPointerMove, true);
    };
  }, [clearHideTimeout, isOpen, scheduleHide]);

  useEffect(() => {
    return () => {
      clearHideTimeout();
    };
  }, [clearHideTimeout]);

  return (
    <PopoverContext.Provider
      value={{
        event,
        anchorRect,
        isOpen,
        onEventMouseEnter,
        onEventMouseLeave,
        onPopoverMouseEnter,
        onPopoverMouseLeave,
        setPopoverElement,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

export const usePopover = (): PopoverContextValue => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within PopoverProvider");
  }

  return context;
};
