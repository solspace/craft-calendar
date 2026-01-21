import type { FC } from "react";
import { Control, type ControlProps } from "../control";

type Props = {
  value?: number;
  onChange?: (value: number) => void;
};

export const NumberInput: FC<Props & ControlProps> = ({ value, onChange, ...controlProps }) => {
  return (
    <Control {...controlProps}>
      <input
        type="number"
        className="text number"
        value={value ?? ""}
        onChange={(event) => onChange?.(Number.parseInt(event.target.value, 10))}
      />
    </Control>
  );
};
