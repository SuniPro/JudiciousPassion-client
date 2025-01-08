import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

export const PageContainer = styled.div<{ width: number }>(
  ({ width = 630 }) => css`
    width: ${width - 10}px;
    max-width: 630px;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    align-items: center;

    height: 100%;
    position: relative;
    padding-bottom: 30px;

    @media ${theme.windowSize.small} {
    }
  `,
);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Divider = styled.p<{ direction?: boolean; size?: number }>(
  ({ direction, size = 100 }) => css`
    border-top: 1px solid ${theme.colors.whiteGray};
    width: ${size}%;
  `,
);

export const ContentsAreaContainer = styled.div`
  width: 100%;
`;

export function EllipsisCase(props: {
  text: string;
  textAlign: string;
  className?: string;
  width?: number;
  func?: any;
}) {
  const { width, text, className, textAlign, func } = props;
  return (
    <TextCase className={className} onClick={func}>
      <TextArea textAlign={textAlign} width={width}>
        {text}
      </TextArea>
    </TextCase>
  );
}

export const TextCase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const TextArea = styled.span<{ width?: number; textAlign: string }>(
  ({ width, textAlign }) => css`
    text-align: ${textAlign};
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    width: ${width}px;
    height: 100%;
  `,
);

export const PalletCircle = styled.div<{ backgroundColor: string }>(
  ({ backgroundColor }) => css`
    width: 18px;
    height: 18px;
    border-radius: ${theme.borderRadius.circle};
    border: ${theme.colors.white} 3px solid;
    box-shadow: ${theme.shadowStyle.default};
    background-color: ${backgroundColor};
  `,
);
