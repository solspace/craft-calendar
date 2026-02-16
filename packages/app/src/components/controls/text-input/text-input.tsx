import { type FC, useEffect, useRef } from "react";
import { Control, type ControlProps } from "../control";

type Props = {
  value?: string;
  placeholder?: string;
  autofocus?: boolean;
  onChange?: (value: string) => void;
};

export const TextInput: FC<Props & ControlProps> = ({
  value,
  placeholder,
  autofocus,
  onChange,
  ...controlProps
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      setTimeout(() => {
        ref.current?.focus();
      }, 10);
    }
  }, [autofocus]);

  return (
    <Control {...controlProps}>
      <input
        ref={ref}
        type="text"
        className="text text"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </Control>
  );
};
