import { Dropdown, type Option } from "@cal/components/controls/dropdown/dropdown";
import { Flex } from "@cal/styles/components";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeekdayChoiceValue, getWeekdaysForChoice, weekdayChoices } from "./custom.utils";

const positionOptions: Option<number>[] = [
  { value: 1, label: "First" },
  { value: 2, label: "Second" },
  { value: 3, label: "Third" },
  { value: 4, label: "Fourth" },
  { value: -1, label: "Last" },
];

export const RepeatEnd: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { start, bymonth, byweekday, bysetpos } = useSelector(eventSelectors.state);

  const isWeekdayMode = Boolean(bysetpos?.length) && Boolean(byweekday?.length);
  const mode = isWeekdayMode ? "WEEKDAY" : "MONTHDAY";

  const startDate = utcTimestampToLocalDisplayDate(start);
  const defaultWeekday = (startDate.getDay() + 6) % 7;
  const defaultMonth = startDate.getMonth() + 1;

  const selectedPosition = bysetpos?.[0] ?? 1;
  const selectedWeekday = getWeekdayChoiceValue(byweekday, defaultWeekday);
  const selectedMonths = bymonth?.length ? bymonth : [defaultMonth];

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

  if (mode !== "WEEKDAY") {
    return null;
  }

  return (
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
  );
};
