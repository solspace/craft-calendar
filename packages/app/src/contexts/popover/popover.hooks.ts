import { type RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { normalizePopoverOptions, resolvePopoverLayout } from "./popover.operations";
import type {
  NormalizedPopoverOptions,
  PopoverAnchor,
  PopoverLayout,
  ShowPopoverOptions,
} from "./popover.types";

type PopoverState = {
  anchor: PopoverAnchor;
  options?: ShowPopoverOptions;
};

type UsePopoverPositionParams = {
  state?: PopoverState;
  popoverRef: RefObject<HTMLDivElement | null>;
};

const ARROW_PADDING = 14;

const getAnchorRect = (anchor: PopoverAnchor): DOMRect | DOMRectReadOnly => {
  if (anchor instanceof MouseEvent) {
    const target = anchor.target;
    if (target instanceof HTMLElement) {
      const targetRect = target.getBoundingClientRect();
      const left = targetRect.left + anchor.offsetX;
      const top = targetRect.top + anchor.offsetY;

      return new DOMRect(left, top, 1, 1);
    }

    return new DOMRect(anchor.clientX, anchor.clientY, 1, 1);
  }

  return anchor.getBoundingClientRect();
};

export const usePopoverPosition = ({
  state,
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

    const popover = popoverRef.current;
    if (!popover) {
      return;
    }

    const anchorRect = getAnchorRect(state.anchor);
    const popoverRect = popover.getBoundingClientRect();

    // Viewport coords + position:fixed so header-anchored buttons (Update with AI) align correctly.
    setLayout({
      ...resolvePopoverLayout({
        anchorRect,
        popoverRect,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        options: normalizedOptions,
        arrowPadding: ARROW_PADDING,
      }),
      maxHeight: Math.max(0, window.innerHeight - normalizedOptions.padding * 2 - 2),
    });
  }, [state, normalizedOptions, popoverRef]);

  useLayoutEffect(() => {
    calculate();
  }, [calculate]);

  useEffect(() => {
    if (!state) {
      return;
    }

    const onUpdate = () => calculate();
    const observer =
      typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(onUpdate);
    if (popoverRef.current) observer?.observe(popoverRef.current);

    window.addEventListener("resize", onUpdate);
    window.addEventListener("scroll", onUpdate, true);

    return () => {
      window.removeEventListener("resize", onUpdate);
      window.removeEventListener("scroll", onUpdate, true);
      observer?.disconnect();
    };
  }, [state, calculate, popoverRef]);

  return layout;
};
