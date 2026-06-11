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

export const normalizeRfcLine = (line: string, allDay: boolean) => {
  if (line.startsWith("DTSTART")) {
    return normalizeDateValueLine("DTSTART", line, allDay);
  }

  if (line.startsWith("RDATE")) {
    return normalizeDateValueLine("RDATE", line, allDay);
  }

  if (line.startsWith("EXDATE")) {
    return normalizeDateValueLine("EXDATE", line, allDay);
  }

  if (line.startsWith("RRULE:")) {
    return normalizeRRuleLine(line, allDay);
  }

  return line.replace(/UNTIL=(\d{8})T(\d{6})Z?/g, (_, date, time) => {
    if (allDay) {
      return `UNTIL=${date}`;
    }

    return `UNTIL=${date}T${time}`;
  });
};

const normalizeDateValueLine = (
  type: "DTSTART" | "RDATE" | "EXDATE",
  line: string,
  allDay: boolean,
) => {
  const [, rawValue = ""] = line.split(":", 2);
  const values = rawValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => {
      const match = /^(\d{8})T(\d{6})Z?$/.exec(value);
      if (!match) {
        return value;
      }

      const [, date, time] = match;

      if (allDay) {
        return date;
      }

      return `${date}T${time}`;
    });

  if (type === "DTSTART") {
    return `${type}:${values[0] ?? ""}`;
  }

  if (allDay) {
    return `${type};VALUE=DATE:${values.join(",")}`;
  }

  return `${type}:${values.join(",")}`;
};

const normalizeRRuleLine = (line: string, allDay: boolean) => {
  const parts = line
    .slice("RRULE:".length)
    .split(";")
    .map((part) => {
      if (allDay) {
        return part.replace(/^UNTIL=(\d{8})T\d{6}Z?$/, "UNTIL=$1");
      }

      return part.replace(/^UNTIL=(\d{8}T\d{6})Z?$/, "UNTIL=$1");
    })
    .filter(Boolean);

  parts.sort((a, b) => {
    const aIsFreq = a.startsWith("FREQ=");
    const bIsFreq = b.startsWith("FREQ=");

    if (aIsFreq === bIsFreq) {
      return 0;
    }

    return aIsFreq ? -1 : 1;
  });

  return `RRULE:${parts.join(";")}`;
};
