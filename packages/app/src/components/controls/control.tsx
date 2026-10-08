import translate from "@cal/utils/translations";
import type { CSSProperties, FC, PropsWithChildren } from "react";

export type ControlProps = {
  label?: string;
  id?: string;
  style?: CSSProperties;
  required?: boolean;
};

export const Control: FC<PropsWithChildren<ControlProps>> = ({
  label,
  id,
  style,
  required,
  children,
}) => {
  return (
    <div className="field" style={style}>
      {label !== undefined && (
        <div className="heading">
          <label htmlFor={id} className={required ? "required" : undefined}>
            {label === "" ? "\u00A0" : translate(label)}
          </label>
        </div>
      )}
      <div className="input">{children}</div>
    </div>
  );
};
