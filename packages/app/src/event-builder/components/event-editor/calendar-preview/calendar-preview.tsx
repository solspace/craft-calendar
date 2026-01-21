import { eventSelectors } from "@cal/event-builder/store/event.slice";
import dayGrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { rrulestr } from "rrule";
import { Control } from "../../controls/control";
import { CalendarPreviewWrapper } from "./calendar-preview.styles";

export const CalendarPreview: FC = () => {
  const { rrule } = useSelector(eventSelectors.state);
  const [viewRange, setViewRange] = useState<{ start: Date; end: Date } | null>(null);

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
    </CalendarPreviewWrapper>
  );
};
