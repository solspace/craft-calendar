import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import clsx from "clsx";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import { MatrixButton, WeekMatrixWrapper } from "./custom.styles";
import { Interval } from "./interval";

const days = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

export const ByWeek: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { byweekday } = useSelector(eventSelectors.state);

  return (
    <div>
      <Interval noun="week" />
      <WeekMatrixWrapper className="field">
        {days.map((day) => (
          <MatrixButton
            key={day.weekday}
            type="button"
            className={clsx(byweekday?.includes(day.weekday) && "active")}
            onClick={() => {
              let values: number[] = byweekday ? [...byweekday] : [];

              if (values.includes(day.weekday)) {
                values = values.filter((d) => d !== day.weekday);
              } else {
                values.push(day.weekday);
              }

              if (values.length === 0) {
                return;
              }

              dispatch(eventActions.setDays({ type: "byweekday", values }));
            }}
          >
            {day.toString()}
          </MatrixButton>
        ))}
      </WeekMatrixWrapper>
    </div>
  );
};
