import styled from "styled-components";

export const YearCalendarWrapper = styled.div`
  .calendar-year-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .calendar-year-month {
    min-width: 0;
    padding: 16px 12px 12px;
    border: 1px solid var(--gray-150);
    border-radius: var(--radius-lg, 5px);
    background: white;

    h3 {
      margin: 0 0 12px;
      text-align: center;
    }

    h3 button {
      padding: 2px 8px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: var(--gray-800);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: #f3f7fc;
        color: var(--blue-600);
      }
    }
  }

  .calendar-year-weekdays,
  .calendar-year-days {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    text-align: center;
  }

  .calendar-year-weekdays {
    margin-bottom: 5px;
    color: var(--gray-500);
    font-size: 11px;
    font-weight: 600;
    line-height: 24px;
  }

  .calendar-year-days {
    row-gap: 3px;
  }

  .calendar-year-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: 100%;
    max-width: 36px;
    min-height: 34px;
    padding: 3px 0;
    border: 0;
    border-radius: 5px;
    background: transparent;
    color: var(--gray-650, #596673);
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;

    &.has-events {
      color: var(--gray-800);
      font-weight: 600;
    }

    &:hover {
      background: #f3f7fc;
      color: var(--blue-600);
    }

    &.is-today .calendar-year-day-number {
      min-width: 21px;
      border-radius: 50%;
      background: var(--primary-button-bg);
      color: white;
      line-height: 21px;
    }
  }

  button:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }

  button:disabled {
    cursor: default;
    opacity: 0.6;
  }

  .calendar-year-markers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    height: 7px;
    margin-top: 2px;
  }

  .calendar-year-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    flex: 0 0 5px;
    box-sizing: border-box;
    border-radius: 50%;

    &.is-cancelled {
      border: 1px solid #bd861a;
      background: #fff7df !important;
    }
  }

  .calendar-year-more {
    color: var(--gray-500);
    font-size: 9px;
    line-height: 7px;
  }

  .calendar-year-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 16px;
    padding-top: 14px;
    color: var(--gray-500);
    font-size: 12px;
  }

  .calendar-year-legend {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  @container (min-width: 1150px) {
    .calendar-year-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @container (max-width: 760px) {
    .calendar-year-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
  }

  @container (max-width: 480px) {
    .calendar-year-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export const YearDayPreviewWrapper = styled.div`
  width: min(340px, calc(100vw - 40px));
  padding: 14px 0 6px;
  box-sizing: border-box;

  h3 {
    margin: 0 14px 10px;
    color: var(--gray-800);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
  }

  ul {
    max-height: 280px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;
  }

  li button {
    display: flex;
    align-items: start;
    gap: 9px;
    width: 100%;
    margin: 0;
    padding: 9px 14px;
    border: 0;
    background: transparent;
    text-align: start;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: #f3f7fc;
    }

    &.is-cancelled strong {
      text-decoration: line-through;
    }
  }

  .year-preview-dot {
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    margin-top: 5px;
    border-radius: 50%;
  }

  .year-preview-details {
    display: grid;
    gap: 3px;
    min-width: 0;
    font-size: 12px;
    line-height: 1.4;
  }

  .year-preview-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 7px;
    color: var(--gray-800);
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .year-preview-time,
  .year-preview-calendar {
    color: var(--gray-600);
  }

  .year-preview-cancelled {
    padding: 1px 5px;
    border-radius: 3px;
    background: #fff7df;
    color: #8a6111;
    font-size: 11px;
  }
`;
