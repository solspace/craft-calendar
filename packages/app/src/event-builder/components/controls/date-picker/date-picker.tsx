import { type FC, useEffect, useState } from "react";
import DatePickerControl, { type DatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Control, type ControlProps } from "../control";

type Props = {
  value: number | null;
  onChange?: (value: number | null) => void;
  datePickerProps?: Omit<DatePickerProps, "onChange">;
} & ControlProps;

export const DatePicker: FC<Props> = ({ value, onChange, label, id, datePickerProps }) => {
  const [date, setDate] = useState<Date | null>(value ? new Date(value * 1000) : null);

  useEffect(() => {
    setDate(value ? new Date(value * 1000) : null);
  }, [value]);

  return (
    <Control label={label} id={id}>
      <DatePickerWrapper>
        {/* @ts-ignore cannot get the types to work well when passing props */}
        <DatePickerControl
          {...datePickerProps}
          wrapperClassName="fullwidth"
          className="text fullwidth"
          selected={date}
          onChange={(date: Date | null) => {
            const time = date ? date.getTime() / 1000 : null;
            if (onChange) {
              onChange(time);
            }
          }}
        />
      </DatePickerWrapper>
    </Control>
  );
};

const DatePickerWrapper = styled.div`
  .react-datepicker {
    &-popper {
      width: 327px;
    }

    &__calendar-icon {
      width: 1.25em;
      height: 1.25em;
    }

    &__input-container {
      &.react-datepicker__view-calendar-icon {
        input.text {
          padding-left: 2.25em;
        }
      }
    }
  }
`;
