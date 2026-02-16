import { DatePicker } from "@cal/components/controls/date-picker/date-picker";
import { Dropdown, type Option } from "@cal/components/controls/dropdown/dropdown";
import { NumberInput } from "@cal/components/controls/number-input/number-input";
import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import type { RepeatEndType, RepeatType } from "@cal/event-builder/types";
import { Flex } from "@cal/styles/components";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Frequency } from "rrule";
import { CustomRules } from "./custom/custom-rules";
import { RepeatRulesWrapper } from "./repeat-rules.styles";

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

export const RepeatRules: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repeatType, repeatEndType, count, until, freq } = useSelector(eventSelectors.state);

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
              onChange={(value) => dispatch(eventActions.setCount(value))}
            />
          )}
          {repeatEndType === "ON_DATE" && (
            <DatePicker
              label=""
              value={until}
              onChange={(value) => dispatch(eventActions.setUntil(value))}
              datePickerProps={{
                showTimeInput: false,
              }}
            />
          )}
        </Flex>
      )}
    </RepeatRulesWrapper>
  );
};
