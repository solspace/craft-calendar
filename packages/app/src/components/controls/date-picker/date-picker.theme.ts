import { css } from "styled-components";

export const datePickerTheme = css`
  .react-datepicker {
    --picker-header-height: 32px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;

      box-sizing: border-box;
      height: var(--picker-header-height);
      padding-top: 0;
      padding-bottom: 0;

      background-color: #f8f9fd;
    }

    &__navigation {
      height: var(--picker-header-height);

      &--previous {
        left: 0;
      }

      &--next {
        right: 0;
      }
    }

    &__today-button {
      background: #f8f9fd;
    }

    &-time__header {
      font-size: 13px;
    }
  }

  .react-datepicker__day--today:not(.react-datepicker__day--selected):not(
      .react-datepicker__day--keyboard-selected
    ) {
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px var(--gray-300);
    font-weight: 400;
  }
    
  .react-datepicker__header__dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
  }  

  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__year-dropdown-container--select {
    margin: 0 5px;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    margin: 0;

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected:not([aria-disabled="true"]):hover,
  .react-datepicker__day--keyboard-selected:not([aria-disabled="true"]):hover {
    background-color: var(--bg-selection-dark);
    color: #ffffff;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected,
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected:hover {
    background-color: var(--bg-selection-dark);
    color: #ffffff;
  }

  .react-datepicker__navigation-icon::before {
    width: 10px;
    height: 10px;
    border-color: var(--gray-500);
    border-width: 2px 2px 0 0;
  }

  .react-datepicker__navigation:hover *::before {
    border-color: var(--gray-700);
  }
`;
