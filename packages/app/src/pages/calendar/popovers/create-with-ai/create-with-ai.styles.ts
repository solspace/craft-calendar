import styled from "styled-components";

export const PopoverCreateWithAiWrapper = styled.div`
  padding: 20px;
  min-width: 480px;
  max-width: 560px;

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const AiHint = styled.p`
  margin: 0 0 16px;
  color: var(--light-text-color, #596673);
  font-size: 13px;
  line-height: 1.5;
`;

export const AiPrompt = styled.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid var(--hairline-color, #d6d9de);
  border-radius: 4px;
  background: var(--white, #fff);
  color: var(--text-color, #29323d);
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--focus-color, #0d78f2);
    box-shadow: 0 0 0 1px var(--focus-color, #0d78f2);
  }

  &::placeholder {
    color: var(--light-text-color, #8f98a3);
  }
`;

export const AiError = styled.p`
  margin: 8px 0 0;
  color: var(--error-color, #cf1124);
  font-size: 13px;
`;

export const AiActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 12px;
`;
