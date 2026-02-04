import styled from "styled-components";

export const EventEditorWrapper = styled.div`
  container-type: inline-size;

  display: flex;
  flex-direction: row;
  gap: 60px;

  padding: var(--l);

  background-color: var(--custom-bg-color,var(--gray-050));
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 6px -1px rgba(0,0,0,.05);

  @container (max-width: 1084px) {
    flex-direction: column;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: 1;

    inset: 0;
    pointer-events: none;
    border-radius: var(--radius-lg);
    box-shadow: inset 0 0 0 1px var(--custom-border-color,var(--gray-200));
  }
`;
