import styled from "styled-components";

export const EditedOccurrencesWrapper = styled.div`
  &:empty {
    display: none;
  }

  margin-top: 24px;

  h3 {
    margin: 0 0 4px;
  }

  > p {
    margin: 0 0 10px;
    color: var(--gray-600);
  }
`;

export const EditedOccurrenceList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--gray-200);
  border-radius: var(--large-border-radius, 5px);
`;

export const EditedOccurrenceItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  &.is-orphaned .date {
    color: var(--gray-500);
  }

  .details {
    flex: 1 1 auto;
    min-width: 0;
  }

  .date {
    font-weight: 600;
  }

  .changes {
    color: var(--gray-600);
    font-size: 13px;
  }

  .state {
    margin-inline-start: 6px;
    font-weight: 400;
    color: var(--gray-600);
  }

  .actions {
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
  }
`;
