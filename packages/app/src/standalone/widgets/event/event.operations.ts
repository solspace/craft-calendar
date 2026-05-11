import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { addDays, addHours, setHours, setMinutes, setSeconds, startOfDay, subDays } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import type { EventWidgetConfig } from "./event.types";

export const useEventState = (config: EventWidgetConfig) => {
  const { formats, calendars } = config;
  const refDate = setSeconds(setMinutes(new Date(), 0), 0);

  const [title, setTitle] = useState("");
  const [calendar, setCalendar] = useState<string>(Object.keys(calendars)[0] ?? "");
  const [start, setStart] = useState<number>(localDisplayDateToUtcTimestamp(refDate));
  const [end, setEnd] = useState<number>(localDisplayDateToUtcTimestamp(addHours(refDate, 1)));
  const [allDay, setAllDay] = useState(false);

  const format = useMemo(() => {
    if (allDay) {
      return formats.date.short.icu;
    }

    return formats.datetime.short.icu;
  }, [allDay, formats]);

  const endForDisplay = useMemo(() => {
    if (!allDay) return end;

    return localDisplayDateToUtcTimestamp(subDays(utcTimestampToLocalDisplayDate(end), 1));
  }, [allDay, end]);

  const handleStartChange = (value: number) => {
    const deltaEnd = end - start;

    setStart(value);
    setEnd(value + deltaEnd);
  };

  const handleEndChange = (value: number | null) => {
    if (value == null) return;

    if (!allDay) {
      setEnd(value);
      return;
    }

    const pickedDay = utcTimestampToLocalDisplayDate(value);
    const exclusiveEnd = addDays(startOfDay(pickedDay), 1);
    setEnd(localDisplayDateToUtcTimestamp(exclusiveEnd));
  };

  const handleAllDayChange = (enabled: boolean) => {
    setAllDay(enabled);

    const now = new Date();
    const hour = enabled ? 0 : now.getUTCHours();

    const startDate = utcTimestampToLocalDisplayDate(start);
    startDate.setHours(hour, 0, 0, 0);
    setStart(localDisplayDateToUtcTimestamp(startDate));

    let endDate = utcTimestampToLocalDisplayDate(end);
    if (enabled) {
      endDate = addDays(startOfDay(endDate), 1);
    } else {
      endDate = subDays(endDate, 1);
      endDate = setHours(endDate, startDate.getHours() + 1);
    }

    setEnd(localDisplayDateToUtcTimestamp(endDate));
  };

  const reset = useCallback(() => {
    const now = new Date();
    setTitle("");
    setStart(localDisplayDateToUtcTimestamp(now));
    setEnd(localDisplayDateToUtcTimestamp(addHours(now, 1)));
    setAllDay(false);
  }, []);

  return {
    reset,
    format,
    title: {
      value: title,
      set: setTitle,
    },
    calendars: {
      value: calendar,
      set: setCalendar,
      options: Object.entries(calendars).map(([id, name]) => ({ value: id, label: name })),
    },
    start: {
      value: start,
      set: handleStartChange,
    },
    end: {
      value: end,
      displayValue: endForDisplay,
      set: handleEndChange,
    },
    allDay: {
      value: allDay,
      set: handleAllDayChange,
    },
  };
};
