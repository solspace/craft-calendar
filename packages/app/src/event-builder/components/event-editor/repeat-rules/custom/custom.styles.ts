import styled from "styled-components";

export const DayMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const MonthMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const DayMatrixButton = styled.button`
  border: 1px solid var(--gray-200);
  background: var(--gray-100);
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;

  &.active {
    background: var(--gray-200);
    border-color: var(--gray-300);
  }
`;
