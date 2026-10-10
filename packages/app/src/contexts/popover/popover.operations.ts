import type {
  NormalizedPopoverOptions,
  PopoverAlignment,
  PopoverArrowLayout,
  PopoverLayout,
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

const getAnchorOverlapArea = (
  placement: CandidatePlacement,
  popoverRect: Rect,
  anchorRect: Rect,
): number => {
  const left = placement.left;
  const top = placement.top;
  const right = left + popoverRect.width;
  const bottom = top + popoverRect.height;

  const overlapX = Math.max(0, Math.min(right, anchorRect.right) - Math.max(left, anchorRect.left));
  const overlapY = Math.max(0, Math.min(bottom, anchorRect.bottom) - Math.max(top, anchorRect.top));

  return overlapX * overlapY;
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

  const clampedCandidates = candidates.map((candidate) =>
    clampPlacementToViewport(
      candidate,
      popoverRect,
      viewportWidth,
      viewportHeight,
      options.padding,
    ),
  );

  let best = clampedCandidates[0];
  let bestOverlap = getAnchorOverlapArea(best, popoverRect, anchorRect);

  for (const candidate of clampedCandidates.slice(1)) {
    const overlap = getAnchorOverlapArea(candidate, popoverRect, anchorRect);

    if (overlap < bestOverlap) {
      best = candidate;
      bestOverlap = overlap;
    }
  }

  return best;
};

type ResolveArrowLayoutParams = {
  placement: {
    position: PopoverPosition;
    top: number;
    left: number;
  };
  anchorRect: Rect;
  popoverRect: Rect;
  arrowPadding: number;
};

const toArrowSide = (position: PopoverPosition): PopoverArrowLayout["side"] => {
  switch (position) {
    case "top":
      return "bottom";
    case "right":
      return "left";
    case "left":
      return "right";
    default:
      return "top";
  }
};

export const resolvePopoverArrowLayout = ({
  placement,
  anchorRect,
  popoverRect,
  arrowPadding,
}: ResolveArrowLayoutParams): PopoverArrowLayout => {
  const side = toArrowSide(placement.position);

  if (side === "top" || side === "bottom") {
    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    const left = clamp(
      anchorCenterX - placement.left,
      arrowPadding,
      popoverRect.width - arrowPadding,
    );

    return { side, left };
  }

  const anchorCenterY = anchorRect.top + anchorRect.height / 2;
  const top = clamp(anchorCenterY - placement.top, arrowPadding, popoverRect.height - arrowPadding);

  return { side, top };
};

type ResolvePopoverLayoutParams = {
  anchorRect: Rect;
  popoverRect: Rect;
  viewportWidth: number;
  viewportHeight: number;
  options: NormalizedPopoverOptions;
  arrowPadding: number;
};

export const resolvePopoverLayout = ({
  anchorRect,
  popoverRect,
  viewportWidth,
  viewportHeight,
  options,
  arrowPadding,
}: ResolvePopoverLayoutParams): PopoverLayout => {
  const placement = resolvePopoverPlacement({
    anchorRect,
    popoverRect,
    viewportWidth,
    viewportHeight,
    options,
  });

  return {
    top: placement.top,
    left: placement.left,
    position: placement.position,
    arrow: resolvePopoverArrowLayout({
      placement,
      anchorRect,
      popoverRect,
      arrowPadding,
    }),
  };
};
