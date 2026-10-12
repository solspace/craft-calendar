import { Control } from "@cal/components/controls/control";
import { openOccurrenceEditor } from "@cal/pages/calendar/calendar.events";
import { Flex } from "@cal/styles/components";
import { utcDateKey, utcToLocalDisplayDate } from "@cal/utils/date";
import { getCalendarTranslations, getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import { appSelectors } from "@event-builder/store/app.slice";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import dayGrid from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import type { FC } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { EditedOccurrence } from "../../edited-occurrences/edited-occurrences";
import { formatOccurrenceRange } from "../../edited-occurrences/edited-occurrences.utilities";
import { OccurrenceActionButton } from "../../occurrence-action.styles";
import { getDraftEventId } from "../../occurrence-editor";
import type { BuilderContext } from "../../types";
import {
  buildNextRRuleForDateMutation,
  buildOccurrenceSummary,
  buildPreviewRecurrence,
  describeOccurrenceSummary,
  describeRecurrence,
  getOccurrenceRemovalType,
  getOccurrenceStatus,
} from "./calendar-preview.operations";
import {
  CalendarPreviewWrapper,
  DateItem,
  DateList,
  FullCalendarOccurrencePreviewWrapper,
  OccurrencePreviewDateList,
  OccurrencePreviewDescription,
  OccurrencePreviewHeading,
  OccurrencePreviewSummary,
  ScheduleChangeList,
} from "./calendar-preview.styles";
import {
  buildEditedPreview,
  coversPreviewDate,
  type PreviewOccurrence,
  recurrenceDate,
} from "./edited-preview.operations";
import { describeScheduleChanges, describeSeriesRange } from "./schedule-summary.operations";

const MAX_OCCURRENCES = 8;

type Props = {
  context?: BuilderContext;
  onOccurrenceSaved?: () => void;
  editedOccurrences?: EditedOccurrence[];
};

export const CalendarPreview: FC<Props> = ({ context, onOccurrenceSaved, editedOccurrences }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpeningOccurrence, setIsOpeningOccurrence] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const weekStartDay = useSelector(appSelectors.weekStartDay);
  const formats = useSelector(appSelectors.formats);
  const dateFormat = formats?.date.short.icu ?? "P";
  const datetimeFormat = formats?.datetime?.short.icu ?? "Pp";
  const state = useSelector(eventSelectors.state);
  const { start, rrule } = state;
  const canEditOccurrences = Boolean(context?.eventId && rrule);
  const [viewRange, setViewRange] = useState<{
    start: Date;
    end: Date;
    currentStart: Date;
  } | null>(null);

  const previewRecurrence = useMemo(() => buildPreviewRecurrence(rrule, start), [rrule, start]);

  const calendarOccurrences = useMemo(
    () =>
      buildEditedPreview(
        previewRecurrence,
        state,
        viewRange?.start ?? null,
        editedOccurrences,
        viewRange?.end,
      ),
    [previewRecurrence, state, viewRange, editedOccurrences],
  );
  const events = useMemo(
    () =>
      calendarOccurrences.map((occurrence) => ({
        id: occurrence.recurrenceId,
        start: utcDateKey(new Date(occurrence.start * 1000)),
        allDay: true,
      })),
    [calendarOccurrences],
  );
  const upcomingOccurrences = useMemo(
    () =>
      buildEditedPreview(
        previewRecurrence,
        state,
        viewRange?.start ?? null,
        editedOccurrences,
        undefined,
        MAX_OCCURRENCES,
      ),
    [previewRecurrence, state, viewRange, editedOccurrences],
  );
  const occurrencesOnDate = (date: Date) =>
    calendarOccurrences.filter((occurrence) => coversPreviewDate(occurrence, date));
  const describeOccurrence = (occurrence: PreviewOccurrence): string =>
    [
      occurrence.title,
      formatOccurrenceRange(occurrence, formats),
      occurrence.cancelled
        ? translate("Cancelled")
        : occurrence.edited
          ? translate("Edited occurrence")
          : null,
    ]
      .filter(Boolean)
      .join(" · ");

  const occurrencePreviewDescription = useMemo(
    () => describeRecurrence(previewRecurrence, dateFormat),
    [previewRecurrence, dateFormat],
  );

  const occurrencePreviewSummary = useMemo(() => {
    const result = buildOccurrenceSummary(previewRecurrence, upcomingOccurrences.length);

    return result ? describeOccurrenceSummary(result) : null;
  }, [previewRecurrence, upcomingOccurrences]);

  const scheduleChanges = useMemo(
    () => describeScheduleChanges(previewRecurrence, editedOccurrences),
    [previewRecurrence, editedOccurrences],
  );
  const seriesRange = describeSeriesRange(context, start, state.allDay, dateFormat, datetimeFormat);

  const applyDateMutation = useCallback(
    (type: "rdate" | "exdate", timestamp: number, add: boolean) => {
      dispatch(
        eventActions.setRRule(
          buildNextRRuleForDateMutation(state, previewRecurrence, type, timestamp, add),
        ),
      );
    },
    [dispatch, previewRecurrence, state],
  );

  const removeOccurrence = useCallback(
    (date: Date) => {
      const type = getOccurrenceRemovalType(previewRecurrence, date);

      if (type) {
        const { timestamp } = getOccurrenceStatus(previewRecurrence, date);
        applyDateMutation(type, timestamp, type === "exdate");
      }
    },
    [applyDateMutation, previewRecurrence],
  );

  const handleDateClick = (date: Date) => {
    // A displayed edit may belong to a different schedule date. Open its own editor rather than
    // adding/excluding another occurrence on the date it moved to.
    const edited = occurrencesOnDate(date).find((occurrence) => occurrence.edited);
    const movedFrom = editedOccurrences?.find(
      (occurrence) =>
        !occurrence.orphaned &&
        utcDateKey(recurrenceDate(occurrence.scheduleRecurrenceId ?? occurrence.recurrenceId)) ===
          utcDateKey(date),
    );
    if (canEditOccurrences && (edited || movedFrom)) {
      void editOccurrence(
        (edited ?? movedFrom)!.scheduleRecurrenceId ?? (edited ?? movedFrom)!.recurrenceId,
      );
      return;
    }
    const status = getOccurrenceStatus(previewRecurrence, date);

    if (status.base && status.excluded) {
      applyDateMutation("exdate", status.timestamp, false);
      return;
    }

    if (status.full) {
      removeOccurrence(date);
      return;
    }

    if (!status.full) {
      applyDateMutation("rdate", status.timestamp, true);
    }
  };

  const getStatus = useCallback(
    (date: Date) => getOccurrenceStatus(previewRecurrence, date),
    [previewRecurrence],
  );

  const editOccurrence = async (recurrenceId: string) => {
    if (!context || isOpeningOccurrence) {
      return;
    }

    setIsOpeningOccurrence(true);

    try {
      const eventId = await getDraftEventId(ref.current);
      openOccurrenceEditor({
        eventId,
        recurrenceId: recurrenceId.replace(" ", "T"),
        siteId: context.siteId,
        onSave: () => onOccurrenceSaved?.(),
      });
    } catch {
      Craft.cp.displayError(translate("Couldn’t open the occurrence for editing."));
    } finally {
      setIsOpeningOccurrence(false);
    }
  };

  return (
    <CalendarPreviewWrapper ref={ref}>
      <Control>
        <Flex $direction={"column"} $gap={10}>
          <OccurrencePreviewHeading>{translate("Schedule Preview")}</OccurrencePreviewHeading>
          {occurrencePreviewDescription && (
            <OccurrencePreviewDescription>
              {occurrencePreviewDescription}
            </OccurrencePreviewDescription>
          )}
        </Flex>
        {scheduleChanges.length > 0 && (
          <ScheduleChangeList aria-label={translate("Schedule changes")}>
            {scheduleChanges.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ScheduleChangeList>
        )}
        {seriesRange && <OccurrencePreviewDescription>{seriesRange}</OccurrencePreviewDescription>}
        <FullCalendarOccurrencePreviewWrapper>
          <Flex $direction={"column"} $gap={10}>
            <FullCalendar
              {...getCalendarTranslations()}
              height="auto"
              expandRows={false}
              themeSystem="bootstrap5"
              plugins={[dayGrid, interactionPlugin]}
              initialView="dayGridMonth"
              dayHeaderFormat={{ weekday: "narrow" }}
              dayHeaderDidMount={(info) =>
                info.el.setAttribute(
                  "aria-label",
                  new Intl.DateTimeFormat(getDateLocale().code, {
                    weekday: "long",
                    timeZone: "UTC",
                  }).format(info.date),
                )
              }
              firstDay={weekStartDay}
              timeZone="UTC"
              eventDisplay="none"
              events={events}
              headerToolbar={{
                start: "title",
                end: "prev,today,next",
              }}
              datesSet={(info) =>
                setViewRange({
                  start: info.start,
                  end: info.end,
                  currentStart: info.view.currentStart,
                })
              }
              dayCellClassNames={(info) => {
                const status = getStatus(info.date);
                const occurrences = occurrencesOnDate(info.date);
                return [
                  occurrences.length > 0 ? "fc-has-event" : "",
                  occurrences.length > 0 && status.rdate ? "fc-extra-date" : "",
                  occurrences.length === 0 && status.excluded ? "fc-excluded-date" : "",
                  occurrences.some((occurrence) => occurrence.cancelled) ? "fc-cancelled-date" : "",
                  occurrences.some((occurrence) => occurrence.edited) ? "fc-edited-date" : "",
                ].filter(Boolean);
              }}
              dayCellContent={(info) => {
                const descriptions = occurrencesOnDate(info.date).map(describeOccurrence);
                const label = descriptions.length ? descriptions.join("\n") : undefined;
                return (
                  <span title={label}>
                    {info.dayNumberText}
                    {label && <span className="cancelled-date-label">, {label}</span>}
                  </span>
                );
              }}
              dateClick={(info) => handleDateClick(info.date)}
            />
            {occurrencePreviewSummary && (
              <OccurrencePreviewSummary>{occurrencePreviewSummary}</OccurrencePreviewSummary>
            )}
          </Flex>
          <OccurrencePreviewDateList>
            {upcomingOccurrences.length === 0 ? (
              <p>
                {translate("No occurrences starting from")}
                <br />
                {format(utcToLocalDisplayDate(viewRange?.currentStart ?? new Date()), "PP", {
                  locale: getDateLocale(),
                })}
              </p>
            ) : (
              <DateList $count={upcomingOccurrences.length}>
                {upcomingOccurrences.map((occurrence) => {
                  const occurrenceDate = new Date(occurrence.start * 1000);
                  const cancelled = occurrence.cancelled;
                  const scheduledDate = recurrenceDate(occurrence.scheduleRecurrenceId);
                  const date = format(utcToLocalDisplayDate(occurrenceDate), dateFormat, {
                    locale: getDateLocale(),
                  });
                  const removalType = getOccurrenceRemovalType(previewRecurrence, scheduledDate);
                  const recurrenceId = canEditOccurrences ? occurrence.scheduleRecurrenceId : null;
                  const removalLabel = translate(
                    removalType === "rdate"
                      ? "Remove additional date {date}"
                      : "Exclude occurrence on {date}",
                    { date },
                  );

                  return (
                    <DateItem
                      key={occurrence.recurrenceId}
                      title={describeOccurrence(occurrence)}
                      className={[
                        cancelled ? "is-cancelled" : "",
                        occurrence.edited ? "is-edited" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="occurrence-date">
                        <span>{date}</span>
                        {occurrence.edited && !cancelled && (
                          <span className="occurrence-state">{translate("Edited occurrence")}</span>
                        )}
                        {cancelled && (
                          <span className="occurrence-state">{translate("Cancelled")}</span>
                        )}
                      </span>
                      <div className="occurrence-actions">
                        {recurrenceId && (
                          <OccurrenceActionButton
                            type="button"
                            className="icon occurrence-edit"
                            data-icon="edit"
                            aria-label={translate("Edit occurrence on {date}", { date })}
                            title={translate("Edit occurrence")}
                            disabled={isOpeningOccurrence}
                            onClick={() => void editOccurrence(recurrenceId)}
                          />
                        )}
                        {removalType && (
                          <OccurrenceActionButton
                            type="button"
                            className="icon occurrence-remove"
                            data-icon="remove"
                            disabled={isOpeningOccurrence}
                            aria-label={removalLabel}
                            title={removalLabel}
                            onClick={() => removeOccurrence(scheduledDate)}
                          />
                        )}
                      </div>
                    </DateItem>
                  );
                })}
              </DateList>
            )}
          </OccurrencePreviewDateList>
        </FullCalendarOccurrencePreviewWrapper>
      </Control>
    </CalendarPreviewWrapper>
  );
};
