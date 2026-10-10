import type { FC } from "react";
import { Control, type ControlProps } from "../control";
import { useNumberInput } from "./number-input.hooks";

type Props = {
  value?: number | null;
  min?: number;
  debounceMs?: number;
  onChange?: (value: number) => void;
};

export const NumberInput: FC<Props & ControlProps> = ({
  value,
  min,
  debounceMs,
  onChange,
  ...controlProps
}) => {
  const { inputValue, handleChange, handleBlur } = useNumberInput({
    value,
    min,
    debounceMs,
    onChange,
  });

  return (
    <Control {...controlProps}>
      <input
        type="number"
        className="text number"
        min={min}
        step={1}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Control>
  );
};
