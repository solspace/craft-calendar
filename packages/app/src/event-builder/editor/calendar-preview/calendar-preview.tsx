import { Control } from "@cal/components/controls/control";
import { eventSelectors } from "@cal/event-builder/store/event.slice";
import translate from "@cal/utils/translations";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { datetime, rrulestr } from "rrule";
import {
  CalendarPreviewWrapper,
  DateItem,
  DateList,
  OccurrencePreview,
} from "./calendar-preview.styles";

const MAX_OCCURRENCES = 8;

export const CalendarPreview: FC = () => {
  const { rrule } = useSelector(eventSelectors.state);
  const [viewRange, setViewRange] = useState<{ start: Date; end: Date } | null>(null);

  const rruleObj = useMemo(() => (rrule ? rrulestr(rrule) : null), [rrule]);

  const firstOccurrences: Date[] = useMemo(() => {
    if (!rruleObj || !viewRange) {
      return [];
    }

    const start = viewRange.start;
    const end = datetime(start.getFullYear() + 100, 1, 1, 0, 0, 0);

    return rruleObj.between(start, end, true, (_, index) => index < MAX_OCCURRENCES);
  }, [rruleObj, viewRange]);

  const occurrences = useMemo(() => {
    if (!rrule || !viewRange) {
      return new Set<string>();
    }

    const rule = rrulestr(rrule);
    const occurrences = rule.between(viewRange.start, viewRange.end, true);

    return new Set(occurrences.map((date) => format(date, "yyyy-MM-dd")));
  }, [rrule, viewRange]);

  if (!rrule) {
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
          plugins={[dayGrid]}
          initialView="dayGridMonth"
          eventDisplay="none"
          headerToolbar={{
            start: "title",
            end: "prev,today,next",
          }}
          datesSet={(info) => setViewRange({ start: info.start, end: info.end })}
          dayCellClassNames={(info) =>
            occurrences.has(format(info.date, "yyyy-MM-dd")) ? ["fc-has-event"] : []
          }
        />
      </Control>
      <OccurrencePreview>
        {firstOccurrences.length === 0 ? (
          <p>
            {translate("No occurrences starting from")}
            <br />
            {format(viewRange?.start || new Date(), "PP")}
          </p>
        ) : (
          <DateList $count={firstOccurrences.length}>
            {firstOccurrences
              .map((date) => format(date, "PP"))
              .map((date) => (
                <DateItem key={date}>{date}</DateItem>
              ))}
          </DateList>
        )}
      </OccurrencePreview>
    </CalendarPreviewWrapper>
  );
};
