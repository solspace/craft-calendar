import styled from "styled-components";
import type { PopoverArrowSide } from "./popover.types";

export const PopoverBridge = styled.div`
  position: relative;
`;

export const PopoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

type PopoverArrowProps = {
  side: PopoverArrowSide;
  top?: number;
  left?: number;
};

export const PopoverArrow = styled.span<PopoverArrowProps>`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 12;

  ${({ side, left, top }) => {
    switch (side) {
      case "top":
        return `
          top: -9px;
          left: ${left ?? 0}px;
          transform: translateX(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 9px solid var(--border-hairline-dark);
          }

          &::after {
            top: 1px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid white;
          }
        `;

      case "bottom":
        return `
          bottom: -1px;
          left: ${left ?? 0}px;
          transform: translateX(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-top: 9px solid var(--border-hairline-dark);
          }

          &::after {
            top: -1px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
          }
        `;

      case "left":
        return `
          left: -9px;
          top: ${top ?? 0}px;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          &::before {
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-right: 9px solid var(--border-hairline-dark);
          }

          &::after {
            left: 1px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid white;
          }
        `;

      default:
        return `
          right: -1px;
          top: ${top ?? 0}px;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          &::before {
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-left: 9px solid var(--border-hairline-dark);
          }

          &::after {
            left: -1px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid white;
          }
        `;
    }
  }}
`;
