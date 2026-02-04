import styled from "styled-components";

export const DayMatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;

  background: var(--gray-200);
  border: 1px solid var(--gray-200);
`;

export const MonthMatrixWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;

  border: 1px solid var(--gray-200);
`;

export const MatrixButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  margin-left: -1px;
  margin-bottom: -1px;

  background: var(--gray-100);
  border-right: inherit;
  border-bottom: inherit;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    background: var(--gray-300);
    color: white;
  }
`;

export const MatrixPlaceholder = styled.div`
  background: var(--gray-100);
  padding: 0.5rem;
  width: 100%;
  opacity: 0.5;

  user-select: none;
  pointer-events: none;
`;
