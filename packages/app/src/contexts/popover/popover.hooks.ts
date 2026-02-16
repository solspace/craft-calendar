import { type RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { normalizePopoverOptions, resolvePopoverPlacement } from "./popover.operations";
import type { NormalizedPopoverOptions, ShowPopoverOptions } from "./popover.types";

type PopoverState = {
  anchor: HTMLElement;
  options?: ShowPopoverOptions;
};

type Coordinates = {
  top: number;
  left: number;
};

type UsePopoverPositionParams = {
  state?: PopoverState;
  bridgeRef: RefObject<HTMLDivElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
};

export const usePopoverPosition = ({
  state,
  bridgeRef,
  popoverRef,
}: UsePopoverPositionParams): Coordinates | undefined => {
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const normalizedOptions: NormalizedPopoverOptions | undefined = useMemo(() => {
    if (!state) {
      return undefined;
    }

    return normalizePopoverOptions(state.options);
  }, [state]);

  const calculate = useCallback(() => {
    if (!state || !normalizedOptions) {
      setCoordinates(undefined);
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

    const placement = resolvePopoverPlacement({
      anchorRect,
      popoverRect,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      options: normalizedOptions,
    });

    setCoordinates({
      top: placement.top - bridgeRect.top,
      left: placement.left - bridgeRect.left,
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

  return coordinates;
};
