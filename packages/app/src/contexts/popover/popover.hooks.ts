import { type RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { normalizePopoverOptions, resolvePopoverLayout } from "./popover.operations";
import type { NormalizedPopoverOptions, PopoverLayout, ShowPopoverOptions } from "./popover.types";

type PopoverState = {
  anchor: HTMLElement;
  options?: ShowPopoverOptions;
};

type UsePopoverPositionParams = {
  state?: PopoverState;
  bridgeRef: RefObject<HTMLDivElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
};

const ARROW_PADDING = 14;

export const usePopoverPosition = ({
  state,
  bridgeRef,
  popoverRef,
}: UsePopoverPositionParams): PopoverLayout | undefined => {
  const [layout, setLayout] = useState<PopoverLayout>();

  const normalizedOptions: NormalizedPopoverOptions | undefined = useMemo(() => {
    if (!state) {
      return undefined;
    }

    return normalizePopoverOptions(state.options);
  }, [state]);

  const calculate = useCallback(() => {
    if (!state || !normalizedOptions) {
      setLayout(undefined);
      return;
    }

    const bridge = bridgeRef.current;
    const popover = popoverRef.current;

    if (!bridge || !popover) {
      return;
    }

    const anchorRect = state.anchor.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const bridgeRect = bridge.getBoundingClientRect();

    const popoverLayout = resolvePopoverLayout({
      anchorRect,
      popoverRect,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      options: normalizedOptions,
      arrowPadding: ARROW_PADDING,
    });

    setLayout({
      ...popoverLayout,
      top: popoverLayout.top - bridgeRect.top,
      left: popoverLayout.left - bridgeRect.left,
    });
  }, [state, normalizedOptions, bridgeRef, popoverRef]);

  useLayoutEffect(() => {
    calculate();
  }, [calculate]);

  useEffect(() => {
    if (!state) {
      return;
    }

    const onUpdate = () => calculate();

    window.addEventListener("resize", onUpdate);
    window.addEventListener("scroll", onUpdate, true);

    return () => {
      window.removeEventListener("resize", onUpdate);
      window.removeEventListener("scroll", onUpdate, true);
    };
  }, [state, calculate]);

  return layout;
};
