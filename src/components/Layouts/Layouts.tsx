import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import React from "react";

export interface ExtentType {
  width?: number;
  height?: number;
}

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

/** 구분선을 출력합니다. width 값은 %로 계산됩니다. */
export const Divider = styled.p<{ width?: number }>(
  ({ width = 100 }) => css`
    border-top: 1px solid ${theme.colors.secondary};
    width: ${width}%;
  `,
);

export const ContentsAreaContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
`;

/**
 * Taste, Saunter, Tour 에서 사용하기 위한 MainContainer 입니다.
 * DefaultContentBoxWrapper 의 부모요소입니다.*/
export const MainFunctionContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    width: 24px;
    height: 24px;
    border-radius: ${theme.borderRadius.circle};
    border: ${theme.colors.white} 3px solid;
    box-shadow: ${theme.shadowStyle.default};
    background-color: ${backgroundColor};
    box-sizing: border-box;
  `,
);

export function ModalHeader(props: {
  leftMenu?: string;
  leftFunc: any;
  purpose: string;
  rightMenu?: string;
  rightFunc: any;
}) {
  const {
    leftMenu = "취소",
    leftFunc,
    purpose,
    rightFunc,
    rightMenu = "확인",
  } = props;
  return (
    <ModalHeaderContainer>
      <span onClick={leftFunc}>{leftMenu}</span>
      <span>{purpose}</span>
      <span onClick={rightFunc}>{rightMenu}</span>
    </ModalHeaderContainer>
  );
}

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-bottom: 1px solid ${theme.colors.secondary};
  box-sizing: border-box;

  span {
    cursor: pointer;
  }
`;
