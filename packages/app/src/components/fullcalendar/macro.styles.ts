import styled from "styled-components";

export const MacroWrapper = styled.div`
  table:not(.data) {
    td, th {
      padding-block: 0;

      &:not(:last-child) {
        padding-inline-end: 0;
      }

      &:not(:first-child) {
        padding-inline-start: 0;
      }
    }
  }

  .fc-header-toolbar.fc-toolbar {
    .fc-toolbar-chunk {
      &:first-child {
        flex: 0 0 300px;
      }

      &:last-child {
        display: flex;
        justify-content: end;

        flex: 0 0 300px;
      }
    }
  }

  .fc-icon {
    font-size: 16px !important;
    font-family: Craft, sans-serif !important;

    &.fc-icon-calendar {
      &::after {
        content: "date";
      }
    }
  }
`;
