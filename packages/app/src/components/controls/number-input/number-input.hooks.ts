import { type ChangeEvent, type FocusEvent, useCallback, useEffect, useRef, useState } from "react";
import { normalizeNumberInputValue, parseNumberInputValue } from "./number-input.utilities";

type UseNumberInputProps = {
  value?: number | null;
  min?: number;
  debounceMs?: number;
  onChange?: (value: number) => void;
};

type CommitMode = "debounced" | "immediate";

export const useNumberInput = ({ value, min, debounceMs, onChange }: UseNumberInputProps) => {
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");
  const pendingChange = useRef<number | undefined>(undefined);

  const clearPendingChange = useCallback(() => {
    if (pendingChange.current !== undefined) {
      window.clearTimeout(pendingChange.current);
      pendingChange.current = undefined;
    }
  }, []);

  const commitValue = useCallback(
    (nextValue: number, mode: CommitMode = "debounced") => {
      clearPendingChange();

      if (!onChange) {
        return;
      }

      if (!debounceMs || mode === "immediate") {
        onChange(nextValue);
        return;
      }

      pendingChange.current = window.setTimeout(() => {
        pendingChange.current = undefined;
        onChange(nextValue);
      }, debounceMs);
    },
    [clearPendingChange, debounceMs, onChange],
  );

  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

  useEffect(() => clearPendingChange, [clearPendingChange]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();

      const nextValue = event.currentTarget.value;
      setInputValue(nextValue);

      const parsed = parseNumberInputValue(nextValue);
      if (parsed === null || (min !== undefined && parsed < min)) {
        clearPendingChange();
        return;
      }

      commitValue(parsed);
    },
    [clearPendingChange, commitValue, min],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      event.stopPropagation();

      const normalized = normalizeNumberInputValue({ inputValue, value, min });

      setInputValue(normalized.toString());
      commitValue(normalized, "immediate");
    },
    [commitValue, inputValue, min, value],
  );

  return {
    inputValue,
    handleChange,
    handleBlur,
  };
};
