import { Control } from "@cal/components/controls/control";
import { Dropdown, type Option } from "@cal/components/controls/dropdown/dropdown";
import { Flex } from "@cal/styles/components";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import clsx from "clsx";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatrixButton, MonthMatrixWrapper } from "./custom.styles";
import { getWeekdayChoiceValue, getWeekdaysForChoice, weekdayChoices } from "./custom.utils";
import { Interval } from "./interval";
import { DayMatrix } from "./matrix.days";

const modeOptions: Option<string>[] = [
  { value: "MONTHDAY", label: "On specific date" },
  { value: "WEEKDAY", label: "On the nth weekday" },
];

const positionOptions: Option<number>[] = [
  { value: 1, label: "First" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
  { value: -1, label: "Last" },
];

const monthOptions: Option<number>[] = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

export const ByYear: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { start, bymonth, bymonthday, byweekday, bysetpos } = useSelector(eventSelectors.state);
  const startDate = utcTimestampToLocalDisplayDate(start);
  const defaultMonthDay = startDate.getDate();
  const defaultMonth = startDate.getMonth() + 1;
  const defaultWeekday = (startDate.getDay() + 6) % 7;

  const isWeekdayMode = Boolean(bysetpos?.length) && Boolean(byweekday?.length);
  const mode = isWeekdayMode ? "WEEKDAY" : "MONTHDAY";
  const selectedMonthDays = bymonthday?.length ? bymonthday : [defaultMonthDay];
  const selectedMonths = bymonth?.length ? bymonth : [defaultMonth];
  const selectedPosition = bysetpos?.[0] ?? 1;
  const selectedWeekday = getWeekdayChoiceValue(byweekday, defaultWeekday);

  const setMonthDayMode = (monthValues: number[], dayValues: number[]) => {
    dispatch(
      eventActions.setByRules({
        bymonth: monthValues.length ? monthValues : undefined,
        bymonthday: dayValues.length ? dayValues : undefined,
        byweekday: undefined,
        bysetpos: undefined,
      }),
    );
  };

  const setWeekdayMode = (monthValues: number[], weekdayValue: string, position: number) => {
    dispatch(
      eventActions.setByRules({
        bymonth: monthValues.length ? monthValues : undefined,
        bymonthday: undefined,
        byweekday: getWeekdaysForChoice(weekdayValue),
        bysetpos: [position],
      }),
    );
  };

  return (
    <div>
      <Interval noun="year" />

      <Control label="Month">
        <MonthMatrixWrapper>
          {monthOptions.map((month) => {
            const isActive = selectedMonths.includes(month.value);

            return (
              <MatrixButton
                key={month.value}
                type="button"
                className={clsx(isActive && "active")}
                onClick={() => {
                  let values = selectedMonths.filter((value) => value !== month.value);
                  if (!isActive) {
                    values = [...values, month.value];
                  }

                  if (values.length === 0) {
                    return;
                  }

                  values.sort((a, b) => a - b);
                  if (mode === "WEEKDAY") {
                    setWeekdayMode(values, selectedWeekday, selectedPosition);
                  } else {
                    setMonthDayMode(values, selectedMonthDays);
                  }
                }}
              >
                {month.label}
              </MatrixButton>
            );
          })}
        </MonthMatrixWrapper>
      </Control>

      <div className="field">
        <Dropdown
          label="Repeat on"
          value={mode}
          options={modeOptions}
          onChange={(value) => {
            if (value === "WEEKDAY") {
              setWeekdayMode(selectedMonths, selectedWeekday, selectedPosition);
            } else {
              setMonthDayMode(selectedMonths, selectedMonthDays);
            }
          }}
        />
      </div>

      {mode === "MONTHDAY" && (
        <DayMatrix
          label="Days of Month"
          values={selectedMonthDays}
          onChange={(values) => setMonthDayMode(selectedMonths, values)}
        />
      )}

      {mode === "WEEKDAY" && (
        <Flex className="field">
          <Dropdown
            label="Position"
            value={selectedPosition}
            options={positionOptions}
            onChange={(value) =>
              setWeekdayMode(selectedMonths, selectedWeekday, Number.parseInt(value, 10))
            }
          />
          <Dropdown
            label="Day"
            value={selectedWeekday}
            options={weekdayChoices.map((choice) => ({
              value: choice.value,
              label: choice.label,
            }))}
            onChange={(value) => setWeekdayMode(selectedMonths, value, selectedPosition)}
          />
        </Flex>
      )}
    </div>
  );
};
