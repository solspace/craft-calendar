import { beziers, colors } from "@cal/styles/variables";
import type { CSSProperties, FC } from "react";
import styled, { keyframes } from "styled-components";

const skeletonShimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Skeleton = styled.div`
  position: relative;
  overflow: hidden;

  background: ${colors.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${colors.gray050} r g b / 70%),
      transparent
    );

    animation: ${skeletonShimmer} 1.4s ${beziers.easeInOut} infinite;
  }
`;

type LoadingSkeletonProps = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  borderRadius?: CSSProperties["borderRadius"];
  className?: string;
};

export const LoadingSkeleton: FC<LoadingSkeletonProps> = ({
  width = "100%",
  height = 16,
  borderRadius = 4,
  className,
}) => {
  return (
    <Skeleton
      aria-hidden="true"
      className={className}
      style={{
        borderRadius,
        height,
        width,
      }}
    />
  );
};
