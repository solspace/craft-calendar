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

export const RepeatControls = styled.div`
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  background: var(--gray-50);
`;

export const RepeatEndFields = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;

  > .field { flex: 1 1 140px; min-width: 0; }
  input { width: 100%; }
`;

export const RepeatSummary = styled.p`
  && { margin: 0; }
  font-size: 12px;
  line-height: 1.5;
  color: var(--light-text-color);
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
