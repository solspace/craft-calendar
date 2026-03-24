import { type RRule, RRuleSet, rrulestr } from "rrule";

export const getRRuleSetFromString = (rruleString?: string): RRuleSet | null => {
  if (!rruleString) {
    return null;
  }

  return rrulestr(rruleString, { forceset: true }) as RRuleSet;
};

export const getBaseRRule = (value?: string): RRule | null => {
  if (!value) {
    return null;
  }

  const recurrence = getRRuleSetFromString(value);
  const baseRule = recurrence instanceof RRuleSet ? recurrence.rrules()[0] : null;

  return baseRule;
};

export const getRRuleText = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const baseRule = getBaseRRule(value);

  return baseRule?.toText() ?? null;
};
