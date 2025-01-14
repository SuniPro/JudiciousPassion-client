import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

export const PageContainer = styled.div<{ width: number }>(
  ({ width = 630 }) => css`
    width: ${width}px;
    max-width: 630px;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    align-items: center;
    box-sizing: border-box;

    height: 100%;
    position: relative;

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

/**
 * Taste, Saunter, Tour 에서 사용하기 위한 MainContainer 입니다.
 * DefaultContentBoxWrapper 의 부모요소입니다.*/
export const MainFunctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;
  height: 100%;
`;

/**
 * Taste, Saunter, Tour 에서 사용하기 위한 DefaultContentBoxWrapper 입니다.
 * 피드를 구성하는 최상위 요소입니다. */
export const DefaultContentBoxWrapper = styled.section<{}>(
  () => css`
    background-color: white;
    transition: all 200ms linear;

    width: 100%;
    border: 1px solid ${theme.islandBlueTheme.secondary};
    border-radius: ${theme.borderRadius.roundedBox};

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    @media ${theme.windowSize.small} {
      border-radius: 0;
      margin-bottom: -1px;
    }
  `,
);

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
