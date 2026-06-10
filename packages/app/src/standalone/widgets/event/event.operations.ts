import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import {
  addDays,
  addMinutes,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
  subDays,
} from "date-fns";
import { useCallback, useMemo, useState } from "react";
import type { EventWidgetConfig } from "./event.types";

export const useEventState = (config: EventWidgetConfig) => {
  const { formats, calendars } = config;
  const refDate = setSeconds(setMinutes(new Date(), 0), 0);
  const durationSeconds = Math.max(1, config.eventDuration) * 60;

  const [title, setTitle] = useState("");
  const [calendar, setCalendar] = useState<string>(Object.keys(calendars)[0] ?? "");
  const [start, setStart] = useState<number>(
    localDisplayDateToUtcTimestamp(config.allDayDefault ? startOfDay(refDate) : refDate),
  );
  const [end, setEnd] = useState<number>(
    localDisplayDateToUtcTimestamp(
      config.allDayDefault
        ? addDays(startOfDay(refDate), 1)
        : addMinutes(refDate, config.eventDuration),
    ),
  );
  const [allDay, setAllDay] = useState(config.allDayDefault);

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
    setStart(value);
    setEnd(value + (allDay ? end - start : durationSeconds));
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
      endDate = setHours(endDate, startDate.getHours());
      endDate = addMinutes(endDate, config.eventDuration);
    }

    setEnd(localDisplayDateToUtcTimestamp(endDate));
  };

  const reset = useCallback(() => {
    const now = new Date();
    setTitle("");
    setStart(localDisplayDateToUtcTimestamp(config.allDayDefault ? startOfDay(now) : now));
    setEnd(
      localDisplayDateToUtcTimestamp(
        config.allDayDefault ? addDays(startOfDay(now), 1) : addMinutes(now, config.eventDuration),
      ),
    );
    setAllDay(config.allDayDefault);
  }, [config.allDayDefault, config.eventDuration]);

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
