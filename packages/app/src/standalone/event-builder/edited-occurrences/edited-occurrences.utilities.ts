import type { DateFormats } from "@cal/types/config";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import { format, isSameDay } from "date-fns";

type OccurrenceTimes = { start: number; end: number; allDay: boolean };

export const formatOccurrenceRange = (
  occurrence: OccurrenceTimes,
  formats?: DateFormats,
): string => {
  const start = utcTimestampToLocalDisplayDate(occurrence.start);
  const end = utcTimestampToLocalDisplayDate(occurrence.end);
  const options = { locale: getDateLocale() };
  const datePattern = formats?.date.short.icu ?? "P";
  const timePattern = formats?.time.short.icu ?? "p";
  const startDate = format(start, datePattern, options);
  const endDate = format(end, datePattern, options);
  const sameDay = isSameDay(start, end);

  if (occurrence.allDay) {
    return `${sameDay ? startDate : `${startDate} - ${endDate}`} (${translate("all day")})`;
  }

  const startTime = format(start, timePattern, options);
  const endTime = format(end, timePattern, options);

  return `${startDate} ${startTime} - ${sameDay ? endTime : `${endDate} ${endTime}`}`;
};
