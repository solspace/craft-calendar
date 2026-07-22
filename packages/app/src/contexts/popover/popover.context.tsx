import {
  createContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePopoverPosition } from "./popover.hooks";
import { PopoverArrow, PopoverBridge, PopoverContainer } from "./popover.styles";
import type { PopoverAnchor, ShowPopoverOptions } from "./popover.types";

type PopoverContextType = {
  showPopover: (content: ReactNode, anchor: PopoverAnchor, options?: ShowPopoverOptions) => void;
  hidePopover: () => void;
};

type PopoverState = {
  content: ReactNode;
  anchor: PopoverAnchor;
  options?: ShowPopoverOptions;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }

  return context;
};

export const PopoverProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<PopoverState>();
  const bridgeRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showPopover = useCallback<PopoverContextType["showPopover"]>((content, anchor, options) => {
    clearTimeout(closeTimer.current);
    setState({ content, anchor, options });
  }, []);

  const hidePopover = useCallback(() => {
    clearTimeout(closeTimer.current);
    setState(undefined);
  }, []);

  const layout = usePopoverPosition({ state, bridgeRef, popoverRef });
  const closeDelayMs = state?.options?.closeDelayMs;

  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);

  const scheduleClose = useCallback(() => {
    if (closeDelayMs === undefined) {
      return;
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setState(undefined), closeDelayMs);
  }, [closeDelayMs]);

  useEffect(() => {
    const anchor = state?.anchor;
    if (closeDelayMs === undefined || !(anchor instanceof HTMLElement)) {
      return;
    }

    anchor.addEventListener("mouseleave", scheduleClose);

    return () => anchor.removeEventListener("mouseleave", scheduleClose);
  }, [state, closeDelayMs, scheduleClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const PopoverElement = state?.content && (
    <PopoverContainer
      ref={popoverRef}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      style={{
        top: layout?.top ?? 0,
        left: layout?.left ?? 0,
        visibility: layout ? "visible" : "hidden",
      }}
    >
      {layout && (
        <PopoverArrow side={layout.arrow.side} top={layout.arrow.top} left={layout.arrow.left} />
      )}
      {state.content}
    </PopoverContainer>
  );

  return (
    <PopoverContext.Provider
      value={{
        showPopover,
        hidePopover,
      }}
    >
      <PopoverBridge ref={bridgeRef}>
        {PopoverElement}
        {children}
      </PopoverBridge>
    </PopoverContext.Provider>
  );
};
