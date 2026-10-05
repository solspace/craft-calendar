import { Control } from "@cal/components/controls/control";
import { Flex } from "@cal/styles/components";
import { utcDateKey } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import dayGrid from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buildNextRRuleForDateMutation,
  buildOccurrenceSummary,
  buildPreviewEvents,
  buildPreviewRecurrence,
  buildUpcomingOccurrences,
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
  RemoveOccurrenceButton,
} from "./calendar-preview.styles";

const MAX_OCCURRENCES = 8;

export const CalendarPreview: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector(eventSelectors.state);
  const { start, rrule } = state;
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

  return (
    <CalendarPreviewWrapper>
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
              aspectRatio={2}
              height={250}
              expandRows={false}
              themeSystem="bootstrap5"
              plugins={[dayGrid, interactionPlugin]}
              initialView="dayGridMonth"
              dayHeaderFormat={{ weekday: "narrow" }}
              dayHeaderDidMount={(info) =>
                info.el.setAttribute("aria-label", translate(format(info.date, "EEEE")))
              }
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
                {format(viewRange?.currentStart ?? new Date(), "PP")}
              </p>
            ) : (
              <DateList $count={upcomingOccurrences.length}>
                {upcomingOccurrences.map((timestamp) => {
                  const occurrenceDate = new Date(timestamp * 1000);
                  const date = utcDateKey(occurrenceDate);
                  const removalType = getOccurrenceRemovalType(previewRecurrence, occurrenceDate);
                  const removalLabel = translate(
                    removalType === "rdate"
                      ? "Remove additional date {date}"
                      : "Exclude occurrence on {date}",
                    { date },
                  );

                  return (
                    <DateItem key={date}>
                      <span>{date}</span>
                      {removalType && (
                        <RemoveOccurrenceButton
                          type="button"
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
