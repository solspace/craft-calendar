import type { ComponentPropsWithoutRef } from "react";
import type { RRule } from "rrule";

export type OccurrenceStatus = {
  full: boolean;
  base: boolean;
  excluded: boolean;
};

export type PickerTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label: string;
};

export type FixedDateMutationInput = {
  baseRule: RRule | null;
  rdates: Date[];
  exdates: Date[];
};
