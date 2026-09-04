import styled from "styled-components";

export const MiniCalendarWrapper = styled.div`
  color: var(--gray-600);
`;

export const MiniCalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  margin-bottom: 10px;

  > span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
  }
`;

export const MiniCalendarMonthButton = styled.button<{ $next?: boolean }>`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: ${({ $next }) => ($next ? "4px" : "7px")};
    width: 7px;
    height: 7px;
    border: solid var(--gray-600);
    border-width: 0 0 2px 2px;
    transform: rotate(${({ $next }) => ($next ? "225deg" : "45deg")});
  }

  &:hover {
    background: var(--gray-100);
  }
`;

export const MiniCalendarWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`;

export const MiniCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`;

export const MiniCalendarDay = styled.button<{
  $isCurrentMonth: boolean;
  $isSelected: boolean;
  $isToday: boolean;
}>`
  justify-self: center;
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: ${({ $isToday }) => ($isToday ? "var(--primary-button-bg)" : "transparent")};
  color: ${({ $isCurrentMonth, $isToday }) => {
    if ($isToday) {
      return "var(--white)";
    }

    return $isCurrentMonth ? "var(--gray-500)" : "var(--gray-300)";
  }};
  cursor: pointer;
  font-size: 13px;
  line-height: 1;

  ${({ $isSelected, $isToday }) =>
    $isSelected && !$isToday && "box-shadow: inset 0 0 0 2px var(--gray-300);"}

  &:hover {
    background: ${({ $isToday }) => ($isToday ? "var(--primary-button-bg)" : "var(--gray-100)")};
  }
`;
