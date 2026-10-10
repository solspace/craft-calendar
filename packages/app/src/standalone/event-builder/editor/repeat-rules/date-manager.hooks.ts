import {
  normalizePopoverOptions,
  resolvePopoverPlacement,
} from "@cal/contexts/popover/popover.operations";
import { type RefObject, useEffect, useLayoutEffect, useState } from "react";

const DATE_POPOVER_OPTIONS = normalizePopoverOptions({
  position: ["bottom", "top"],
  alignment: "end",
  padding: 8,
});

type PopoverPosition = {
  top: number;
  left: number;
};

export const useDatePopoverPosition = (
  isOpen: boolean,
  anchorRef: RefObject<HTMLElement | null>,
  popoverRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
): PopoverPosition | undefined => {
  const [position, setPosition] = useState<PopoverPosition>();

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const anchor = anchorRef.current;
    const popover = popoverRef.current;
    const container = containerRef.current;

    if (!anchor || !popover || !container) {
      return undefined;
    }

    const updatePosition = () => {
      const placement = resolvePopoverPlacement({
        anchorRect: anchor.getBoundingClientRect(),
        popoverRect: popover.getBoundingClientRect(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        options: DATE_POPOVER_OPTIONS,
      });
      const containerRect = container.getBoundingClientRect();
      const nextPosition = {
        top: placement.top - containerRect.top,
        left: placement.left - containerRect.left,
      };

      setPosition((currentPosition) =>
        currentPosition?.top === nextPosition.top && currentPosition.left === nextPosition.left
          ? currentPosition
          : nextPosition,
      );
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(anchor);
    resizeObserver.observe(popover);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, anchorRef, popoverRef, containerRef]);

  return position;
};

export const useCloseOnOutsideInteraction = (
  isOpen: boolean,
  refs: Array<RefObject<HTMLElement | null>>,
  onClose: () => void,
) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (refs.some((ref) => ref.current?.contains(target))) {
        return;
      }

      onClose();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("mousedown", closeOnMouseDown);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("mousedown", closeOnMouseDown);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose, refs]);
};
