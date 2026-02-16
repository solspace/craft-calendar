import {
  createContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PopoverBridge, PopoverContainer } from "./popover.styles";

type PopoverContextType = {
  showPopover: (content: ReactNode, anchor: HTMLElement) => void;
  hidePopover: () => void;
};

type PopoverState = {
  content: ReactNode;
  anchor: HTMLElement;
  closeDelayMs?: number;
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

  const showPopover: PopoverContextType["showPopover"] = (content, anchor) => {
    setState({ content, anchor });
  };

  const hidePopover = useCallback(() => setState(undefined), []);

  const PopoverElement = useMemo(() => {
    if (!state || !state.content) {
      return null;
    }

    const top = state.anchor.offsetTop + state.anchor.offsetHeight;
    const left = state.anchor.offsetLeft;

    return <PopoverContainer style={{ top, left }}>{state.content}</PopoverContainer>;
  }, [state]);

  return (
    <PopoverContext.Provider
      value={{
        showPopover,
        hidePopover,
      }}
    >
      <PopoverBridge>
        {PopoverElement}
        {children}
      </PopoverBridge>
    </PopoverContext.Provider>
  );
};
