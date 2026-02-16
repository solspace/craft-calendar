export type PopoverPosition = "top" | "right" | "bottom" | "left";
export type PopoverAlignment = "start" | "center" | "end";

export type ShowPopoverOptions = {
  position?: PopoverPosition | PopoverPosition[];
  alignment?: PopoverAlignment;
  gap?: number;
  padding?: number;
  closeDelayMs?: number;
};

export type NormalizedPopoverOptions = {
  positions: PopoverPosition[];
  alignment: PopoverAlignment;
  gap: number;
  padding: number;
  closeDelayMs?: number;
};

export type PopoverArrowSide = "top" | "right" | "bottom" | "left";

export type PopoverArrowLayout = {
  side: PopoverArrowSide;
  top?: number;
  left?: number;
};

export type PopoverLayout = {
  top: number;
  left: number;
  position: PopoverPosition;
  arrow: PopoverArrowLayout;
};
