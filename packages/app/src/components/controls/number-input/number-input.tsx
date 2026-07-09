import { type FC, useEffect, useState } from "react";
import { Control, type ControlProps } from "../control";

type Props = {
  value?: number | null;
  min?: number;
  onChange?: (value: number) => void;
};

const parseInputValue = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeInputValue = (inputValue: string, value?: number | null, min?: number): number => {
  const parsed = parseInputValue(inputValue);
  const fallback = min ?? value ?? 0;
  const normalized = parsed ?? fallback;

  return min === undefined ? normalized : Math.max(normalized, min);
};

export const NumberInput: FC<Props & ControlProps> = ({
  value,
  min,
  onChange,
  ...controlProps
}) => {
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");

  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

  const updateValue = (nextValue: string) => {
    setInputValue(nextValue);

    const parsed = parseInputValue(nextValue);
    if (parsed === null || (min !== undefined && parsed < min)) {
      return;
    }

    onChange?.(parsed);
  };

  const normalizeOnBlur = () => {
    const normalized = normalizeInputValue(inputValue, value, min);

    setInputValue(normalized.toString());
    onChange?.(normalized);
  };

  return (
    <Control {...controlProps}>
      <input
        type="number"
        className="text number"
        min={min}
        step={1}
        value={inputValue}
        onChange={(event) => updateValue(event.target.value)}
        onBlur={normalizeOnBlur}
      />
    </Control>
  );
};
