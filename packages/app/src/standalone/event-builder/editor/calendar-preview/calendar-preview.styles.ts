import styled from "styled-components";

export const CalendarPreviewWrapper = styled.div`
  flex: 2;

  display: flex;
  justify-content: end;
  gap: 18px;

  @container (max-width: 1084px) {
    justify-content: start;
  }

  > .field {
    margin: 0;
  }

  table:not(.data) {
    th, td {
      padding-block: 0;

      &:not(:first-child) {
        padding-inline-start: 0;
      }

      &:not(:last-child) {
        padding-inline-end: 0;
      }
    }
  }

  .fc {
    width: 260px;

    .fc-header-toolbar {
        margin-bottom: 1em;

      .fc-toolbar-title {
        font-size: 16px;
      }

      .fc-button {
        font-size: 8px;
      }
    }

    .fc-scrollgrid {
      user-select: none;

      > thead {
        font-size: 10px;
      }

      >tbody {

        td.fc-day  {
          padding-inline-start: 0;
          padding-inline-end: 0;
          cursor: pointer;

          &.fc-has-event {
            background: var(--gray-100);

            &.fc-day-today {
              background: var(--custom-bg-color, var(--gray-200));
            }
          }

          &.fc-extra-date {
            background: color-mix(in srgb, var(--green-100) 72%, white);
          }

          &.fc-excluded-date {
            background: color-mix(in srgb, var(--red-100) 72%, white);
            color: var(--gray-600);
          }

          div.fc-daygrid-day-frame {
            .fc-daygrid-day-top {
              font-size: 10px;
              flex-direction: row;
              justify-content: center;
            }

            .fc-daygrid-day-events {
              display: none;
            }
          }
        }
      }
    }
  }
`;

export const OccurrencePreview = styled.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`;

type DateListProps = {
  $count: number;
};

export const DateList = styled.ul<DateListProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$count > 7 ? "space-between" : "start")};
  gap: 4px;

  height: 215px;
  margin-top: 57px;
`;

export const DateItem = styled.li`
  padding: 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;

  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`;
