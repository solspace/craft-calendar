import type { FC } from "react";
import { Control, type ControlProps } from "../control";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const TextInput: FC<Props & ControlProps> = ({ value, onChange, ...controlProps }) => {
  return (
    <Control {...controlProps}>
      <input
        type="text"
        className="text text"
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </Control>
  );
};
