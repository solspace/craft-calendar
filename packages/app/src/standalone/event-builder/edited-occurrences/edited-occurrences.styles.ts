import styled from "styled-components";

export const EditedOccurrencesWrapper = styled.div`
  &:empty {
    display: none;
  }

  margin-top: 20px;
  padding: 20px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg, var(--large-border-radius, 5px));
  background-color: var(--gray-050);

  h3 {
    margin: 0 0 4px;
    font-size: 14px;
    line-height: 20px;
  }

  > p {
    margin: 0 0 16px;
    color: var(--gray-600);
    font-size: 13px;
    line-height: 20px;
  }

  > p.warning {
    color: var(--error-color, #cf1124);
  }
`;

export const EditedOccurrenceList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--gray-200);
  border-radius: var(--large-border-radius, 5px);
  background-color: var(--custom-bg-color, var(--gray-050));
  overflow: hidden;
`;

export const EditedOccurrenceItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  margin: 0;
  padding: 12px 16px;
  line-height: 1.5;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  &.is-orphaned .date {
    color: var(--gray-500);
  }

  .details {
    flex: 1 1 220px;
    min-width: 0;
  }

  .date {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 8px;
    font-size: 13px;
    font-weight: 600;
  }

  .title {
    margin-top: 2px;
    font-size: 13px;
  }

  .changes {
    margin-top: 2px;
    color: var(--gray-600);
    font-size: 12px;
  }

  .state {
    padding: 1px 6px;
    border-radius: var(--small-border-radius, 3px);
    background-color: var(--gray-100);
    font-size: 11px;
    font-weight: 400;
    color: var(--gray-600);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 auto;
    align-items: center;
    gap: 6px;

    .btn {
      min-height: 26px;
      padding-inline: 10px;
      font-size: 12px;
    }
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;
