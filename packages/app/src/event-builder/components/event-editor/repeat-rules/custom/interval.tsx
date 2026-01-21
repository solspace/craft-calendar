import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DownIcon from "./icon.down.svg";
import UpIcon from "./icon.up.svg";

type Props = {
  noun?: string;
};

export const Interval: FC<Props> = ({ noun = "day" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { interval } = useSelector(eventSelectors.state);

  return (
    <Wrapper>
      <span>Every</span>
      <Input
        type="text"
        className="text"
        value={interval}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10) || 1;
          dispatch(eventActions.setInterval(value));
        }}
      />
      <BtnGroup>
        <Btn type="button" onClick={() => dispatch(eventActions.setInterval(interval + 1))}>
          <UpIcon />
        </Btn>
        <Btn type="button" onClick={() => dispatch(eventActions.setInterval(interval - 1))}>
          <DownIcon />
        </Btn>
      </BtnGroup>
      <span>
        {noun}
        {interval > 1 ? "s" : ""}
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 60px;
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Btn = styled.button`
  cursor: pointer;
  padding: 2px 4px;

  border: 1px solid var(--gray-200);
  background: var(--gray-100);

  svg {
    width: 12px;
    height: 12px;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:hover {
    background: var(--gray-200);
    border: 1px solid var(--gray-300);
  }
`;
