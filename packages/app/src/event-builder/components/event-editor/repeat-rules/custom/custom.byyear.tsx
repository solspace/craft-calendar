import { Control } from "@cal/event-builder/components/controls/control";
import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import { Flex } from "@cal/styles/components";
import clsx from "clsx";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, type Option } from "../../../controls/dropdown/dropdown";
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
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const ByYear: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { start, bymonth, bymonthday, byweekday, bysetpos } = useSelector(eventSelectors.state);
  const startDate = new Date(start * 1000);
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
          label="Repeat On"
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
          label="Days of month"
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
