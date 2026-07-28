import cslx from "clsx";
import type { FC } from "react";
import { Control, type ControlProps } from "../control";

type Props = {
  enabled?: boolean;
  errors?: string[];
  onClick?: (enabled: boolean) => void;
} & ControlProps;

// Renders the native lightswitch markup so we pull in Craft's own styling
export const LightSwitch: FC<Props> = ({ enabled, errors, onClick, ...controlProps }) => {
  return (
    <Control {...controlProps}>
      <button
        type="button"
        role="switch"
        aria-checked={enabled ?? false}
        className={cslx("lightswitch", enabled && "on", errors && "error")}
        onClick={() => onClick?.(!enabled)}
      >
        <div className="lightswitch-container">
          <div className="handle" />
        </div>
      </button>
    </Control>
  );
};
