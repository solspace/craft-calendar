import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DownIcon } from "./icon.down";
import { UpIcon } from "./icon.up";

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
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 18px;
  margin: 0;
  padding: 0;

  color: var(--gray-800);
  cursor: pointer;
  appearance: none;

  border: 1px solid var(--gray-050);
  background: var(--gray-200);

  svg {
    display: block;
    width: 12px;
    height: 12px;
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    margin-top: -1px;
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    position: relative;
    z-index: 1;
    color: var(--gray-800);
    background: var(--button-bg--hover);
  }

  &:focus-visible {
    position: relative;
    z-index: 2;
    outline: 2px solid var(--blue-500);
    outline-offset: 1px;
  }

  &:active {
    background: var(--button-bg--active);
  }
`;
