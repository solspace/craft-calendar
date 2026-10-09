import styled from "styled-components";
import { datepickerIcon, refreshIcon } from "./calendar.style.icons";

export const CalendarBase = styled.div`
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
    --fc-border-color: var(--gray-150);
    --fc-page-bg-color: #ffffff;
    --fc-neutral-bg-color: #f4f7fc;
    --fc-today-bg-color: #ffffff;
    --fc-button-text-color: #29323d;
    --fc-button-bg-color: rgb(96 125 159 / 25%);
    --fc-button-border-color: rgb(96 125 159 / 25%);
    --fc-button-hover-bg-color: var(--button-bg--hover);
    --fc-button-hover-border-color: #ffffff;
    --fc-button-active-bg-color: var(--button-bg--active);
    --fc-button-active-border-color: #ffffff;
    --fc-more-link-bg-color: transparent;
    --fc-more-link-text-color: #606060;
    --fc-event-selected-overlay-color: rgb(0 0 0 / 15%);
  }

  .fc .fc-button:not(.fc-button-group > .fc-button) {
    border-radius: var(--radius-lg);
  }

  .fc .fc-button-group > .fc-button:first-child {
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  }

  .fc .fc-button-group > .fc-button:last-child {
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  }

  .fc-button.fc-button-primary {
    background-color: var(--button-bg);
    box-shadow: none;
    border: 1px solid white;
    padding: 7px 14px;
    outline: none;
    text-shadow: none;
    font-weight: 400;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 20px;
  }

  .fc .fc-button.fc-button-primary {
    &:not(:disabled):hover {
      background-color: var(--button-bg--hover);
      color: var(--button-text-color);
    }

    &:not(:disabled):active {
      background-color: var(--button-bg--active);
      color: var(--button-text-color);
    }

    &:focus,
    &:active,
    &:active:focus,
    &.fc-button-active,
    &.fc-button-active:focus,
    &:not(:disabled):active:focus,
    &:not(:disabled).fc-button-active:focus {
      box-shadow: none;
      outline: none;
    }

    &:not(:disabled).fc-button-active {
      background-color: var(--gray-500);
      color: var(--white);

      &:hover {
        background-color: #55616d;
      }

      &:active {
        background-color: #4a545e;
      }
    }

    &:focus-visible {
      outline: 2px solid var(--button-bg--active);
      outline-offset: 1px;
    }
  }

  .fc-view,
  .fc-scrollgrid {
    overflow: hidden;
    border-radius: 4px;
    background: #fcfdff;
    box-sizing: border-box;
  }

  .fc-scrollgrid,
  .fc-scrollgrid table,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: var(--gray-200);
  }

  .fc-col-header-cell {
    background: var(--gray-150);
  }

  .fc-col-header-cell-cushion {
    display: block;
    padding: 5px 7px;
    color: var(--gray-700);
    font-size: 18px;
    font-weight: 400;
    text-align: right;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .fc-dayGridMonth-view {
    .fc-col-header-cell-cushion {
      font-size: 16px;
    }

    .fc-daygrid-day {
      background: #ffffff;
    }
    
    .fc-daygrid-day.fc-day-sat:not(.fc-day-other):not(.fc-day-today),
    .fc-daygrid-day.fc-day-sun:not(.fc-day-other):not(.fc-day-today) {
      background-color: #fcfdff;
    }

    .fc-daygrid-day.fc-day-other {
      background-color: var(--gray-050);

      .fc-daygrid-day-top {
        opacity: 1;
      }

      .fc-daygrid-day-number {
        color: var(--gray-300);
      }
    }
  }

  .fc-daygrid-day-top {
    padding: 2px;
  }

  .fc-day-today .fc-daygrid-day-number {
    background-color: var(--primary-button-bg);
    color: #ffffff;
    font-weight: 400;
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
      color: var(--gray-500);
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
      color: #ffffff;
      background-color: var(--primary-button-bg);
    }

    .fc-timegrid-col.fc-day-today {
      background-color: #ffffff;
    }

    .fc-day-today.fc-col-header-cell {
      background-color: #ffffff;
    }

    .fc-timegrid-col.fc-day-sat:not(.fc-day-today),
    .fc-timegrid-col.fc-day-sun:not(.fc-day-today) {
      background-color: #fcfdff;
    }
  }

  .fc-timeGridDay-view {
    .fc-col-header {
      display: none;
    }

    .fc-timegrid-col.fc-day-today {
      background-color: #ffffff;
    }
  }

  .fc-timegrid-axis {
    border-color: transparent;
  }

  .fc-timegrid-axis-cushion,
  .fc-timegrid-slot-label-cushion {
    padding-right: 4px;
    color: #000000;
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
      font-size: 11px;
      font-weight: 700;
    }
  }

  .fc-daygrid-event-harness .fc-daygrid-event {
    margin: 1px 3px 0;
    border-radius: 3px;
  }

  .fc-daygrid-event {
    .fc-event-time {
      font-size: 10px;
      font-weight: 400;
    }

    .fc-event-title {
      font-size: 11px;
    }

    &.fc-event-all-day,
    &.fc-event-multi-day {
      padding: 0px 5px 0px;
      border: none !important;
      border-radius: 4px;
    }
  }

  .fc-daygrid-dot-event {
    padding: 0px;
  }

  .fc-daygrid-dot-event.fc-event-single-day,
  .fc-daygrid-dot-event.fc-event-single-day:hover {
    background: transparent;
  }

  .fc-daygrid-dot-event.fc-event-single-day {
    .fc-event-main {
      width: 100%;
      flex: 1 1 auto;
      min-width: 0;
    }

    .fc-event-main-frame-inline {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
      width: 100%;
    }

    .fc-color-icon {
      display: inline-block;
      flex: 0 0 auto;
      width: 4px;
      height: 12px;
      border: 0px solid transparent;
      border-radius: 2px;
    }

    .fc-event-title {
      color: #606060;
      font-weight: 400;
    }

    .fc-event-title-container {
      flex: 1 1 auto;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .fc-event-title-inline {
      display: inline;
    }

    .fc-event-time {
      color: #929292;
      font-weight: 400;
      flex: 0 0 auto;
      white-space: nowrap;
      margin-left: auto;
    }
  }

  .fc-color-black .fc-event-time {
    color: #000000;
  }

  .fc-color-white .fc-event-time {
    color: #ffffff;
  }

  .fc-color-white:not(.fc-daygrid-dot-event) .calendar-overlap-flag svg {
    stroke: #ffffff;
    stroke-width: 1;
    stroke-linejoin: round;
    paint-order: stroke fill;
  }

  .fc-event-cancelled {
    opacity: 0.6;
  }

  && .fc-event.fc-event-cancelled .fc-event-title {
    &,
    &:hover {
      text-decoration: line-through;
    }
  }

  .fc-event-flag {
    margin-right: 3px;
  }

  .fc-event-disabled {
    opacity: 0.3 !important;

    .fc-event-time {
      color: #000000;
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
  }`;

export const CalendarSearchWrapper = styled.div`
  .calendar-search-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 20px;
    margin: 0;
  }

  .calendar-search-input {
    position: relative;
    width: 100%;
    max-width: 100%;

    input.text {
      min-height: var(--input-height, 34px);
      padding-inline: 36px;
      border: 1px solid var(--gray-250, #c3cddc);
      border-radius: 5px;
      background: #fbfcfe;
      font-size: 14px;
      transition: background 150ms ease, border-color 150ms ease;

      &::placeholder {
        color: var(--gray-600);
        opacity: 1;
      }

      &:focus {
        background: white;
        border-color: var(--link-color);
      }
    }

    input::-webkit-search-cancel-button {
      display: none;
    }
  }

  .calendar-search-icon,
  .calendar-search-clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-500);
  }

  .calendar-search-icon {
    inset-inline-start: 12px;
    font-size: 16px;
    pointer-events: none;
  }

  .calendar-search-clear {
    inset-inline-end: 4px;
    width: 26px;
    height: 26px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:hover {
      color: var(--link-color);
    }

    &:focus-visible {
      outline: 2px solid var(--link-color);
      border-radius: var(--radius-sm);
    }
  }

`;

export const CalendarWrapper = styled(CalendarBase)`
  .fc-calendarYear-view {
    overflow: visible;
    background: transparent;
  }
  container-type: inline-size;

  && .fc-list {
    border-color: var(--gray-150);
    border-radius: 8px;
    background: white;
  }

  && .fc-list-day-cushion {
    padding: 9px 16px;
    background: var(--gray-050);
    color: var(--gray-700);
    font-weight: 600;
    text-align: start;
  }

  .calendar-agenda-day {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--link-color);
      text-decoration: none;
    }

    &:focus-visible {
      outline: 2px solid var(--link-color);
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  .calendar-agenda-day-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--gray-150);
    border-radius: 7px;
    background: white;
    font-size: 17px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .calendar-agenda-day-label {
    display: grid;
    gap: 1px;
    font-size: 12px;
    line-height: 1.3;
  }

  .calendar-agenda-day-month {
    color: var(--gray-500);
    font-size: 11px;
    font-weight: 400;
  }

  .fc-day-today .calendar-agenda-day-number {
    background: var(--primary-button-bg);
    border-color: transparent;
    color: white;
  }

  && .fc-list-event td {
    padding: 14px 16px;
    vertical-align: top;
    border-color: var(--gray-150);
  }

  && .fc-list-event-time {
    min-width: 140px;
    color: var(--gray-600);
    font-size: 13px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  && .fc-list-event-graphic {
    width: 0;
    padding: 0;
  }

  && .fc-list-event-dot {
    display: none;
  }

  && .fc-list-event:hover td {
    background: #f8fafc;
  }

  && .fc-list-event-title {
    text-align: start;
  }

  && .fc-list-event:hover .fc-event-title {
    color: var(--link-color);
    text-decoration: none;
  }

  && .fc-list-event.fc-event-cancelled {
    opacity: 1;
  }

  .calendar-agenda-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
  }

  .calendar-agenda-title {
    display: flex;
    flex: 1 1 220px;
    flex-wrap: wrap;
    align-items: center;
    min-width: 0;
    gap: 8px;
    font-size: 14px;

    .fc-event-title {
      color: var(--gray-700);
      font-weight: 600;
      text-align: start;
      cursor: pointer;

      &:hover {
        color: var(--link-color);
      }

      &:focus-visible {
        outline: 2px solid var(--link-color);
        outline-offset: 2px;
      }
    }
  }

  .fc-event-cancelled .calendar-agenda-title .fc-event-title {
    color: var(--gray-500);
  }

  .calendar-agenda-cancelled {
    padding: 1px 7px;
    border: 1px solid var(--amber-200);
    border-radius: 4px;
    background: var(--amber-100);
    color: var(--amber-800);
    font-size: 11px;
    font-weight: 400;
  }

  .calendar-agenda-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 10px;
    margin-top: 5px;
    color: var(--gray-600);
    font-size: 12px;
  }

  .calendar-agenda-calendar {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
    margin-inline-start: auto;
    padding: 1px 7px;
    border: 1px solid var(--gray-150);
    border-radius: 4px;
    background: var(--gray-050);
    color: var(--gray-600);
    font-size: 11px;
    line-height: 18px;
  }

  .calendar-agenda-calendar-dot {
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    border-radius: 50%;
  }

  .calendar-agenda-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-width: 78ch;
    overflow: hidden;
    margin-top: 6px;
    color: var(--gray-500);
    font-size: 12px;
    line-height: 1.5;
  }

  .calendar-agenda-location {
    max-width: min(380px, 100%);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .calendar-agenda-event {
    overflow-wrap: anywhere;
  }

  && .fc-list-empty {
    min-height: 180px;
    background: white;
    color: var(--gray-500);
  }

  .fc-header-toolbar.fc-toolbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;

    .fc-toolbar-chunk {
      display: flex;
      align-items: center;

      &:first-child {
        justify-self: start;
        flex-wrap: wrap;
        gap: 8px 14px;
      }

      &:nth-child(2) {
        justify-self: center;
      }

      &:last-child {
        display: flex;
        justify-content: end;

        justify-self: end;
      }
    }
  }

  @container (max-width: 900px) {
    .fc-header-toolbar.fc-toolbar {
      grid-template-columns: minmax(0, 1fr) auto;

      .fc-toolbar-chunk:nth-child(2) {
        grid-column: 1 / -1;
        grid-row: 2;
        justify-self: start;
      }
    }
  }

  @container (max-width: 540px) {
    .fc-header-toolbar.fc-toolbar {
      grid-template-columns: 1fr;

      .fc-toolbar-chunk:last-child {
        grid-row: 3;
        justify-self: start;
      }
    }

    && .fc-list-event-time {
      min-width: 0;
      white-space: normal;
      width: 90px;
      padding-inline: 12px;
    }
  }

  .fc-toolbar-title {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--gray-800);
  }

  .fc-toolbar-chunk > .calendar-agenda-range {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 13px;
    white-space: nowrap;

    label {
      color: var(--gray-600);
    }

    .select {
      margin: 0;
    }
  }

  .fc-refresh-button,
  .fc-datepicker-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .fc-button .fc-icon.fc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 1;
    vertical-align: middle;
  }

  .fc-icon.fc-icon {
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

    &-refresh {
      mask-image: url("${refreshIcon}");
    }

    &-datepicker {
      mask-image: url("${datepickerIcon}");
    }
  }

  &.is-fetching-events .fc-icon-refresh {
    animation: calendar-refresh-spin 0.8s linear infinite;
  }

  @keyframes calendar-refresh-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .fc-daygrid-day-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    padding: 0;
    border-radius: 27px;
    color: var(--gray-500);
    font-size: 16px;
    line-height: 1;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
`;
