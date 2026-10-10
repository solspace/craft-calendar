import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import { format } from "date-fns";
import type { EditedOccurrence } from "../../edited-occurrences/edited-occurrences";
import type { BuilderContext } from "../../types";
import { getOccurrenceStatus, type PreviewRecurrence } from "./calendar-preview.operations";

/** Counts describe this event's whole schedule, regardless of the preview's visible month. */
export const describeScheduleChanges = (
  recurrence: PreviewRecurrence,
  occurrences: EditedOccurrence[] = [],
): string[] => {
  const changes: string[] = [];
  const add = (count: number, single: string, plural: string) => {
    if (count > 0) changes.push(translate(count === 1 ? single : plural, { count }));
  };
  const additional = (recurrence.recurrenceSet?.rdates() ?? []).filter((date) => {
    const status = getOccurrenceStatus(recurrence, date);
    return status.full && !status.base && status.timestamp !== recurrence.startTimestamp;
  }).length;
  const excluded = (recurrence.recurrenceSet?.exdates() ?? []).filter(
    (date) => getOccurrenceStatus(recurrence, date).excluded,
  ).length;
  const active = occurrences.filter((occurrence) => !occurrence.orphaned);

  add(additional, "{count} additional date", "{count} additional dates");
  add(excluded, "{count} excluded date", "{count} excluded dates");
  add(
    active.filter((occurrence) => !occurrence.cancelled).length,
    "{count} edited occurrence",
    "{count} edited occurrences",
  );
  add(
    active.filter((occurrence) => occurrence.cancelled).length,
    "{count} cancelled occurrence",
    "{count} cancelled occurrences",
  );
  add(
    occurrences.filter((occurrence) => occurrence.orphaned).length,
    "{count} edit off schedule",
    "{count} edits off schedule",
  );

  return changes;
};

export const describeSeriesRange = (
  context: BuilderContext | undefined,
  start: number,
  allDay: boolean,
  dateFormat = "PP",
  datetimeFormat = "PPp",
): string | null => {
  const date = (timestamp: number) =>
    format(utcTimestampToLocalDisplayDate(timestamp), allDay ? dateFormat : datetimeFormat, {
      locale: getDateLocale(),
    });
  if (context?.splitAt) {
    return translate("This draft changes the series from {date} onward.", {
      date: date(context.splitAt),
    });
  }
  if (context?.series?.later) {
    return translate("This part of the series starts on {start} and ends before {end}.", {
      start: date(start),
      end: date(context.series.later.start),
    });
  }
  if (context?.series?.earlier) {
    return translate("This part of the series starts on {date}.", { date: date(start) });
  }
  return null;
};
