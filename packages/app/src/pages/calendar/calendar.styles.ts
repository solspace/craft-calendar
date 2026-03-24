import styled from "styled-components";
import { datepickerIcon, refreshIcon, siteIcon } from "./calendar.style.icons";

export const CalendarWrapper = styled.div`
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

  .fc {
    --fc-border-color: #e9e9e9;
    --fc-page-bg-color: #fffffe;
    --fc-neutral-bg-color: #f4f7fc;
    --fc-today-bg-color: #fffedd;
    --fc-button-text-color: #29323d;
    --fc-button-bg-color: rgb(96 125 159 / 25%);
    --fc-button-border-color: rgb(96 125 159 / 25%);
    --fc-button-hover-bg-color: #bac6d6;
    --fc-button-hover-border-color: #bac6d6;
    --fc-button-active-bg-color: #bac6d6;
    --fc-button-active-border-color: #bac6d6;
    --fc-more-link-bg-color: transparent;
    --fc-more-link-text-color: #606060;
    --fc-event-selected-overlay-color: rgb(0 0 0 / 15%);
  }

  .fc-header-toolbar.fc-toolbar {
    align-items: center;
    margin-bottom: 24px;

    .fc-toolbar-chunk {
      display: flex;
      align-items: center;

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

  .fc-toolbar-title {
    margin: 0;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.2;
    color: #000;
  }

  .fc-button.fc-button-primary {
    box-shadow: none;
    border: none;
    border-radius: 0;
    padding: 7px 14px;
    outline: none;
    text-shadow: none;
    font-weight: 400;

    &:focus,
    &:active,
    &.fc-button-active {
      box-shadow: none;
      outline: none;
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

  .fc-scrollgrid,
  .fc-scrollgrid table,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: #e9e9e9;
  }

  .fc-col-header-cell-cushion {
    display: block;
    padding: 5px 7px;
    color: #000;
    font-size: 18px;
    font-weight: 400;
    text-align: right;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .fc-dayGridMonth-view {
    .fc-daygrid-day.fc-day-sat:not(.fc-day-other):not(.fc-day-today),
    .fc-daygrid-day.fc-day-sun:not(.fc-day-other):not(.fc-day-today) {
      background-color: #fbfdff;
    }

    .fc-daygrid-day.fc-day-other {
      background-color: #f4f7fc;

      .fc-daygrid-day-top {
        opacity: 1;
      }
    }
  }

  .fc-daygrid-day-top {
    padding: 2px;
  }

  .fc-daygrid-day-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    padding: 0;
    border-radius: 27px;
    color: inherit;
    font-size: 16px;
    line-height: 1;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .fc-day-today .fc-daygrid-day-number {
    background-color: #e5422b;
    color: #fff;
    font-weight: 700;
  }

  .fc-timeGridWeek-view {
    .fc-col-header-cell-cushion {
      position: relative;
      display: flex;
      align-items: center;
      padding-right: 35px;
      min-height: 30px;
      text-align: left;
    }

    .fc-day-header-label {
      color: #000;
    }

    .fc-day-header-date {
      position: absolute;
      top: 50%;
      right: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border: 1px solid transparent;
      border-radius: 30px;
      transform: translateY(-50%);
      text-align: center;
    }

    .fc-title-today .fc-day-header-date {
      color: #fff;
      background-color: #e5422b;
    }

    .fc-timegrid-col.fc-day-sat:not(.fc-day-today),
    .fc-timegrid-col.fc-day-sun:not(.fc-day-today) {
      background-color: #fbfdff;
    }
  }

  .fc-timeGridDay-view {
    .fc-col-header {
      display: none;
    }

    .fc-timegrid-col.fc-day-today {
      background-color: #fffffe;
    }
  }

  .fc-timegrid-axis {
    border-color: transparent;
  }

  .fc-timegrid-axis-cushion,
  .fc-timegrid-slot-label-cushion {
    padding-right: 4px;
    color: #000;
  }

  .fc-timegrid-event {
    padding: 0;
    border: none !important;
    border-radius: 0;
    opacity: 0.8;

    .fc-event-main {
      padding: 3px 5px;
    }

    .fc-event-time {
      margin-bottom: 0;
      font-size: 10px;
      white-space: normal;
    }

    .fc-event-title {
      font-size: 12px;
      font-weight: 700;
    }
  }

  .fc-daygrid-event-harness .fc-daygrid-event {
    margin: 1px 5px 0;
    border-radius: 0;
  }

  .fc-daygrid-event {
    .fc-event-time {
      font-size: 10px;
      font-weight: 400;
    }

    .fc-event-title {
      font-size: 12px;
    }

    &.fc-event-all-day,
    &.fc-event-multi-day {
      padding: 2px 4px 1px;
      border: none !important;
      border-radius: 0;
    }
  }

  .fc-daygrid-dot-event.fc-event-single-day,
  .fc-daygrid-dot-event.fc-event-single-day:hover {
    background: transparent;
  }

  .fc-daygrid-dot-event.fc-event-single-day {
    .fc-event-main {
      width: 100%;
    }

    .fc-event-main-frame-inline {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
    }

    .fc-color-icon {
      display: inline-block;
      flex: 0 0 auto;
      width: 6px;
      height: 6px;
      border: 1px solid transparent;
      border-radius: 999px;
    }

    .fc-event-title {
      color: #606060;
      font-weight: 400;
    }

    .fc-event-title-container {
      min-width: 0;
    }

    .fc-event-title-inline {
      display: inline;
    }

    .fc-event-time {
      color: #929292;
      font-weight: 400;
      flex: 0 0 auto;
      white-space: nowrap;
    }
  }

  .fc-color-black .fc-event-time {
    color: #000;
  }

  .fc-color-white .fc-event-time {
    color: #fff;
  }

  .fc-event-disabled {
    opacity: 0.3 !important;

    .fc-event-time {
      color: #000;
    }
  }

  .fc-more-link {
    margin: 1px 5px 0;
    padding: 0;
    color: #606060;
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

  .fc-event [data-calendar-event-title-link] {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
