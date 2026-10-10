import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { getDatePickerTranslations } from "@cal/utils/localization";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import DatePickerControl, { type DatePickerProps } from "react-datepicker";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Control, type ControlProps } from "../control";

import { CalendarIcon } from "./calendar.icon";
import { datePickerTheme } from "./date-picker.theme";
import "react-datepicker/dist/react-datepicker.css";

export { CalendarIcon as Icon };

type Props = {
  value: number | null;
  onChange?: (value: number | null) => void;
  datePickerProps?: Omit<DatePickerProps, "onChange">;
  portal?: boolean;
} & ControlProps;

export const DatePicker: FC<Props> = ({
  value,
  onChange,
  label,
  id,
  required,
  datePickerProps,
  portal = false,
}) => {
  const [date, setDate] = useState<Date | null>(
    value !== null ? utcTimestampToLocalDisplayDate(value) : null,
  );

  useEffect(() => {
    setDate(value !== null ? utcTimestampToLocalDisplayDate(value) : null);
  }, [value]);

  return (
    <Control label={label} id={id} required={required} style={{ margin: 0 }}>
      <DatePickerWrapper>
        {/* @ts-ignore cannot get the types to work well when passing props */}
        <DatePickerControl
          {...getDatePickerTranslations()}
          {...datePickerProps}
          portalId={portal ? undefined : datePickerProps?.portalId}
          popperContainer={portal ? DatePickerPortal : datePickerProps?.popperContainer}
          id={id ?? datePickerProps?.id}
          ariaRequired={required ? "true" : undefined}
          wrapperClassName="fullwidth"
          className="text fullwidth"
          selected={date}
          onChange={(date: Date | null) => {
            const time = date ? localDisplayDateToUtcTimestamp(date) : null;
            if (onChange) {
              onChange(time);
            }
          }}
        />
      </DatePickerWrapper>
    </Control>
  );
};

// Keep the same picker theme when the popup is portalled out of a scrolling form.
const DatePickerPortal: FC<PropsWithChildren> = ({ children }) =>
  children
    ? createPortal(<DatePickerWrapper $portal>{children}</DatePickerWrapper>, document.body)
    : null;

const DatePickerWrapper = styled.div<{ $portal?: boolean }>`
  ${datePickerTheme}

  .react-datepicker {
    &-popper {
      z-index: ${({ $portal }) => ($portal ? 100 : 13)};
      width: 327px;

      &:has(.react-datepicker__time-container) {
        width: 380px;
      }
    }

    &__header {
      border-top-right-radius: 0.3rem;
      border-top-left-radius: 0.3rem;
    }

    &__current-month {
      display: none;
    }

    &__today-button, &__time {
      border-bottom-left-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
    }

    &__time-container {
      top: -1px;
    }

    &__calendar-icon {
      width: 1.25em;
      height: 1.25em;
    }

    &__time-list {
      height: 252px !important;
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
