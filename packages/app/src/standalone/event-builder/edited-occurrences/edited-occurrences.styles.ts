import styled from "styled-components";

export const EditedOccurrencesWrapper = styled.div`
  container-type: inline-size;

  &:empty {
    display: none;
  }

  margin: 0 20px 20px;
  padding: 16px 0 0;
  border-top: 1px solid var(--gray-200);

  > p.warning {
    color: var(--error-color, #cf1124);
  }
`;

export const EditedOccurrenceList = styled.ul`
  && {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  && > li {
    margin: 0;
    list-style: none;
  }
`;

export const EditedOccurrenceItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "details actions"
    "changes actions";
  align-items: center;
  gap: 4px 12px;
  margin: 0;
  padding: 10px 0;
  line-height: 18px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  .details {
    grid-area: details;
    min-width: 0;
  }

  &.is-orphaned .details {
    color: var(--gray-600);
  }

  .title {
    min-width: 0;
    font-size: 13px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .date {
    margin-top: 2px;
    color: var(--gray-600);
    font-size: 12px;
    font-weight: 400;
    overflow-wrap: anywhere;
  }

  .changes {
    grid-area: changes;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 8px;
    min-width: 0;
    color: var(--gray-600);
    font-size: 12px;
    overflow-wrap: anywhere;
  }

  .state {
    padding: 1px 6px;
    border-radius: var(--small-border-radius, 3px);
    background-color: var(--gray-100);
    font-size: 11px;
    font-weight: 400;
    color: var(--gray-600);

    &.cancelled {
      color: var(--yellow-700);
      background-color: var(--yellow-050);
    }
  }

  .actions {
    grid-area: actions;
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

  @container (min-width: 440px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) auto;
    grid-template-areas: "details changes actions";
    column-gap: 16px;
  }
`;
