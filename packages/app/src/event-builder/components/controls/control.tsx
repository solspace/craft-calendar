import translate from "@cal/utils/translations";
import type { FC, PropsWithChildren } from "react";

export type ControlProps = {
  label?: string;
  id?: string;
};

export const Control: FC<PropsWithChildren<ControlProps>> = ({ label, id, children }) => {
  return (
    <div className="field">
      {label !== undefined && (
        <div className="heading">
          <label htmlFor={id}>{translate(label)}</label>
        </div>
      )}
      <div className="input">{children}</div>
    </div>
  );
};
