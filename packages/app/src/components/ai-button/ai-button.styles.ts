import styled from "styled-components";

/** Matches Freeform’s Create with AI / Enable AI button. */
export const AiButton = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  color: #fff;
  border: none;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%);
    color: #fff;
  }

  &:before {
    color: #fff;
  }
`;
