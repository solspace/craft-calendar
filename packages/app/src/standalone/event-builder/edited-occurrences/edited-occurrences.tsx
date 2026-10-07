import { openOccurrenceEditor } from "@cal/pages/calendar/calendar.events";
import { utcToLocalDisplayDate } from "@cal/utils/date";
import { craftFetch } from "@cal/utils/http";
import { getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import { eventSelectors } from "@event-builder/store/event.slice";
import clsx from "clsx";
import { format } from "date-fns";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { BuilderContext } from "../types";
import {
  EditedOccurrenceItem,
  EditedOccurrenceList,
  EditedOccurrencesWrapper,
} from "./edited-occurrences.styles";

type EditedOccurrence = {
  recurrenceId: string;
  start: number;
  end: number;
  allDay: boolean;
  title: string | null;
  changes: string[];
  cancelled: boolean;
  orphaned: boolean;
};

type Props = {
  context: BuilderContext;
};

const SCHEDULE_INPUTS = [
  "start",
  "end",
  "until",
  "timezone",
  "allDay",
  "repeatType",
  "repeatEndType",
  "rrule",
];

// The schedule the way saving posts it: from the builder's hidden inputs
const readSchedule = (node: HTMLElement | null): Record<string, string> => {
  const container = node?.closest("[data-event-builder]");
  const schedule: Record<string, string> = {};

  for (const name of SCHEDULE_INPUTS) {
    const input = container?.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (input) {
      schedule[name] = input.value;
    }
  }

  return schedule;
};

const findElementEditor = (node: HTMLElement | null): Craft.ElementEditor | undefined => {
  const jQuery = (window as typeof window & { jQuery?: JQueryStatic }).jQuery;
  if (!node || !jQuery) {
    return undefined;
  }

  return jQuery(node).closest("form").data("elementEditor");
};

const formatOccurrenceDate = (occurrence: EditedOccurrence): string =>
  format(
    utcToLocalDisplayDate(new Date(occurrence.start * 1000)),
    occurrence.allDay ? "EEE, PP" : "EEE, PP, p",
    { locale: getDateLocale() },
  );

/**
 * The event's edited occurrences, including ones the schedule no longer has.
 * Changes made from here are saved into the event's draft.
 */
export const EditedOccurrences: FC<Props> = ({ context }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [occurrences, setOccurrences] = useState<EditedOccurrence[]>([]);
  const [busyRecurrenceId, setBusyRecurrenceId] = useState<string | null>(null);
  // Recurrence IDs the unsaved schedule doesn't have; null until it has been checked
  const [notOnSchedule, setNotOnSchedule] = useState<Set<string> | null>(null);
  const schedule = useSelector(eventSelectors.state);

  // The editor moves on to a draft as soon as there are changes, so its ID wins over the one the page loaded with
  const getEventId = useCallback(
    () => findElementEditor(ref.current)?.settings.elementId ?? context.eventId,
    [context.eventId],
  );

  const load = useCallback(async () => {
    const eventId = getEventId();
    if (!eventId) {
      return;
    }

    const url = new URL(Craft.getActionUrl("calendar/occurrences/list"), window.location.origin);
    url.searchParams.set("eventId", String(eventId));
    url.searchParams.set("siteId", String(context.siteId));

    const response = await craftFetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      return;
    }

    const data: { occurrences?: EditedOccurrence[] } = await response.json();
    setOccurrences(data.occurrences ?? []);
  }, [context.siteId, getEventId]);

  useEffect(() => {
    void load();
  }, [load]);

  const checkSchedule = useCallback(async () => {
    const eventId = getEventId();
    if (!eventId) {
      return;
    }

    const response = await craftFetch(Craft.getActionUrl("calendar/occurrences/check-schedule"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ eventId, siteId: context.siteId, ...readSchedule(ref.current) }),
    });

    if (!response.ok) {
      return;
    }

    const data: { orphaned?: string[] } = await response.json();
    setNotOnSchedule(new Set(data.orphaned ?? []));
  }, [context.siteId, getEventId]);

  // Say which edited occurrences a schedule change would leave behind, before it's saved
  // biome-ignore lint/correctness/useExhaustiveDependencies: Rechecked whenever the schedule changes.
  useEffect(() => {
    if (occurrences.length === 0) {
      return;
    }

    const timer = setTimeout(() => void checkSchedule(), 400);

    return () => clearTimeout(timer);
  }, [schedule, occurrences.length, checkSchedule]);

  const isOrphaned = (occurrence: EditedOccurrence): boolean =>
    notOnSchedule ? notOnSchedule.has(occurrence.recurrenceId) : occurrence.orphaned;

  const getDraftEventId = async (): Promise<number | null> => {
    const editor = findElementEditor(ref.current);
    await editor?.ensureIsDraftOrRevision();

    return editor?.settings.elementId ?? context.eventId;
  };

  const edit = async (occurrence: EditedOccurrence) => {
    const eventId = await getDraftEventId();
    if (!eventId) {
      return;
    }

    openOccurrenceEditor({
      eventId,
      recurrenceId: occurrence.recurrenceId,
      siteId: context.siteId,
      onSave: () => void load(),
    });
  };

  const discard = async (occurrence: EditedOccurrence) => {
    if (!window.confirm(translate("Remove everything this occurrence changes?"))) {
      return;
    }

    setBusyRecurrenceId(occurrence.recurrenceId);

    try {
      const eventId = await getDraftEventId();
      if (!eventId) {
        return;
      }

      const response = await craftFetch(Craft.getActionUrl("calendar/occurrences/reset"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          eventId,
          siteId: context.siteId,
          recurrenceId: occurrence.recurrenceId,
        }),
      });

      if (!response.ok) {
        Craft.cp.displayError(translate("Couldn’t reset the occurrence."));

        return;
      }

      await load();
    } finally {
      setBusyRecurrenceId(null);
    }
  };

  return (
    <EditedOccurrencesWrapper ref={ref}>
      {occurrences.length > 0 && (
        <>
          <h3>{translate("Edited occurrences")}</h3>
          <p>
            {translate(
              "Occurrences with their own changes. Changes made here go live with the event.",
            )}
          </p>
          {occurrences.some(isOrphaned) && (
            <p className="warning">
              {translate(
                "Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.",
              )}
            </p>
          )}

          <EditedOccurrenceList>
            {occurrences.map((occurrence) => (
              <EditedOccurrenceItem
                key={occurrence.recurrenceId}
                className={clsx(isOrphaned(occurrence) && "is-orphaned")}
              >
                <div className="details">
                  <div className="date">
                    {formatOccurrenceDate(occurrence)}
                    {occurrence.cancelled && (
                      <span className="state">{translate("Cancelled")}</span>
                    )}
                    {isOrphaned(occurrence) && (
                      <span className="state">{translate("No longer on the schedule")}</span>
                    )}
                  </div>
                  {occurrence.title && <div>{occurrence.title}</div>}
                  {occurrence.changes.length > 0 && (
                    <div className="changes">{occurrence.changes.join(", ")}</div>
                  )}
                </div>

                <div className="actions">
                  {!isOrphaned(occurrence) && (
                    <button
                      type="button"
                      className="btn small"
                      disabled={busyRecurrenceId !== null}
                      onClick={() => void edit(occurrence)}
                    >
                      {translate("Edit")}
                    </button>
                  )}
                  <button
                    type="button"
                    className={clsx("btn small", busyRecurrenceId !== null && "disabled")}
                    disabled={busyRecurrenceId !== null}
                    onClick={() => void discard(occurrence)}
                  >
                    {translate("Discard")}
                  </button>
                </div>
              </EditedOccurrenceItem>
            ))}
          </EditedOccurrenceList>
        </>
      )}
    </EditedOccurrencesWrapper>
  );
};
