import classes from "@cal/utils/classes";
import type { FC } from "react";
import { Control, type ControlProps } from "../control";
import { LightSwitchHandle, LightSwitchWrapper } from "./lightswitch.styles";

type Props = {
  enabled?: boolean;
  errors?: string[];
  onClick?: (enabled: boolean) => void;
} & ControlProps;

export const LightSwitch: FC<Props> = ({ enabled, errors, onClick, ...controlProps }) => {
  return (
    <Control {...controlProps}>
      <LightSwitchWrapper
        className={classes(enabled && "on", errors && "error")}
        onClick={() => onClick?.(!enabled)}
      >
        <LightSwitchHandle />
      </LightSwitchWrapper>
    </Control>
  );
};
