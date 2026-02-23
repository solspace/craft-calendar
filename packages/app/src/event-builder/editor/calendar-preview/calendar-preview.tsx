import { Control } from "@cal/components/controls/control";
import { eventSelectors } from "@cal/event-builder/store/event.slice";
import { UTCify, utcDateKey } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import { addYears, format } from "date-fns";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { rrulestr } from "rrule";
import {
  CalendarPreviewWrapper,
  DateItem,
  DateList,
  OccurrencePreview,
} from "./calendar-preview.styles";

const MAX_OCCURRENCES = 8;

export const CalendarPreview: FC = () => {
  const { rrule, start } = useSelector(eventSelectors.state);
  const [viewRange, setViewRange] = useState<{ start: Date; end: Date } | null>(null);

  const rruleObj = useMemo(() => (rrule ? rrulestr(rrule) : null), [rrule]);

  const events = useMemo(() => {
    return [
      {
        start,
        allDay: true,
        rrule: rruleObj?.toString(),
      },
    ];
  }, [rruleObj, start]);

  const upcomingOccurrences: Date[] = useMemo(() => {
    if (!rruleObj || !viewRange) {
      return [];
    }

    const start = UTCify(viewRange.start);
    const end = UTCify(addYears(viewRange.start, 100));

    return rruleObj.between(start, end, true, (_, index) => index < MAX_OCCURRENCES);
  }, [rruleObj, viewRange]);

  if (!rruleObj) {
    return <CalendarPreviewWrapper />;
  }

  return (
    <CalendarPreviewWrapper>
      <Control label="Recurrence Preview">
        <FullCalendar
          aspectRatio={2}
          height={250}
          expandRows={false}
          themeSystem="bootstrap5"
          plugins={[dayGrid, rrulePlugin]}
          initialView="dayGridMonth"
          timeZone="UTC"
          eventDisplay="none"
          events={events}
          headerToolbar={{
            start: "title",
            end: "prev,today,next",
          }}
          datesSet={(info) => setViewRange({ start: info.start, end: info.end })}
          dayCellClassNames={(info) => {
            const events = info.view.calendar.getEvents();

            const hasEvent = events.some((event) => {
              const start = event.start;
              if (!start) return false;

              return utcDateKey(UTCify(start)) === utcDateKey(info.date);
            });

            return hasEvent ? "fc-has-event" : "";
          }}
        />
      </Control>

      <OccurrencePreview>
        {upcomingOccurrences.length === 0 ? (
          <p>
            {translate("No occurrences starting from")}
            <br />
            {format(viewRange?.start || new Date(), "PP")}
          </p>
        ) : (
          <DateList $count={upcomingOccurrences.length}>
            {upcomingOccurrences
              .map((date) => utcDateKey(date))
              .map((date) => (
                <DateItem key={date}>{date}</DateItem>
              ))}
          </DateList>
        )}
      </OccurrencePreview>
    </CalendarPreviewWrapper>
  );
};
