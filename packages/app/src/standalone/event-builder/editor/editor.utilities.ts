import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { addDays, addMinutes, startOfDay, subDays } from "date-fns";

type NormalizeEndTimestampInput = {
  value: number;
  start: number;
  allDay: boolean;
  timeInterval: number;
};

export const getAllDayEndDisplayTimestamp = (end: number): number => {
  return localDisplayDateToUtcTimestamp(subDays(utcTimestampToLocalDisplayDate(end), 1));
};

export const isEndTimeAllowed = (time: Date, start: number, timeInterval: number): boolean => {
  const minimumEndDate = getMinimumTimedEndDate(start, timeInterval);

  return time.getTime() >= minimumEndDate.getTime();
};

export const normalizeEndTimestamp = ({
  value,
  start,
  allDay,
  timeInterval,
}: NormalizeEndTimestampInput): number => {
  if (allDay) {
    const pickedDay = utcTimestampToLocalDisplayDate(value);
    const exclusiveEnd = addDays(startOfDay(pickedDay), 1);

    return localDisplayDateToUtcTimestamp(exclusiveEnd);
  }

  const pickedEndDate = utcTimestampToLocalDisplayDate(value);
  const minimumEndDate = getMinimumTimedEndDate(start, timeInterval);

  if (pickedEndDate.getTime() >= minimumEndDate.getTime()) {
    return value;
  }

  return localDisplayDateToUtcTimestamp(minimumEndDate);
};

const getMinimumTimedEndDate = (start: number, timeInterval: number): Date => {
  return addMinutes(utcTimestampToLocalDisplayDate(start), timeInterval);
};
