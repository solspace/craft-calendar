import styled from "styled-components";

const siteIcon =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%200a8%208%200%201%200%200%2016A8%208%200%200%200%208%200m5.292%205H9.683a12.6%2012.6%200%200%200-.76-3.029%206.97%206.97%200%200%201%204.369%203.03m-4.54-3.424c.293.746.523%201.705.672%202.924H6.576c.15-1.219.38-2.178.672-2.924A7%207%200%200%201%208%201c.26%200%20.511.054.752.152M5.076%201.971A12.6%2012.6%200%200%200%204.317%205H.708a6.97%206.97%200%200%201%204.368-3.029M.159%206h4.026a13.6%2013.6%200%200%200%200%204H.159a7%207%200%200%201%200-4m.549%205h3.609c.185%201.24.445%202.275.76%203.029A6.97%206.97%200%200%201%20.708%2011m4.54%203.424A7%207%200%200%201%204.576%2011h2.848c-.15%201.219-.38%202.178-.672%202.924A7%207%200%200%201%208%2015a7%207%200%200%201-2.752-.576M8.752%2015.848c-.293-.746-.523-1.705-.672-2.924h2.848c-.15%201.219-.38%202.178-.672%202.924A7%207%200%200%201%208%2015a7%207%200%200%201%20.752.848M11.683%2011h3.609a6.97%206.97%200%200%201-4.368%203.029A12.6%2012.6%200%200%200%2011.683%2011M15.841%2010h-4.026a13.6%2013.6%200%200%200%200-4h4.026a7%207%200%200%201%200%204%22%2F%3E%3C%2Fsvg%3E";
const refreshIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik01MDAuNyAxMzguN0w1MTIgMTQ5LjRMNTEyIDk2QzUxMiA3OC4zIDUyNi4zIDY0IDU0NCA2NEM1NjEuNyA2NCA1NzYgNzguMyA1NzYgOTZMNTc2IDIyNEM1NzYgMjQxLjcgNTYxLjcgMjU2IDU0NCAyNTZMNDE2IDI1NkMzOTguMyAyNTYgMzg0IDI0MS43IDM4NCAyMjRDMzg0IDIwNi4zIDM5OC4zIDE5MiA0MTYgMTkyTDQ2My45IDE5Mkw0NTYuMyAxODQuOEM0NTYuMSAxODQuNiA0NTUuOSAxODQuNCA0NTUuNyAxODQuMkMzODAuNyAxMDkuMiAyNTkuMiAxMDkuMiAxODQuMiAxODQuMkMxMDkuMiAyNTkuMiAxMDkuMiAzODAuNyAxODQuMiA0NTUuN0MyNTkuMiA1MzAuNyAzODAuNyA1MzAuNyA0NTUuNyA0NTUuN0M0NjMuOSA0NDcuNSA0NzEuMiA0MzguOCA0NzcuNiA0MjkuNkM0ODcuNyA0MTUuMSA1MDcuNyA0MTEuNiA1MjIuMiA0MjEuN0M1MzYuNyA0MzEuOCA1NDAuMiA0NTEuOCA1MzAuMSA0NjYuM0M1MjEuNiA0NzguNSA1MTEuOSA0OTAuMSA1MDEgNTAxQzQwMSA2MDEgMjM4LjkgNjAxIDEzOSA1MDFDMzkuMSA0MDEgMzkgMjM5IDEzOSAxMzlDMjM4LjkgMzkuMSA0MDAuNyAzOSA1MDAuNyAxMzguN3oiLz48L3N2Zz4=";
const datepickerIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik0yMTYgNjRDMjI5LjMgNjQgMjQwIDc0LjcgMjQwIDg4TDI0MCAxMjhMNDAwIDEyOEw0MDAgODhDNDAwIDc0LjcgNDEwLjcgNjQgNDI0IDY0QzQzNy4zIDY0IDQ0OCA3NC43IDQ0OCA4OEw0NDggMTI4TDQ4MCAxMjhDNTE1LjMgMTI4IDU0NCAxNTYuNyA1NDQgMTkyTDU0NCA0ODBDNTQ0IDUxNS4zIDUxNS4zIDU0NCA0ODAgNTQ0TDE2MCA1NDRDMTI0LjcgNTQ0IDk2IDUxNS4zIDk2IDQ4MEw5NiAxOTJDOTYgMTU2LjcgMTI0LjcgMTI4IDE2MCAxMjhMMTkyIDEyOEwxOTIgODhDMTkyIDc0LjcgMjAyLjcgNjQgMjE2IDY0ek0yMTYgMTc2TDE2MCAxNzZDMTUxLjIgMTc2IDE0NCAxODMuMiAxNDQgMTkyTDE0NCAyNDBMNDk2IDI0MEw0OTYgMTkyQzQ5NiAxODMuMiA0ODguOCAxNzYgNDgwIDE3NkwyMTYgMTc2ek0xNDQgMjg4TDE0NCA0ODBDMTQ0IDQ4OC44IDE1MS4yIDQ5NiAxNjAgNDk2TDQ4MCA0OTZDNDg4LjggNDk2IDQ5NiA0ODguOCA0OTYgNDgwTDQ5NiAyODhMMTQ0IDI4OHoiLz48L3N2Zz4=";

export const MacroWrapper = styled.div`
  position: relative;

  table:not(.data) {
    td,
    th {
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

  .fc-sitepicker-button,
  .fc-refresh-button,
  .fc-datepicker-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .fc-icon.fc-icon {
    &-site,
    &-refresh,
    &-datepicker {
      width: 20px;
      height: 20px;
      background-color: currentColor;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;

      &::before, &::after {
        content: none;
      }
    }

    &-site {
      mask-image: url("${siteIcon}");
    }

    &-refresh {
      mask-image: url("${refreshIcon}");
    }

    &-datepicker {
      mask-image: url("${datepickerIcon}");
    }
  }

  .fc-datepicker-popover {
    position: fixed;
    z-index: 40;

    width: max-content;

    transform: translateX(-100%);
    box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
    border-radius: 8px;

    .react-datepicker {
      display: block;

      border: 1px solid #d6d9de;
      border-radius: 8px;

      &__month-container {
        float: none;
      }
    }
  }
`;
