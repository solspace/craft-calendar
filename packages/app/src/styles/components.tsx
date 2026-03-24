import type { CSSProperties, FC, PropsWithChildren } from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  $direction?: "row" | "column";
  $gap?: CSSProperties["gap"];
  $justifyContent?: CSSProperties["justifyContent"];
  $alignItems?: CSSProperties["alignItems"];
};

export const Flex: FC<PropsWithChildren<Props>> = ({
  className,
  $direction = "row",
  $gap = 16,
  $justifyContent = "start",
  $alignItems = "start",
  children,
}) => {
  return (
    <FlexDiv
      className={className}
      $direction={$direction}
      $gap={$gap}
      $justifyContent={$justifyContent}
      $alignItems={$alignItems}
    >
      {children}
    </FlexDiv>
  );
};

const FlexDiv = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  gap: ${(props) => props.$gap}px;

  .field {
    margin-block: 0;
  }
`;
