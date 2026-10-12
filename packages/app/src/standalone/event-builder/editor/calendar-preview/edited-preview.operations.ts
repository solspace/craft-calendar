import { utcDateKey, utcDateTimeString } from "@cal/utils/date";
import type { EditedOccurrence } from "../../edited-occurrences/edited-occurrences";
import type { Event } from "../../types";
import type { PreviewRecurrence } from "./calendar-preview.operations";

export type PreviewOccurrence = {
  recurrenceId: string;
  scheduleRecurrenceId: string;
  start: number;
  end: number;
  allDay: boolean;
  title: string | null;
  edited: boolean;
  cancelled: boolean;
};

export const recurrenceDate = (id: string): Date => new Date(`${id.replace(" ", "T")}Z`);

/** Replace schedule anchors with their edited occurrences, including ones moved into this range. */
export const buildEditedPreview = (
  recurrence: PreviewRecurrence,
  state: Event,
  from: Date | null,
  edits: EditedOccurrence[] = [],
  until?: Date,
  limit?: number,
): PreviewOccurrence[] => {
  if (!from) return [];
  const start = new Date(`${utcDateKey(from)}T00:00:00Z`);
  const end = until ?? new Date(Date.UTC(start.getUTCFullYear() + 100, 0, 1));
  const active = edits.filter((edit) => {
    if (edit.orphaned) return false;
    const anchor = recurrenceDate(edit.scheduleRecurrenceId ?? edit.recurrenceId);
    return recurrence.recurrenceSet?.between(anchor, anchor, true).length === 1;
  });
  const overrides = new Map(
    active.map((edit) => [
      edit.scheduleRecurrenceId?.replace(" ", "T") ?? edit.recurrenceId.replace(" ", "T"),
      edit,
    ]),
  );
  const duration = state.end - state.start;
  const anchors = recurrence.recurrenceSet
    ? recurrence.recurrenceSet.between(
        // Include an occurrence that began before the visible month but still covers it.
        until ? new Date(start.getTime() - Math.max(0, duration) * 1000) : start,
        end,
        true,
        limit === undefined ? undefined : (_, index) => index < limit + active.length,
      )
    : [new Date(state.start * 1000)];
  const rows: PreviewOccurrence[] = anchors
    .filter((date) => !overrides.has(utcDateTimeString(date)))
    .map((date): PreviewOccurrence => {
      const timestamp = date.getTime() / 1000;
      // The editor can hold an exclusive midnight end while an all-day date is being changed.
      const inclusiveDuration = state.allDay && state.end % 86400 === 0 ? duration - 1 : duration;
      return {
        recurrenceId: utcDateTimeString(date),
        scheduleRecurrenceId: utcDateTimeString(date),
        start: timestamp,
        end: timestamp + inclusiveDuration,
        allDay: state.allDay,
        title: null,
        edited: false,
        cancelled: false,
      };
    });
  for (const edit of active)
    rows.push({
      ...edit,
      scheduleRecurrenceId: edit.scheduleRecurrenceId ?? edit.recurrenceId,
      edited: true,
    });
  const filtered = rows
    .filter((row) =>
      until
        ? row.start < end.getTime() / 1000 && row.end >= start.getTime() / 1000
        : row.start >= start.getTime() / 1000,
    )
    .sort((a, b) => a.start - b.start || a.recurrenceId.localeCompare(b.recurrenceId));
  return limit === undefined ? filtered : filtered.slice(0, limit);
};

export const coversPreviewDate = (occurrence: PreviewOccurrence, date: Date): boolean => {
  const day = utcDateKey(date);
  // Timed events ending at midnight do not occupy the next day.
  const end = occurrence.allDay ? occurrence.end : Math.max(occurrence.start, occurrence.end - 1);
  return (
    utcDateKey(new Date(occurrence.start * 1000)) <= day && utcDateKey(new Date(end * 1000)) >= day
  );
};
