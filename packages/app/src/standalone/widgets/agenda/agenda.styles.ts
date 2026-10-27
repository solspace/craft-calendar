import { CalendarWrapper } from "@cal/pages/calendar/calendar.styles";
import styled from "styled-components";
import { widgetChrome } from "../widget.shared";

export const AgendaWidgetWrapper = styled(CalendarWrapper)`
  ${widgetChrome}

  .calendar-widget-grid {
    overflow: visible;
  }

  &[data-view="week"] .calendar-widget-grid {
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }
  &[data-view="week"] .fc { min-width: 560px; }
  .calendar-widget-agenda-range {
    margin-bottom: 12px;
    .calendar-agenda-range { display: flex; align-items: center; gap: 8px; font-size: 12px; }
    .select { flex: 0 1 160px; margin: 0; }
    select { width: 100%; min-height: 28px; font-size: 12px; }
    label { color: var(--gray-600); }
  }
  && .fc-col-header-cell-cushion {
    padding: 6px 2px;
    min-height: 0;
    color: var(--gray-600);
    font-size: 11px;
    line-height: 20px;
    text-align: center;
  }
  && .fc-daygrid-day-number { width: 24px; height: 24px; font-size: 12px; }
  .fc-daygrid-day-top { padding: 3px; }
  .fc-daygrid-day-events { margin-bottom: 8px; }
  .fc-daygrid-event .fc-event-title { font-size: 11px; }
  .fc-more-link {
    display: inline-flex; align-items: center; justify-content: center;
    min-height: 18px; padding: 0 4px; border-radius: 3px;
    color: var(--gray-600); font-size: 10px; line-height: 18px; text-decoration: none;
    &:hover, &:focus-visible { background: var(--gray-150); color: var(--link-color); }
  }
  .fc-timegrid-slot-label-cushion { font-size: 11px; }
  && .fc-timegrid-axis-cushion { padding: 2px 4px; font-size: 11px; line-height: 16px; }
  && .fc-timegrid .fc-daygrid-day-frame { min-height: 24px; }
  && .fc-timegrid .fc-daygrid-day-events { min-height: 20px; margin: 2px 0; }
  .fc-timegrid-event .fc-event-title { font-size: 11px; }
  .fc-list-day-cushion { font-size: 12px; }
  && .fc-list-event td { padding: 10px; }
  && .fc-list-event-time { min-width: 0; width: 76px; padding-inline-end: 16px; white-space: normal; font-size: 11px; }
  .calendar-agenda-title { flex-basis: 100px; font-size: 12px; }
  .calendar-agenda-calendar { margin-inline-start: 0; }
  .calendar-agenda-description { display: none; }
  .calendar-agenda-meta { font-size: 11px; }
  && .calendar-now-agenda-row td { padding: 8px 10px; }
  && .fc-list-empty { min-height: 120px; font-size: 12px; }

  @container (max-width: 720px) {
    .fc-daygrid-dot-event .fc-event-time { display: none; }
  }
  @container (max-width: 360px) {
    && .fc-daygrid-day-number { width: 22px; height: 22px; font-size: 11px; }
    .fc-daygrid-day-top { padding: 1px; }
    .fc-daygrid-day-events { margin-bottom: 4px; }
    .fc-more-link { line-height: 12px; }
    .fc-daygrid-event .fc-event-time,
    .fc-daygrid-event .fc-event-title-container { display: none; }
    && .fc-daygrid-dot-event .fc-event-main-frame-inline { justify-content: center; height: 10px; }
    && .fc-daygrid-dot-event .fc-color-icon { width: 6px; height: 6px; border-radius: 50%; }
    .fc-daygrid-block-event { min-height: 8px; }
    .calendar-agenda-calendar { max-width: 100%; }
  }
  @container (min-width: 480px) {
    && .fc-list-event-time { width: 110px; white-space: nowrap; }
  }
`;
