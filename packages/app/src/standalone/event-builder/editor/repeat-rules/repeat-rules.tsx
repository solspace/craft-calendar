import { DatePicker } from "@cal/components/controls/date-picker/date-picker";
import { Dropdown, type Option } from "@cal/components/controls/dropdown/dropdown";
import { NumberInput } from "@cal/components/controls/number-input/number-input";
import { Flex } from "@cal/styles/components";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { appSelectors } from "@event-builder/store/app.slice";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import type { RepeatEndType, RepeatType } from "@event-builder/types";
import { format } from "date-fns";
import { type FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Frequency } from "rrule";
import { CustomRules } from "./custom/custom-rules";
import { DateManager } from "./date-manager";
import { RepeatRulesWrapper } from "./repeat-rules.styles";
import { useRRuleUpdates } from "./use-rrule";

const options: Option<RepeatType>[] = [
  { value: "NEVER", label: "Never" },
  { value: "DAILY", label: "Every Day" },
  { value: "WEEKLY", label: "Every Week" },
  { value: "MONTHLY", label: "Every Month" },
  { value: "YEARLY", label: "Every Year" },
  { value: "CUSTOM", label: "Custom..." },
] as const;

const endOptions: Option<RepeatEndType>[] = [
  { value: "NEVER", label: "Never" },
  { value: "AFTER", label: "After..." },
  { value: "ON_DATE", label: "On Date..." },
];

const freqOptions: Option<Frequency>[] = [
  { value: Frequency.DAILY, label: "Daily" },
  { value: Frequency.WEEKLY, label: "Weekly" },
  { value: Frequency.MONTHLY, label: "Monthly" },
  { value: Frequency.YEARLY, label: "Yearly" },
];

const repeatCountDebounceMs = 300;

export const RepeatRules: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector(eventSelectors.state);
  const weekStartDay = useSelector(appSelectors.weekStartDay);
  const { repeatType, repeatEndType, count, until, freq, start } = state;
  const showExclusions = repeatType !== "NEVER";

  const {
    addedDates,
    excludedDates,
    addFixedDate,
    removeFixedDate,
    canAddOccurrence,
    canExcludeOccurrence,
  } = useRRuleUpdates();

  const pickerStartDate = useMemo(() => utcTimestampToLocalDisplayDate(start), [start]);

  const formatDate = (value: number) => format(utcTimestampToLocalDisplayDate(value), "yyyy-MM-dd");

  return (
    <RepeatRulesWrapper>
      <Flex>
        <Dropdown
          label="Repeat"
          value={repeatType}
          options={options}
          onChange={(value) => dispatch(eventActions.setRepeatType(value as RepeatType))}
        />

        {repeatType === "CUSTOM" && (
          <Dropdown
            label=""
            value={freq}
            options={freqOptions}
            onChange={(value) =>
              dispatch(eventActions.setFreq(Number.parseInt(value, 10) as Frequency))
            }
          />
        )}
      </Flex>

      {repeatType === "CUSTOM" && (
        <div className="field">
          <CustomRules />
        </div>
      )}

      {repeatType !== "NEVER" && (
        <Flex className="field">
          <Dropdown
            label="Repeat End"
            options={endOptions}
            value={repeatEndType}
            onChange={(value) => dispatch(eventActions.setRepeatEndType(value as RepeatEndType))}
          />

          {repeatEndType === "AFTER" && (
            <NumberInput
              label="Times"
              value={count}
              min={1}
              debounceMs={repeatCountDebounceMs}
              onChange={(value) => dispatch(eventActions.setCount(value))}
            />
          )}
          {repeatEndType === "ON_DATE" && (
            <DatePicker
              label=""
              value={until || null}
              onChange={(value) => dispatch(eventActions.setUntil(value))}
              datePickerProps={{
                showTimeInput: false,
                calendarStartDay: weekStartDay,
                minDate: pickerStartDate,
              }}
            />
          )}
        </Flex>
      )}

      <DateManager
        title="Custom Occurrences"
        actionLabel="Add Occurrence"
        actionClass="icon add dashed"
        popoverTitle="Added Occurrences"
        dates={addedDates}
        openToDate={pickerStartDate}
        formatDate={formatDate}
        filterDate={canAddOccurrence}
        weekStartDay={weekStartDay}
        onAdd={(value) => addFixedDate("rdate", value)}
        onRemove={(value) => removeFixedDate("rdate", value)}
      />

      {showExclusions && (
        <DateManager
          title="Exceptions"
          actionLabel="Exclude Occurrence"
          actionClass="icon dashed minus"
          popoverTitle="Excluded Occurrences"
          dates={excludedDates}
          openToDate={pickerStartDate}
          formatDate={formatDate}
          filterDate={canExcludeOccurrence}
          weekStartDay={weekStartDay}
          onAdd={(value) => addFixedDate("exdate", value)}
          onRemove={(value) => removeFixedDate("exdate", value)}
        />
      )}
    </RepeatRulesWrapper>
  );
};
