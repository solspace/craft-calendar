import { CalendarBase } from "@cal/pages/calendar/calendar.styles";
import styled from "styled-components";
import { widgetChrome } from "../widget.shared";

export const MiniWidgetWrapper = styled(CalendarBase)`
  ${widgetChrome}

  && .fc-scrollgrid, && .fc-theme-standard td, && .fc-theme-standard th { border: 0; }
  .fc-view, .fc-scrollgrid { background: transparent; }
  .fc-col-header-cell { background: transparent; }
  && .fc-col-header-cell-cushion {
    padding: 0 0 8px;
    color: var(--gray-500);
    font-size: 11px;
    font-weight: 600;
    text-align: center;
  }
  .fc-daygrid-day-frame { min-height: 40px; }
  .fc-daygrid-day-top { display: flex; justify-content: center; padding: 0; }
  && .fc-daygrid-day { background: transparent; }
  && .fc-daygrid-day-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 36px;
    padding: 0;
    border-radius: 6px;
    color: var(--gray-600);
    font-size: 13px;
    line-height: 1;
    &:hover { background: var(--gray-100); }
    &:focus-visible { outline: 2px solid var(--link-color); outline-offset: 1px; }
  }
  && .fc-day-today .fc-daygrid-day-number {
    background: var(--primary-button-bg);
    color: white;
    .calendar-mini-dots i { background: currentColor !important; }
  }
  .calendar-mini-date { display: grid; justify-items: center; gap: 5px; }
  .calendar-mini-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    height: 4px;
    i { width: 4px; height: 4px; border-radius: 50%; }
  }
  .fc-daygrid-day-events, .fc-daygrid-day-bg { display: none; }
`;
