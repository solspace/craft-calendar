import { Control } from "@cal/components/controls/control";
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
  buildPreviewEvents,
  buildPreviewRecurrence,
  buildUpcomingOccurrences,
  getOccurrenceStatus,
} from "./calendar-preview.operations";
import {
  CalendarPreviewWrapper,
  DateItem,
  DateList,
  OccurrencePreview,
} from "./calendar-preview.styles";

const MAX_OCCURRENCES = 8;

export const CalendarPreview: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector(eventSelectors.state);
  const { repeatType, start, rrule } = state;
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

  const handleDateClick = useCallback(
    (date: Date) => {
      const status = getOccurrenceStatus(previewRecurrence, date);

      if (status.base && status.excluded) {
        applyDateMutation("exdate", status.timestamp, false);
        return;
      }

      if (status.base && status.full && repeatType !== "NEVER") {
        applyDateMutation("exdate", status.timestamp, true);
        return;
      }

      if (!status.base && status.full && status.rdate) {
        applyDateMutation("rdate", status.timestamp, false);
        return;
      }

      if (!status.full) {
        applyDateMutation("rdate", status.timestamp, true);
      }
    },
    [applyDateMutation, previewRecurrence, repeatType],
  );

  const getStatus = useCallback(
    (date: Date) => getOccurrenceStatus(previewRecurrence, date),
    [previewRecurrence],
  );

  return (
    <CalendarPreviewWrapper>
      <Control label="Recurrence Preview">
        <FullCalendar
          aspectRatio={2}
          height={250}
          expandRows={false}
          themeSystem="bootstrap5"
          plugins={[dayGrid, interactionPlugin]}
          initialView="dayGridMonth"
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
      </Control>

      <OccurrencePreview>
        {upcomingOccurrences.length === 0 ? (
          <p>
            {translate("No occurrences starting from")}
            <br />
            {format(viewRange?.currentStart ?? new Date(), "PP")}
          </p>
        ) : (
          <DateList $count={upcomingOccurrences.length}>
            {upcomingOccurrences.map((timestamp) => {
              const date = utcDateKey(new Date(timestamp * 1000));

              return <DateItem key={date}>{date}</DateItem>;
            })}
          </DateList>
        )}
      </OccurrencePreview>
    </CalendarPreviewWrapper>
  );
};
