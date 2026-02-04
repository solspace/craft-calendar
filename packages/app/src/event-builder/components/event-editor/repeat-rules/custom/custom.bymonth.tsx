import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import { Flex } from "@cal/styles/components";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, type Option } from "../../../controls/dropdown/dropdown";
import { getWeekdayChoiceValue, getWeekdaysForChoice, weekdayChoices } from "./custom.utils";
import { Interval } from "./interval";
import { DayMatrix } from "./matrix.days";

const modeOptions: Option<string>[] = [
  { value: "MONTHDAY", label: "On day of month" },
  { value: "WEEKDAY", label: "On the nth weekday" },
];

const positionOptions: Option<number>[] = [
  { value: 1, label: "First" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
  { value: -1, label: "Last" },
];

export const ByMonth: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { start, bymonthday, byweekday, bysetpos } = useSelector(eventSelectors.state);
  const startDate = new Date(start * 1000);
  const defaultMonthDay = startDate.getDate();
  const defaultWeekday = (startDate.getDay() + 6) % 7;

  const isWeekdayMode = Boolean(bysetpos?.length) && Boolean(byweekday?.length);
  const mode = isWeekdayMode ? "WEEKDAY" : "MONTHDAY";
  const selectedMonthDays = bymonthday?.length ? bymonthday : [defaultMonthDay];
  const selectedPosition = bysetpos?.[0] ?? 1;
  const selectedWeekday = getWeekdayChoiceValue(byweekday, defaultWeekday);

  const setMonthDayMode = (values: number[]) => {
    dispatch(
      eventActions.setByRules({
        bymonthday: values.length ? values : undefined,
        byweekday: undefined,
        bysetpos: undefined,
      }),
    );
  };

  const setWeekdayMode = (weekdayValue: string, position: number) => {
    dispatch(
      eventActions.setByRules({
        bymonthday: undefined,
        byweekday: getWeekdaysForChoice(weekdayValue),
        bysetpos: [position],
      }),
    );
  };

  return (
    <div>
      <Interval noun="month" />
      <div className="field">
        <Dropdown
          label="Repeat On"
          value={mode}
          options={modeOptions}
          onChange={(value) => {
            if (value === "WEEKDAY") {
              setWeekdayMode(selectedWeekday, selectedPosition);
            } else {
              setMonthDayMode(selectedMonthDays);
            }
          }}
        />
      </div>

      {mode === "MONTHDAY" && (
        <DayMatrix
          label={"Days of month"}
          values={selectedMonthDays}
          onChange={(values) => setMonthDayMode(values)}
        />
      )}

      {mode === "WEEKDAY" && (
        <Flex className="field">
          <Dropdown
            label="Position"
            value={selectedPosition}
            options={positionOptions}
            onChange={(value) => setWeekdayMode(selectedWeekday, Number.parseInt(value, 10))}
          />
          <Dropdown
            label="Day"
            value={selectedWeekday}
            options={weekdayChoices.map((choice) => ({
              value: choice.value,
              label: choice.label,
            }))}
            onChange={(value) => setWeekdayMode(value, selectedPosition)}
          />
        </Flex>
      )}
    </div>
  );
};
