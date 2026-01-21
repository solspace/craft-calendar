import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import classes from "@cal/utils/classes";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import styled from "styled-components";
import { Interval } from "./interval";

const days = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

export const ByWeek: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { interval, byweekday } = useSelector(eventSelectors.state);

  return (
    <div>
      {JSON.stringify(byweekday)}
      <Interval noun="week" />
      <Wrapper className="field">
        {days.map((day) => (
          <Btn
            key={day.weekday}
            type="button"
            className={classes(byweekday?.includes(day.weekday) && "active")}
            onClick={() => {
              let values: number[] = byweekday ? [...byweekday] : [];

              if (values.includes(day.weekday)) {
                values = values.filter((d) => d !== day.weekday);
              } else {
                values.push(day.weekday);
              }

              dispatch(eventActions.setDays({ type: "byweekday", values }));
            }}
          >
            {day.toString()}
          </Btn>
        ))}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Btn = styled.button`
position: relative;
  cursor: pointer;
  padding: 4px 8px;

  border: 1px solid var(--gray-200);
  background: var(--gray-100);

  svg {
    width: 12px;
    height: 12px;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:not(:first-child) {
    left: -1px;
  }

  &.active {
    background: var(--gray-200);
    border: 1px solid var(--gray-300);
  }

  &:hover {
    z-index: 2;
    background: var(--gray-200);
    border: 1px solid var(--gray-300);

    &.active {
      background: var(--gray-300);
      border: 1px solid var(--gray-400);
    }
  }
`;
