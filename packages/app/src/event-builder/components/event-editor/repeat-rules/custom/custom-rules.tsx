import { eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Frequency } from "rrule";
import { ByDay } from "./custom.byday";
import { ByWeek } from "./custom.byweek";

export const CustomRules: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { freq, interval } = useSelector(eventSelectors.state);

  console.log(freq, Frequency.DAILY);

  if (freq === Frequency.DAILY) {
    return <ByDay />;
  }

  if (freq === Frequency.WEEKLY) {
    return <ByWeek />;
  }

  return <div>custom</div>;
};
