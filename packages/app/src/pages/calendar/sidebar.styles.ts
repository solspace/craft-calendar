import { colors } from "@cal/styles/variables";
import styled from "styled-components";

export const SidebarWrapper = styled.div`
  padding: 0;
`;

export const CalendarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`;

export const CalendarListItem = styled.li`
  margin: 0;
`;

export const CalendarLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${colors.gray800};
  cursor: pointer;
`;

export const CalendarCheckboxInput = styled.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${colors.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`;

export const CalendarCheckbox = styled.span`
  position: relative;

  width: 15px;
  height: 15px;

  border: 1px solid var(--calendar-color);
  border-radius: 50%;
  background-color: var(--calendar-color);

  &:after {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;

    width: 4px;
    height: 7px;

    border: solid var(--calendar-color-contrast);
    border-width: 0 2px 2px 0;

    opacity: 0;
    transform: translate(-50%, -60%) rotate(45deg);
  }
`;

export const CalendarTitle = styled.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SidebarError = styled.div`
  font-size: 13px;
  color: ${colors.error};
`;
