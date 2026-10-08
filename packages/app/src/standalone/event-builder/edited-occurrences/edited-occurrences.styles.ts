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
    "title actions"
    "date actions"
    "changes actions";
  align-items: center;
  gap: 2px 12px;
  margin: 0;
  padding: 8px 0;
  line-height: 18px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  &.is-orphaned .date {
    color: var(--gray-500);
  }

  .title {
    grid-area: title;
    min-width: 0;
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .date {
    grid-area: date;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 8px;
    font-size: 13px;
    font-weight: 400;
  }

  .date-value {
    white-space: nowrap;
  }

  .changes {
    grid-area: changes;
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

  &.no-custom-title {
    grid-template-areas:
      "date actions"
      "changes actions";

    .title {
      display: none;
    }
  }

  @container (min-width: 440px) {
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas:
      "title date actions"
      "changes changes actions";
    gap: 2px 12px;

    &.no-custom-title {
      grid-template-areas:
        "date date actions"
        "changes changes actions";
    }
  }

  @container (min-width: 560px) {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto;
    grid-template-areas: "title date changes actions";
    gap: 12px;

    &.no-custom-title {
      grid-template-areas: "date date changes actions";
    }
  }
`;
