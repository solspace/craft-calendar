type NormalizeNumberInputValueInput = {
  inputValue: string;
  value?: number | null;
  min?: number;
};

export const parseNumberInputValue = (value: string): number | null => {
  if (!value.trim()) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? Math.trunc(parsed) : null;
};

export const normalizeNumberInputValue = ({
  inputValue,
  value,
  min,
}: NormalizeNumberInputValueInput): number => {
  const parsed = parseNumberInputValue(inputValue);
  const fallback = min ?? value ?? 0;
  const normalized = parsed ?? fallback;

  return min === undefined ? normalized : Math.max(normalized, min);
};
