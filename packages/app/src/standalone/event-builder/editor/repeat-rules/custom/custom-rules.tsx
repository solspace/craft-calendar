import { eventSelectors } from "@event-builder/store/event.slice";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { Frequency } from "rrule";
import { ByDay } from "./custom.byday";
import { ByMonth } from "./custom.bymonth";
import { ByWeek } from "./custom.byweek";
import { ByYear } from "./custom.byyear";

export const CustomRules: FC = () => {
  const { freq } = useSelector(eventSelectors.state);

  if (freq === Frequency.DAILY) {
    return <ByDay />;
  }

  if (freq === Frequency.WEEKLY) {
    return <ByWeek />;
  }

  if (freq === Frequency.MONTHLY) {
    return <ByMonth />;
  }

  if (freq === Frequency.YEARLY) {
    return <ByYear />;
  }

  return null;
};
