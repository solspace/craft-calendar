import styled from "styled-components";

export const PopoverWrapper = styled.div`
  position: relative;
  width: max-content;
  max-width: min(360px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 15px;
  overflow-wrap: anywhere;

  .btn {
    max-width: 100%;
    height: auto;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  hr {
    margin: 15px 0;
  }

  h3,
  p {
    text-align: center;
  }

  .calendar-label {
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
    color: var(--gray-600);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
  }

  .event-title {
    margin: 0 0 6px;
    padding-inline-end: 28px;
    font-size: 18px;
    line-height: 24px;
  }

  h1.is-cancelled {
    text-decoration: line-through;
  }

  .occurrence-status {
    margin: 8px 0 0;
    color: var(--gray-600);
    font-size: 13px;
  }

  .calendar-label-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    border-radius: 50%;
  }
`;

export const PopoverActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

export const PopoverCloseButton = styled.button`
  && {
    position: absolute;
    top: 12px;
    inset-inline-end: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--gray-600);
    cursor: pointer;
  }

  &::before {
    color: inherit;
    font-size: 16px;
  }

  &:hover:not(:disabled) {
    color: var(--link-color);
  }

  &:focus-visible {
    outline: 2px solid var(--link-color);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: .5;
    cursor: default;
  }
`;

export const PopoverMenuButton = styled.button`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    white-space: nowrap;
  }

  &&::after {
    display: none;
  }

  span {
    font-size: 11px;
    letter-spacing: 1px;
  }
`;
