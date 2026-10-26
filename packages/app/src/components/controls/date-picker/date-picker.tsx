import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { getDatePickerTranslations } from "@cal/utils/localization";
import { type FC, type PropsWithChildren, useEffect, useRef, useState } from "react";
import DatePickerControl, { type DatePickerProps } from "react-datepicker";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Control, type ControlProps } from "../control";

import { CalendarIcon } from "./calendar.icon";
import { DatePickerHeader } from "./date-picker.header";
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
  const pickerOpen = useRef(false);
  const handledEscape = useRef(false);
  const [date, setDate] = useState<Date | null>(
    value !== null ? utcTimestampToLocalDisplayDate(value) : null,
  );

  useEffect(() => {
    setDate(value !== null ? utcTimestampToLocalDisplayDate(value) : null);
  }, [value]);

  useEffect(() => {
    const finishEscape = (event: KeyboardEvent) => {
      // Craft can move focus back into its slideout between keydown and keyup.
      if (event.key === "Escape" && handledEscape.current) {
        event.stopPropagation();
        handledEscape.current = false;
      }
    };
    window.addEventListener("keyup", finishEscape, true);
    return () => window.removeEventListener("keyup", finishEscape, true);
  }, []);

  return (
    <Control label={label} id={id} required={required} style={{ margin: 0 }}>
      <DatePickerWrapper
        onKeyDownCapture={(event) => {
          if (event.key === "Escape") handledEscape.current = pickerOpen.current;
        }}
      >
        {/* @ts-ignore cannot get the types to work well when passing props */}
        <DatePickerControl
          {...getDatePickerTranslations()}
          {...datePickerProps}
          onCalendarOpen={() => {
            pickerOpen.current = true;
            datePickerProps?.onCalendarOpen?.();
          }}
          onCalendarClose={() => {
            pickerOpen.current = false;
            datePickerProps?.onCalendarClose?.();
          }}
          renderCustomHeader={
            datePickerProps?.renderCustomHeader ??
            (datePickerProps?.showMonthDropdown || datePickerProps?.showYearDropdown
              ? (header) => (
                  <DatePickerHeader
                    {...header}
                    minDate={datePickerProps.minDate}
                    maxDate={datePickerProps.maxDate}
                    showMonth={!!datePickerProps.showMonthDropdown}
                    showYear={!!datePickerProps.showYearDropdown}
                    locale={
                      typeof datePickerProps.locale === "object"
                        ? datePickerProps.locale
                        : undefined
                    }
                  />
                )
              : undefined)
          }
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
      &.calendar-occurrence-datepicker { z-index: 2000; }
    }

    &__calendar-icon {
      top: 50%;
      left: 10px;
      width: 16px;
      height: 16px;
      padding: 0;
      transform: translateY(-50%);
    }

    &__input-container {
      &.react-datepicker__view-calendar-icon {
        input.text {
          padding-left: 34px;
        }
      }
    }
  }
`;
