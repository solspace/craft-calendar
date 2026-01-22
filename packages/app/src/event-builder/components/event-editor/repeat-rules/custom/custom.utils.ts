import { RRule } from "rrule";

export type WeekdayChoice = {
  value: string;
  label: string;
  days: number[];
};

export const weekdayChoices: WeekdayChoice[] = [
  { value: "MO", label: "Monday", days: [RRule.MO.weekday] },
  { value: "TU", label: "Tuesday", days: [RRule.TU.weekday] },
  { value: "WE", label: "Wednesday", days: [RRule.WE.weekday] },
  { value: "TH", label: "Thursday", days: [RRule.TH.weekday] },
  { value: "FR", label: "Friday", days: [RRule.FR.weekday] },
  { value: "SA", label: "Saturday", days: [RRule.SA.weekday] },
  { value: "SU", label: "Sunday", days: [RRule.SU.weekday] },
  {
    value: "WD",
    label: "Weekday (Mon-Fri)",
    days: [RRule.MO.weekday, RRule.TU.weekday, RRule.WE.weekday, RRule.TH.weekday, RRule.FR.weekday],
  },
  { value: "WEK", label: "Weekend Day (Sat/Sun)", days: [RRule.SA.weekday, RRule.SU.weekday] },
];

const normalizeDays = (values?: number[]) => {
  if (!values || values.length === 0) {
    return undefined;
  }

  return Array.from(new Set(values)).sort((a, b) => a - b);
};

const isSameDays = (left?: number[], right?: number[]) => {
  const normalizedLeft = normalizeDays(left);
  const normalizedRight = normalizeDays(right);

  if (!normalizedLeft || !normalizedRight) {
    return false;
  }

  if (normalizedLeft.length !== normalizedRight.length) {
    return false;
  }

  return normalizedLeft.every((value, index) => value === normalizedRight[index]);
};

export const getWeekdayChoiceValue = (values?: number[], fallbackWeekday?: number) => {
  if (values) {
    const match = weekdayChoices.find((choice) => isSameDays(choice.days, values));
    if (match) {
      return match.value;
    }
  }

  if (fallbackWeekday !== undefined) {
    const fallback = weekdayChoices.find(
      (choice) => choice.days.length === 1 && choice.days[0] === fallbackWeekday,
    );
    if (fallback) {
      return fallback.value;
    }
  }

  return weekdayChoices[0].value;
};

export const getWeekdaysForChoice = (value: string) => {
  return weekdayChoices.find((choice) => choice.value === value)?.days ?? [RRule.MO.weekday];
};
