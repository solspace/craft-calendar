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
  bridgeRef: RefObject<HTMLDivElement | null>;
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

    const anchorRect = getAnchorRect(state.anchor);
    const popoverRect = popover.getBoundingClientRect();
    const bridgeRect = bridge.getBoundingClientRect();
    // Craft's content pane can clip anything positioned behind the page header.
    const contentRect = bridge.closest("#content")?.getBoundingClientRect();
    const viewportTop = Math.max(0, contentRect?.top ?? 0);
    const viewportBottom = Math.min(window.innerHeight, contentRect?.bottom ?? window.innerHeight);
    const viewportHeight = Math.max(0, viewportBottom - viewportTop);

    const popoverLayout = resolvePopoverLayout({
      anchorRect: {
        left: anchorRect.left,
        right: anchorRect.right,
        width: anchorRect.width,
        height: anchorRect.height,
        top: anchorRect.top - viewportTop,
        bottom: anchorRect.bottom - viewportTop,
      },
      popoverRect,
      viewportWidth: window.innerWidth,
      viewportHeight,
      options: normalizedOptions,
      arrowPadding: ARROW_PADDING,
    });

    setLayout({
      ...popoverLayout,
      top: popoverLayout.top + viewportTop - bridgeRect.top,
      left: popoverLayout.left - bridgeRect.left,
      maxHeight: Math.max(0, viewportHeight - normalizedOptions.padding * 2 - 2),
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
