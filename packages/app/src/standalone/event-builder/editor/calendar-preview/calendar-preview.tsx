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
import { getDraftEventId } from "../../occurrence-editor";
import type { BuilderContext } from "../../types";
import {
  buildNextRRuleForDateMutation,
  buildOccurrenceSummary,
  buildPreviewEvents,
  buildPreviewRecurrence,
  buildUpcomingOccurrences,
  describeOccurrenceSummary,
  describeRecurrence,
  getOccurrenceRecurrenceId,
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
  RemoveOccurrenceButton,
} from "./calendar-preview.styles";

const MAX_OCCURRENCES = 8;

type Props = {
  context?: BuilderContext;
  onOccurrenceSaved?: () => void;
};

export const CalendarPreview: FC<Props> = ({ context, onOccurrenceSaved }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpeningOccurrence, setIsOpeningOccurrence] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const weekStartDay = useSelector(appSelectors.weekStartDay);
  const dateFormat = useSelector(appSelectors.formats)?.date.short.icu ?? "P";
  const state = useSelector(eventSelectors.state);
  const { start, rrule } = state;
  const canEditOccurrences = Boolean(context?.eventId && rrule);
  const [viewRange, setViewRange] = useState<{
    start: Date;
    end: Date;
    currentStart: Date;
  } | null>(null);

  const previewRecurrence = useMemo(() => buildPreviewRecurrence(rrule, start), [rrule, start]);

  const events = useMemo(
    () => buildPreviewEvents(previewRecurrence, viewRange),
    [previewRecurrence, viewRange],
  );

  const upcomingOccurrences = useMemo(
    () => buildUpcomingOccurrences(previewRecurrence, viewRange?.start ?? null, MAX_OCCURRENCES),
    [previewRecurrence, viewRange],
  );

  const occurrencePreviewDescription = useMemo(
    () => describeRecurrence(previewRecurrence),
    [previewRecurrence],
  );

  const occurrencePreviewSummary = useMemo(() => {
    const result = buildOccurrenceSummary(previewRecurrence, upcomingOccurrences.length);

    return result ? describeOccurrenceSummary(result) : null;
  }, [previewRecurrence, upcomingOccurrences]);

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

  const handleDateClick = useCallback(
    (date: Date) => {
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
    },
    [applyDateMutation, previewRecurrence, removeOccurrence],
  );

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
        recurrenceId,
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

                return [
                  status.full ? "fc-has-event" : "",
                  status.rdate ? "fc-extra-date" : "",
                  status.excluded ? "fc-excluded-date" : "",
                ].filter(Boolean);
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
                {upcomingOccurrences.map((timestamp) => {
                  const occurrenceDate = new Date(timestamp * 1000);
                  const date = format(utcToLocalDisplayDate(occurrenceDate), dateFormat, {
                    locale: getDateLocale(),
                  });
                  const removalType = getOccurrenceRemovalType(previewRecurrence, occurrenceDate);
                  const recurrenceId = canEditOccurrences
                    ? getOccurrenceRecurrenceId(previewRecurrence, occurrenceDate)
                    : null;
                  const removalLabel = translate(
                    removalType === "rdate"
                      ? "Remove additional date {date}"
                      : "Exclude occurrence on {date}",
                    { date },
                  );

                  return (
                    <DateItem key={utcDateKey(occurrenceDate)}>
                      <span>{date}</span>
                      {recurrenceId && (
                        <button
                          type="button"
                          className="btn chromeless small icon edit occurrence-edit"
                          aria-label={translate("Edit occurrence on {date}", { date })}
                          title={translate("Edit occurrence")}
                          disabled={isOpeningOccurrence}
                          onClick={() => void editOccurrence(recurrenceId)}
                        />
                      )}
                      {removalType && (
                        <RemoveOccurrenceButton
                          type="button"
                          disabled={isOpeningOccurrence}
                          aria-label={removalLabel}
                          title={removalLabel}
                          onClick={() => removeOccurrence(occurrenceDate)}
                        >
                          ×
                        </RemoveOccurrenceButton>
                      )}
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
