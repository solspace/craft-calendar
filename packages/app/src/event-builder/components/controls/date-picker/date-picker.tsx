import { type FC, useEffect, useState } from "react";
import DatePickerControl, { type DatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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
      {/* @ts-ignore cannot get the types to work well when passing props */}
      <DatePickerControl
        {...datePickerProps}
        wrapperClassName="fullwidth"
        className="text fullwidth"
        selected={date}
        onChange={(date: Date | null) => {
          const time = date ? date.getTime() / 1000 : null;
          if (onChange) {
            console.log("saving time", time, date.getTime());
            onChange(time);
          }
        }}
      />
    </Control>
  );
};
