import type { FC } from "react";
import { Control, type ControlProps } from "../control";

export type Option<T = string | number> = {
  value: T;
  label: string;
};

type Props = {
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
} & ControlProps;

export const Dropdown: FC<Props> = ({ options, value, onChange, ...controlProps }) => {
  return (
    <Control {...controlProps}>
      <div className="select fullwidth">
        <select
          className="fullwidth"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Control>
  );
};
