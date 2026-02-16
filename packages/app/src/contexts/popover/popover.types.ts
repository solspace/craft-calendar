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
