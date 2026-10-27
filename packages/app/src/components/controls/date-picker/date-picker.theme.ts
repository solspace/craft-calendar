import { css } from "styled-components";

const pickerChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 3 5 5-5 5'/%3E%3C/svg%3E")`;

export const datePickerTheme = css`
  .react-datepicker {
    --picker-header-height: 44px;
    --picker-time-width: 94px;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: 260px;
    max-width: calc(100vw - 24px);
    box-sizing: border-box;
    border: 1px solid var(--gray-200, #d8e0ea);
    border-radius: 8px;
    background: white;
    color: var(--gray-700, #33404d);
    box-shadow: 0 12px 32px rgb(31 41 51 / 14%), 0 2px 6px rgb(31 41 51 / 6%);
    font-family: inherit;
    font-size: 12px;
    line-height: 1.5;

    &:has(.react-datepicker__time-container) {
      grid-template-columns: minmax(0, 1fr) var(--picker-time-width);
      width: 354px;
    }

    &__month-container { float: none; min-width: 0; grid-column: 1; grid-row: 1; }

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--picker-header-height);
      box-sizing: border-box;
      padding: 0 34px;
      border-bottom: 1px solid var(--gray-150, #e5e9ef);
      border-radius: 8px 8px 0 0;
      background: var(--gray-050, #f8fafc);
    }
    &__header--has-time-select { border-top-right-radius: 0; }
    &__header--time { padding: 0 6px; border-top-left-radius: 0; }
    &__header--custom { padding: 0 4px; }
    &:has(.react-datepicker__time-container) .react-datepicker__month-container .react-datepicker__header { border-top-right-radius: 0; }
    &__header:has(select) .react-datepicker__current-month { display: none; }
    &__current-month { margin: 0; color: inherit; font-size: 13px; font-weight: 600; }
    &-time__header { color: var(--gray-600, #596673); font-size: 12px; font-weight: 600; }

    &__header__dropdown { display: flex; align-items: center; gap: 4px; width: 100%; }
    &__month-dropdown-container--select { flex: 1; min-width: 0; margin: 0; }
    &__year-dropdown-container--select { flex: 0 0 64px; margin: 0; }
    &__month-dropdown-container--select, &__year-dropdown-container--select {
      position: relative;
      height: 28px;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 6px;
        width: 12px;
        height: 12px;
        background: var(--gray-500, #6b7b8e);
        mask: ${pickerChevron} center / contain no-repeat;
        transform: translateY(-50%) rotate(90deg);
        pointer-events: none;
      }
    }
    &__month-select, &__year-select {
      appearance: none;
      width: 100%;
      height: 28px;
      box-sizing: border-box;
      margin: 0;
      padding: 3px 22px 3px 8px;
      border: 1px solid var(--gray-150, #e5e9ef);
      border-radius: 4px;
      background: var(--gray-100, #edf0f5);
      color: var(--gray-700, #33404d);
      font: inherit;
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;
      &:hover { border-color: var(--gray-250, #c3cddc); }
    }

    &__navigation {
      top: calc((var(--picker-header-height) - 28px - 1px) / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border-radius: 4px;
      &--previous { left: 4px; }
      &--next { right: 4px; }
      &:hover { background: var(--gray-100, #edf0f5); }
    }
    &:has(.react-datepicker__time-container) .react-datepicker__navigation--next {
      right: calc(var(--picker-time-width) + 4px);
    }
    &__navigation-icon {
      display: grid;
      place-items: center;
      top: 0;
      left: 0;
      right: 0;
      width: 16px;
      height: 16px;
      font-size: 0;
    }
    &__navigation-icon::before {
      position: static;
      top: auto;
      left: auto;
      right: auto;
      width: 16px;
      height: 16px;
      border: 0;
      background: var(--gray-500, #6b7b8e);
      mask: ${pickerChevron} center / contain no-repeat;
      transform: none;
    }
    &__navigation-icon--previous::before { transform: rotate(180deg); }
    &__navigation:hover *::before { background: var(--gray-700, #33404d); }

    &__day-names, &__week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 2px; }
    &__day-names { margin: 0; padding: 6px 10px 0; }
    &__month { margin: 0; padding: 4px 10px 10px; }
    &__week + .react-datepicker__week { margin-top: 2px; }
    &__day, &__day-name {
      width: auto;
      margin: 0;
      border-radius: 5px;
      color: inherit;
      font-size: 12px;
      line-height: 30px;
    }
    &__day-name { color: var(--gray-500, #6b7b8e); font-size: 11px; font-weight: 600; line-height: 24px; }
    &__day--outside-month, &__day--disabled { color: var(--gray-400, #9aa5b1); }
    &__day--keyboard-selected { background: var(--gray-100, #edf0f5); color: inherit; }
    &__day:not([aria-disabled="true"]):hover { background: var(--gray-100, #edf0f5); border-radius: 5px; }
    &__day--today:not(.react-datepicker__day--selected) {
      border-radius: 5px;
      box-shadow: inset 0 0 0 1px var(--gray-300, #bdc9d8);
      font-weight: 600;
    }
    &__day--selected, &__day--selected:not([aria-disabled="true"]):hover {
      background: var(--bg-selection-dark, #5f6d7a);
      color: white;
      font-weight: 600;
    }

    &__time-container {
      grid-column: 2;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      float: none;
      top: 0;
      right: auto;
      width: auto;
      min-height: 0;
      border: 0;
      border-left: 1px solid var(--gray-150, #e5e9ef);
      border-radius: 0 8px 8px 0;
    }
    &__time-container .react-datepicker__time { flex: 1; min-height: 0; border-bottom-right-radius: 8px; }
    &__time-container .react-datepicker__time .react-datepicker__time-box {
      position: absolute;
      inset: 0;
      width: 100%;
      margin: 0;
      border-bottom-right-radius: 8px;
    }
    &__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
      height: 100% !important;
      box-sizing: border-box;
      margin: 0;
      padding: 6px;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
    }
    &__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      box-sizing: border-box;
      margin: 2px 0;
      padding: 0 2px;
      border-radius: 5px;
      color: inherit;
      font-size: 11px;
      font-weight: 400;
      line-height: 18px;
      &:not(.react-datepicker__time-list-item--disabled):not(.react-datepicker__time-list-item--selected):hover { background: var(--gray-100, #edf0f5); }
      &--selected, &--selected:hover { background: var(--bg-selection-dark, #5f6d7a); color: white; font-weight: 600; }
      &--disabled { color: var(--gray-400, #9aa5b1); }
    }

    &__today-button {
      grid-column: 1 / -1;
      padding: 8px;
      border-top: 1px solid var(--gray-150, #e5e9ef);
      border-radius: 0 0 8px 8px;
      background: var(--gray-050, #f8fafc);
      color: var(--gray-600, #596673);
      font-size: 12px;
      font-weight: 500;
    }
    &__day:focus-visible, &__navigation:focus-visible, &__month-select:focus-visible,
    &__year-select:focus-visible, &__time-list-item:focus-visible, &__today-button:focus-visible {
      outline: 2px solid var(--link-color, #2563eb);
      outline-offset: 1px;
    }
  }

  .calendar-picker-header { display: flex; align-items: center; gap: 4px; width: 100%; }
  .calendar-picker-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: var(--gray-600, #596673);
    cursor: pointer;
    &:hover:not(:disabled) { background: var(--gray-100, #edf0f5); }
    &:disabled { opacity: .35; cursor: default; }
  }
  .calendar-picker-select { position: relative; min-width: 0; }
  .calendar-picker-month, .calendar-picker-month-label { flex: 1; min-width: 0; }
  .calendar-picker-year { flex: 0 0 64px; }
  .calendar-picker-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    width: 100%;
    height: 28px;
    box-sizing: border-box;
    margin: 0;
    padding: 0 7px;
    border: 1px solid var(--gray-150, #e5e9ef);
    border-radius: 4px;
    background: var(--gray-100, #edf0f5);
    color: var(--gray-700, #33404d);
    font: inherit;
    font-size: 12px;
    line-height: 20px;
    text-align: start;
    cursor: pointer;
    > span:first-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    &:hover, &[aria-expanded="true"] { border-color: var(--gray-250, #c3cddc); background: var(--gray-150, #e5e9ef); }
  }
  .calendar-picker-select-chevron {
    flex: 0 0 12px;
    width: 12px;
    height: 12px;
    background: var(--gray-500, #6b7b8e);
    mask: ${pickerChevron} center / contain no-repeat;
    transform: rotate(90deg);
  }
  .calendar-picker-menu {
    position: absolute;
    z-index: 10;
    top: calc(100% + 6px);
    inset-inline-end: 0;
    width: 168px;
    padding: 6px;
    box-sizing: border-box;
    border: 1px solid var(--gray-200, #d8e0ea);
    border-radius: 6px;
    background: white;
    box-shadow: 0 8px 24px rgb(31 41 51 / 16%);
    text-align: start;
    &[data-placement="top"] { top: auto; bottom: calc(100% + 6px); }
    input[type="search"] {
      appearance: none;
      display: block;
      width: 100%;
      height: 30px;
      min-height: 0;
      box-sizing: border-box;
      margin: 0 0 5px;
      padding: 4px 7px;
      border: 1px solid var(--gray-200, #d8e0ea);
      border-radius: 4px;
      background: var(--gray-050, #f8fafc);
      color: var(--gray-700, #33404d);
      font: inherit;
      font-size: 12px;
      line-height: 20px;
      &:focus { border-color: var(--link-color, #2563eb); outline: none; box-shadow: 0 0 0 1px var(--link-color, #2563eb); }
    }
  }
  .calendar-picker-month .calendar-picker-menu { inset-inline-start: 0; inset-inline-end: auto; }
  .calendar-picker-options {
    position: relative;
    max-height: 192px;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    [role="option"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 28px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 7px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: var(--gray-700, #33404d);
      font: inherit;
      font-size: 12px;
      line-height: 20px;
      text-align: start;
      cursor: pointer;
      &[aria-selected="true"] { font-weight: 600; }
      &:hover:not([aria-disabled="true"]), &[data-active="true"] { background: var(--gray-100, #edf0f5); }
      &[aria-disabled="true"] { color: var(--gray-400, #9aa5b1); cursor: default; }
    }
  }
  .calendar-picker-no-results { margin: 0; padding: 8px 7px; color: var(--gray-500, #6b7b8e); font-size: 12px; line-height: 18px; }
  .calendar-picker-nav:focus-visible, .calendar-picker-select-trigger:focus-visible {
    outline: 2px solid var(--link-color, #2563eb);
    outline-offset: 1px;
  }

  .react-datepicker-popper {
    width: max-content;
    max-width: calc(100vw - 24px);
    .react-datepicker__triangle { stroke: var(--gray-200, #d8e0ea); }
    &[data-placement^="bottom"] .react-datepicker__triangle { fill: var(--gray-050, #f8fafc); color: var(--gray-050, #f8fafc); }
  }
`;
