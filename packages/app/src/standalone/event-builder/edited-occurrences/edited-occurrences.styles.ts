import styled from "styled-components";

export const EditedOccurrencesWrapper = styled.div`
  &:empty {
    display: none;
  }

  margin: 0 20px 20px;
  padding: 18px 0 0;
  border-top: 1px solid var(--gray-200);

  h3 {
    margin: 0 0 6px;
    color: var(--gray-700);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 20px;
  }

  > p {
    margin: 0 0 8px;
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
`;

export const EditedOccurrenceItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  margin: 0;
  padding: 8px 0;
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
    font-weight: 400;
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
    gap: 2px;

    .btn {
      min-height: 26px;
      padding-inline: 10px;
      font-size: 12px;
    }
  }
`;
