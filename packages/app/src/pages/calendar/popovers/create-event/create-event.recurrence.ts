import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { serializeRfcString } from "@event-builder/store/event.slice.operations";
import type { RepeatType } from "@event-builder/types";
import { Frequency, RRule } from "rrule";

const dayStart = (timestamp: number) => Math.floor(timestamp / 86400) * 86400;

// Keep the chosen end date inclusive, at the event's wall time, when the start changes.
export const getQuickCreateUntil = (draft: CalendarCreateDraft): number =>
  Math.max(dayStart(draft.start), dayStart(draft.recurrence?.until ?? draft.start)) +
  (draft.allDay ? 0 : draft.start - dayStart(draft.start));

export const buildQuickCreateRecurrence = (draft: CalendarCreateDraft) => {
  const recurrence = draft.recurrence;
  if (!recurrence || recurrence.type === "NEVER" || !isQuickCreateRecurrenceValid(draft))
    return undefined;

  const weekdays = recurrence.type === "WEEKDAYS";
  // The full editor uses Custom for BYDAY rules, so weekdays survive subsequent edits.
  const repeatType: RepeatType = recurrence.type === "WEEKDAYS" ? "CUSTOM" : recurrence.type;
  const freq = {
    DAILY: Frequency.DAILY,
    WEEKDAYS: Frequency.WEEKLY,
    WEEKLY: Frequency.WEEKLY,
    MONTHLY: Frequency.MONTHLY,
    YEARLY: Frequency.YEARLY,
  }[recurrence.type];
  const until = recurrence.endType === "ON_DATE" ? getQuickCreateUntil(draft) : undefined;
  const count = recurrence.endType === "AFTER" ? recurrence.count : undefined;
  const start = new Date(draft.start * 1000);
  const rule = new RRule({
    dtstart: start,
    freq,
    interval: 1,
    ...(weekdays && { byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR] }),
    ...(recurrence.type === "WEEKLY" && { byweekday: [(start.getUTCDay() + 6) % 7] }),
    ...(recurrence.type === "MONTHLY" && { bymonthday: start.getUTCDate() }),
    ...(recurrence.type === "YEARLY" && {
      bymonth: start.getUTCMonth() + 1,
      bymonthday: start.getUTCDate(),
    }),
    count,
    until: until === undefined ? undefined : new Date(until * 1000),
  });

  return {
    repeatType,
    repeatEndType: recurrence.endType,
    rrule: serializeRfcString(rule.toString(), draft.allDay),
    ...(until !== undefined && { until }),
  };
};

export const isQuickCreateRecurrenceValid = (draft: CalendarCreateDraft): boolean =>
  !draft.recurrence ||
  draft.recurrence.type === "NEVER" ||
  draft.recurrence.endType !== "AFTER" ||
  (Number.isSafeInteger(draft.recurrence.count) && (draft.recurrence.count ?? 0) >= 1);
