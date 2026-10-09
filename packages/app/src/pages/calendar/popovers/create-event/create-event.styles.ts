import { Flex } from "@cal/styles/components";
import styled from "styled-components";

export const PopoverCreateEventWrapper = styled.div`
  width: 440px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  padding: 15px;

  label.required::after {
    font-size: 10px;
  }

  hr {
    margin: 15px 0;
  }
`;

export const FlexTitle = styled(Flex)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .field {
    margin-block: 0;
  }

  hr {
    margin: 3px 0;
  }

  textarea.text {
    resize: vertical;
    min-height: 72px;
  }
`;

export const AllDayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AllDayLabel = styled.label`
  font-weight: 600;
  cursor: pointer;
`;

export const CreateActions = styled(Flex)`
  flex-wrap: wrap;
  align-items: center;
`;

export const CreateActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`;

export const MoreDetailsButton = styled.button`
  margin-inline-end: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--link-color);
  cursor: pointer;

  &:hover:not(:disabled) {
    text-decoration: underline;
  }

  &:disabled {
    opacity: .5;
    cursor: default;
  }
`;
