import type {
  NormalizedPopoverOptions,
  PopoverAlignment,
  PopoverPosition,
  ShowPopoverOptions,
} from "./popover.types";

type Rect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

type CandidatePlacement = {
  position: PopoverPosition;
  top: number;
  left: number;
};

type ResolvePlacementParams = {
  anchorRect: Rect;
  popoverRect: Rect;
  viewportWidth: number;
  viewportHeight: number;
  options: NormalizedPopoverOptions;
};

const DEFAULT_OPTIONS: NormalizedPopoverOptions = {
  positions: ["bottom"],
  alignment: "start",
  gap: 8,
  padding: 8,
};

const clamp = (value: number, min: number, max: number) => {
  if (max <= min) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
};

const getAlignedOffset = (
  start: number,
  size: number,
  targetSize: number,
  alignment: PopoverAlignment,
) => {
  switch (alignment) {
    case "center":
      return start + (size - targetSize) / 2;

    case "end":
      return start + size - targetSize;

    default:
      return start;
  }
};

const buildCandidatePlacement = (
  position: PopoverPosition,
  anchorRect: Rect,
  popoverRect: Rect,
  gap: number,
  alignment: PopoverAlignment,
): CandidatePlacement => {
  switch (position) {
    case "top":
      return {
        position,
        top: anchorRect.top - popoverRect.height - gap,
        left: getAlignedOffset(anchorRect.left, anchorRect.width, popoverRect.width, alignment),
      };

    case "right":
      return {
        position,
        top: getAlignedOffset(anchorRect.top, anchorRect.height, popoverRect.height, alignment),
        left: anchorRect.right + gap,
      };

    case "left":
      return {
        position,
        top: getAlignedOffset(anchorRect.top, anchorRect.height, popoverRect.height, alignment),
        left: anchorRect.left - popoverRect.width - gap,
      };

    default:
      return {
        position: "bottom",
        top: anchorRect.bottom + gap,
        left: getAlignedOffset(anchorRect.left, anchorRect.width, popoverRect.width, alignment),
      };
  }
};

const isWithinViewport = (
  placement: CandidatePlacement,
  popoverRect: Rect,
  viewportWidth: number,
  viewportHeight: number,
  padding: number,
) => {
  const top = placement.top;
  const left = placement.left;
  const bottom = top + popoverRect.height;
  const right = left + popoverRect.width;

  return (
    top >= padding &&
    left >= padding &&
    bottom <= viewportHeight - padding &&
    right <= viewportWidth - padding
  );
};

const clampPlacementToViewport = (
  placement: CandidatePlacement,
  popoverRect: Rect,
  viewportWidth: number,
  viewportHeight: number,
  padding: number,
): CandidatePlacement => {
  const maxTop = viewportHeight - padding - popoverRect.height;
  const maxLeft = viewportWidth - padding - popoverRect.width;

  return {
    ...placement,
    top: clamp(placement.top, padding, maxTop),
    left: clamp(placement.left, padding, maxLeft),
  };
};

export const normalizePopoverOptions = (options?: ShowPopoverOptions): NormalizedPopoverOptions => {
  if (!options) {
    return DEFAULT_OPTIONS;
  }

  const positions = Array.isArray(options.position)
    ? options.position
    : options.position
      ? [options.position]
      : DEFAULT_OPTIONS.positions;

  return {
    positions: positions.length ? positions : DEFAULT_OPTIONS.positions,
    alignment: options.alignment ?? DEFAULT_OPTIONS.alignment,
    gap: options.gap ?? DEFAULT_OPTIONS.gap,
    padding: options.padding ?? DEFAULT_OPTIONS.padding,
    closeDelayMs: options.closeDelayMs,
  };
};

export const resolvePopoverPlacement = ({
  anchorRect,
  popoverRect,
  viewportWidth,
  viewportHeight,
  options,
}: ResolvePlacementParams) => {
  const candidates = options.positions.map((position) =>
    buildCandidatePlacement(position, anchorRect, popoverRect, options.gap, options.alignment),
  );

  const firstInBounds = candidates.find((candidate) =>
    isWithinViewport(candidate, popoverRect, viewportWidth, viewportHeight, options.padding),
  );

  if (firstInBounds) {
    return firstInBounds;
  }

  return clampPlacementToViewport(
    candidates[0],
    popoverRect,
    viewportWidth,
    viewportHeight,
    options.padding,
  );
};
