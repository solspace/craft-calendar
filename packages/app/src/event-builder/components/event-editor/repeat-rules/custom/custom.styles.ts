import styled from "styled-components";

const RADIUS = "5px";

const ButtonBase = styled.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-100);
  border-right: 1px solid var(--gray-300);
  border-bottom: 1px solid var(--gray-300);
  border-left: none;
  border-top: none;
`;

export const MatrixButton = styled(ButtonBase)`
  cursor: pointer;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--teal-600);
  }
`;

export const MatrixPlaceholder = styled(ButtonBase)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`;

const MatrixWrapper = styled.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--gray-300);
  border: 1px solid var(--gray-300);
  border-radius: ${RADIUS};

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`;

export const DayMatrixWrapper = styled(MatrixWrapper)`
  grid-template-columns: repeat(7, 1fr);

  ${ButtonBase} {
    &:first-child {
      border-top-left-radius: ${RADIUS};
    }

    &:nth-child(7) {
      border-top-right-radius: ${RADIUS};
    }

    &:last-child {
      border-bottom-right-radius: ${RADIUS};
    }

    &:nth-child(29) {
      border-bottom-left-radius: ${RADIUS};
    }

    &:nth-child(7n) {
      border-right: none;
    }

    &:nth-child(n + 29) {
      border-bottom: none;
    }
  }
`;

export const WeekMatrixWrapper = styled(MatrixWrapper)`
  grid-template-columns: repeat(7, 1fr);

  ${ButtonBase} {
    border-bottom: none;

    &:first-child {
      border-top-left-radius: ${RADIUS};
      border-bottom-left-radius: ${RADIUS};
    }

    &:last-child {
      border-right: none;
      border-top-right-radius: ${RADIUS};
      border-bottom-right-radius: ${RADIUS};
    }
  }
`;

export const MonthMatrixWrapper = styled(MatrixWrapper)`
  grid-template-columns: repeat(4, 1fr);

  ${ButtonBase} {
    &:first-child {
      border-top-left-radius: ${RADIUS};
    }

    &:nth-child(4) {
      border-top-right-radius: ${RADIUS};
    }

    &:nth-child(9) {
      border-bottom-left-radius: ${RADIUS};
    }

    &:last-child {
      border-bottom-right-radius: ${RADIUS};
    }

    &:nth-child(4n) {
      border-right: none;
    }

    &:nth-child(n + 9) {
      border-bottom: none;
    }
  }
`;
