import { utcDateKey } from "@cal/utils/date";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  startOfWeek,
} from "date-fns";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useConfig } from "./context/config.context";
import {
  MiniCalendarDay,
  MiniCalendarGrid,
  MiniCalendarHeader,
  MiniCalendarMonthButton,
  MiniCalendarWeekdays,
  MiniCalendarWrapper,
} from "./mini-calendar.styles";

type MiniCalendarProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

const utcDate = (year: number, month: number, day: number) => new Date(Date.UTC(year, month, day));
const startOfUtcMonth = (date: Date) => utcDate(date.getUTCFullYear(), date.getUTCMonth(), 1);

export const MiniCalendar: FC<MiniCalendarProps> = ({ selectedDate, onDateSelect }) => {
  const { language, weekStartDay } = useConfig();
  const [visibleMonth, setVisibleMonth] = useState(() => startOfUtcMonth(selectedDate));

  useEffect(() => {
    setVisibleMonth(startOfUtcMonth(selectedDate));
  }, [selectedDate]);

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(language, { month: "long", year: "numeric", timeZone: "UTC" }),
    [language],
  );

  const weekdayFormatter = useMemo(
    () => new Intl.DateTimeFormat(language, { weekday: "narrow", timeZone: "UTC" }),
    [language],
  );

  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) =>
        weekdayFormatter.format(addDays(utcDate(2023, 0, 1), weekStartDay + index)),
      ),
    [weekStartDay, weekdayFormatter],
  );

  const days = useMemo(() => {
    const firstDay = startOfWeek(visibleMonth, { weekStartsOn: weekStartDay });
    const lastDay = endOfWeek(endOfMonth(visibleMonth), { weekStartsOn: weekStartDay });
    const dayCount = differenceInCalendarDays(lastDay, firstDay) + 1;

    return Array.from({ length: dayCount }, (_, index) => addDays(firstDay, index));
  }, [visibleMonth, weekStartDay]);

  const todayKey = utcDateKey(new Date());

  const selectedDateKey = utcDateKey(selectedDate);

  return (
    <MiniCalendarWrapper>
      <MiniCalendarHeader>
        <MiniCalendarMonthButton
          aria-label={Craft.t("calendar", "Previous month")}
          type="button"
          onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
        />
        <span>{monthFormatter.format(visibleMonth)}</span>
        <MiniCalendarMonthButton
          aria-label={Craft.t("calendar", "Next month")}
          type="button"
          $next
          onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
        />
      </MiniCalendarHeader>

      <MiniCalendarWeekdays>
        {weekdays.map((weekday, index) => (
          <span key={`${weekday}-${index}`}>{weekday}</span>
        ))}
      </MiniCalendarWeekdays>

      <MiniCalendarGrid>
        {days.map((day) => {
          const dateKey = utcDateKey(day);

          return (
            <MiniCalendarDay
              key={dateKey}
              aria-label={day.toLocaleDateString(language, { timeZone: "UTC" })}
              type="button"
              $isCurrentMonth={day.getUTCMonth() === visibleMonth.getUTCMonth()}
              $isSelected={dateKey === selectedDateKey}
              $isToday={dateKey === todayKey}
              onClick={() => onDateSelect(day)}
            >
              {day.getUTCDate()}
            </MiniCalendarDay>
          );
        })}
      </MiniCalendarGrid>
    </MiniCalendarWrapper>
  );
};
