import { Control } from "@cal/components/controls/control";
import { Flex } from "@cal/styles/components";
import translate from "@cal/utils/translations";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import clsx from "clsx";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import { MatrixButton, WeekMatrixWrapper } from "./custom.styles";

const days = [
  { weekday: RRule.SU, label: "Sun" },
  { weekday: RRule.MO, label: "Mon" },
  { weekday: RRule.TU, label: "Tue" },
  { weekday: RRule.WE, label: "Wed" },
  { weekday: RRule.TH, label: "Thu" },
  { weekday: RRule.FR, label: "Fri" },
  { weekday: RRule.SA, label: "Sat" },
];

export const ByWeek: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { byweekday } = useSelector(eventSelectors.state);

  return (
    <Flex $direction={"column"} style={{ margin: "20px 0 0", width: "100%" }}>
      <Control label="On">
        <WeekMatrixWrapper>
          {days.map(({ weekday, label }) => (
            <MatrixButton
              key={weekday.weekday}
              type="button"
              className={clsx(byweekday?.includes(weekday.weekday) && "active")}
              onClick={() => {
                let values: number[] = byweekday ? [...byweekday] : [];

                if (values.includes(weekday.weekday)) {
                  values = values.filter((day) => day !== weekday.weekday);
                } else {
                  values.push(weekday.weekday);
                }

                if (values.length === 0) {
                  return;
                }

                dispatch(eventActions.setDays({ type: "byweekday", values }));
              }}
            >
              {translate(label)}
            </MatrixButton>
          ))}
        </WeekMatrixWrapper>
      </Control>
    </Flex>
  );
};
