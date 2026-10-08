import { openOccurrenceEditor } from "@cal/pages/calendar/calendar.events";
import { craftFetch } from "@cal/utils/http";
import translate from "@cal/utils/translations";
import { eventSelectors } from "@event-builder/store/event.slice";
import clsx from "clsx";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SectionHeading, SectionInstructions } from "../editor/repeat-rules/date-manager.styles";
import { OccurrenceActionButton } from "../occurrence-action.styles";
import { findElementEditor, getDraftEventId } from "../occurrence-editor";
import { appSelectors } from "../store/app.slice";
import type { BuilderContext } from "../types";
import {
  EditedOccurrenceItem,
  EditedOccurrenceList,
  EditedOccurrencesWrapper,
} from "./edited-occurrences.styles";
import { formatOccurrenceRange } from "./edited-occurrences.utilities";

export type EditedOccurrence = {
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
  refreshKey?: number;
  onOccurrencesChanged?: (occurrences: EditedOccurrence[]) => void;
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

/**
 * The event's edited occurrences, including ones the schedule no longer has.
 * Changes made from here are saved into the event's draft.
 */
export const EditedOccurrences: FC<Props> = ({ context, refreshKey, onOccurrencesChanged }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [occurrences, setOccurrences] = useState<EditedOccurrence[]>([]);
  const [busyRecurrenceId, setBusyRecurrenceId] = useState<string | null>(null);
  // Recurrence IDs the unsaved schedule doesn't have; null until it has been checked
  const [notOnSchedule, setNotOnSchedule] = useState<Set<string> | null>(null);
  // Checks can answer out of order, so only the latest one counts
  const latestScheduleCheck = useRef(0);
  const schedule = useSelector(eventSelectors.state);
  const formats = useSelector(appSelectors.formats);
  const formatOccurrenceDate = (occurrence: EditedOccurrence): string =>
    formatOccurrenceRange(occurrence, formats);

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
    const loaded = data.occurrences ?? [];
    setOccurrences(loaded);
    onOccurrencesChanged?.(loaded);
  }, [context.siteId, getEventId, onOccurrencesChanged]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reload after a preview occurrence is saved.
  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const checkSchedule = useCallback(async () => {
    const eventId = getEventId();
    if (!eventId) {
      return;
    }

    const check = ++latestScheduleCheck.current;
    const response = await craftFetch(Craft.getActionUrl("calendar/occurrences/check-schedule"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ eventId, siteId: context.siteId, ...readSchedule(ref.current) }),
    });

    if (!response.ok) {
      return;
    }

    const data: { orphaned?: string[] } = await response.json();
    if (check === latestScheduleCheck.current) {
      setNotOnSchedule(new Set(data.orphaned ?? []));
    }
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

  // Creating the draft takes a moment, so the buttons stay disabled until the slideout opens
  const edit = async (occurrence: EditedOccurrence) => {
    setBusyRecurrenceId(occurrence.recurrenceId);

    try {
      const eventId = await getDraftEventId(ref.current);
      if (!eventId) {
        return;
      }

      openOccurrenceEditor({
        eventId,
        recurrenceId: occurrence.recurrenceId,
        siteId: context.siteId,
        onSave: () => void load(),
      });
    } catch {
      Craft.cp.displayError(translate("Couldn’t open the occurrence for editing."));
    } finally {
      setBusyRecurrenceId(null);
    }
  };

  const discard = async (occurrence: EditedOccurrence) => {
    if (!window.confirm(translate("Remove everything this occurrence changes?"))) {
      return;
    }

    setBusyRecurrenceId(occurrence.recurrenceId);

    try {
      const eventId = await getDraftEventId(ref.current);
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
        const data: { message?: string } | null = await response.json().catch((): null => null);
        Craft.cp.displayError(data?.message || translate("Couldn’t reset the occurrence."));

        return;
      }

      await load();
    } catch {
      Craft.cp.displayError(translate("Couldn’t reset the occurrence."));
    } finally {
      setBusyRecurrenceId(null);
    }
  };

  return (
    <EditedOccurrencesWrapper ref={ref}>
      {occurrences.length > 0 && (
        <>
          <SectionHeading as="h3">{translate("Edited occurrences")}</SectionHeading>
          <SectionInstructions>
            {translate(
              "Occurrences with their own changes. Changes made here go live with the event.",
            )}
          </SectionInstructions>
          {occurrences.some(isOrphaned) && (
            <SectionInstructions className="warning">
              {translate(
                "Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.",
              )}
            </SectionInstructions>
          )}

          <EditedOccurrenceList>
            {occurrences.map((occurrence) => (
              <EditedOccurrenceItem
                key={occurrence.recurrenceId}
                className={clsx(
                  isOrphaned(occurrence) && "is-orphaned",
                  occurrence.cancelled && "is-cancelled",
                )}
              >
                <div className="details">
                  <div className="title">{occurrence.title}</div>
                  {occurrence.cancelled && (
                    <span className="state cancelled">{translate("Cancelled")}</span>
                  )}
                  {isOrphaned(occurrence) && (
                    <span className="state">{translate("No longer on the schedule")}</span>
                  )}
                </div>
                <div className="date">{formatOccurrenceDate(occurrence)}</div>
                <div className="changes">
                  <span>{occurrence.changes.join(", ")}</span>
                </div>

                <div className="actions">
                  {!isOrphaned(occurrence) && (
                    <OccurrenceActionButton
                      type="button"
                      className="icon occurrence-edit"
                      data-icon="edit"
                      aria-label={translate("Edit occurrence on {date}", {
                        date: formatOccurrenceDate(occurrence),
                      })}
                      title={translate("Edit occurrence")}
                      disabled={busyRecurrenceId !== null}
                      onClick={() => void edit(occurrence)}
                    />
                  )}
                  <OccurrenceActionButton
                    type="button"
                    className="icon occurrence-discard"
                    data-icon="remove"
                    aria-label={`${translate("Discard")}: ${formatOccurrenceDate(occurrence)}`}
                    title={translate("Removes everything this occurrence changes.")}
                    disabled={busyRecurrenceId !== null}
                    onClick={() => void discard(occurrence)}
                  />
                </div>
              </EditedOccurrenceItem>
            ))}
          </EditedOccurrenceList>
        </>
      )}
    </EditedOccurrencesWrapper>
  );
};
