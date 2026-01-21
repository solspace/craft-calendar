import styled from "styled-components";

export const CalendarPreviewWrapper = styled.div`
  flex: 2;

  display: flex;
  justify-content: end;

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
      pointer-events: none;

      > thead {
        font-size: 10px;
      }

      >tbody {

        td.fc-day  {
          padding-inline-start: 0;
          padding-inline-end: 0;

          &.fc-has-event {
            background: var(--gray-100);

            &.fc-day-today {
              background: var(--custom-bg-color, var(--gray-200));
            }
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
