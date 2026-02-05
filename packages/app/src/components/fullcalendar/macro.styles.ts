import styled from "styled-components";

const siteIcon =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%200a8%208%200%201%200%200%2016A8%208%200%200%200%208%200m5.292%205H9.683a12.6%2012.6%200%200%200-.76-3.029%206.97%206.97%200%200%201%204.369%203.03m-4.54-3.424c.293.746.523%201.705.672%202.924H6.576c.15-1.219.38-2.178.672-2.924A7%207%200%200%201%208%201c.26%200%20.511.054.752.152M5.076%201.971A12.6%2012.6%200%200%200%204.317%205H.708a6.97%206.97%200%200%201%204.368-3.029M.159%206h4.026a13.6%2013.6%200%200%200%200%204H.159a7%207%200%200%201%200-4m.549%205h3.609c.185%201.24.445%202.275.76%203.029A6.97%206.97%200%200%201%20.708%2011m4.54%203.424A7%207%200%200%201%204.576%2011h2.848c-.15%201.219-.38%202.178-.672%202.924A7%207%200%200%201%208%2015a7%207%200%200%201-2.752-.576M8.752%2015.848c-.293-.746-.523-1.705-.672-2.924h2.848c-.15%201.219-.38%202.178-.672%202.924A7%207%200%200%201%208%2015a7%207%200%200%201%20.752.848M11.683%2011h3.609a6.97%206.97%200%200%201-4.368%203.029A12.6%2012.6%200%200%200%2011.683%2011M15.841%2010h-4.026a13.6%2013.6%200%200%200%200-4h4.026a7%207%200%200%201%200%204%22%2F%3E%3C%2Fsvg%3E";
const refreshIcon =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%203a5%205%200%201%200%204.546%202.914.5.5%200%200%201%20.908-.418A6%206%200%201%201%208%202z%22%2F%3E%3Cpath%20d%3D%22M8%204.466V.534a.25.25%200%200%201%20.41-.192L11.23%202.81a.25.25%200%200%201%200%20.384L8.41%205.658A.25.25%200%200%201%208%205.466%22%2F%3E%3C%2Fsvg%3E";
const datepickerIcon =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M3.5%200a.5.5%200%200%201%20.5.5V1h8V.5a.5.5%200%200%201%201%200V1h1a2%202%200%200%201%202%202v1H0V3a2%202%200%200%201%202-2h1V.5a.5.5%200%200%201%20.5-.5%22%2F%3E%3Cpath%20d%3D%22M16%2014a2%202%200%200%201-2%202H2a2%202%200%200%201-2-2V5h16z%22%2F%3E%3C%2Fsvg%3E";

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

  .fc-icon.fc-icon-site,
  .fc-icon.fc-icon-refresh,
  .fc-icon.fc-icon-datepicker {
    width: 14px;
    height: 14px;
    background-color: currentColor;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
  }

  .fc-icon.fc-icon-site::before,
  .fc-icon.fc-icon-refresh::before,
  .fc-icon.fc-icon-datepicker::before,
  .fc-icon.fc-icon-site::after,
  .fc-icon.fc-icon-refresh::after,
  .fc-icon.fc-icon-datepicker::after {
    content: none;
  }

  .fc-icon.fc-icon-site {
    mask-image: url("${siteIcon}");
  }

  .fc-icon.fc-icon-refresh {
    mask-image: url("${refreshIcon}");
  }

  .fc-icon.fc-icon-datepicker {
    mask-image: url("${datepickerIcon}");
  }

  .fc-datepicker-popover {
    position: fixed;
    z-index: 40;
    transform: translateX(-100%);
    box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
  }

  .fc-datepicker-popover .react-datepicker {
    border: 1px solid #d6d9de;
    border-radius: 8px;
  }
`;
