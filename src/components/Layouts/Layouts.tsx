import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import React from "react";
import {
  ContentsDescription,
  ProfileDescription,
  ProfileLine,
  TitleLine,
  UserLine,
} from "./Feed";
import { ProfileImage } from "../profile/Profile";

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
// export const Divider = styled.p<{ width?: number }>(
//   ({ width = 100 }) => css`
//     border-top: 1px solid ${theme.colors.secondary};
//     width: ${width}%;
//   `,
// );

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
export const MainFunctionContainer = styled.div<{ visible: boolean }>(
  ({ visible }) => css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      opacity: ${visible ? 1 : 0};
      transform: translateY(${visible ? "0" : "10px"});
      transition: opacity 0.8s ease-in-out,
      transform 0.8s ease-in-out;
  }
  `,
);

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

export function SkeletonContentBox() {
  return (
    <DefaultContentBoxWrapper>
      <ProfileLine>
        <UserLine>
          <ProfileImage name="suni" />
          <ProfileDescription>
            <SkeletonPlaceholder
              color={theme.colors.black}
              width={150}
            ></SkeletonPlaceholder>
          </ProfileDescription>
        </UserLine>
        <ContentsDescription>
          <PalletCircle backgroundColor={theme.colors.black} />
        </ContentsDescription>
      </ProfileLine>
      <TitleLine>
        <SkeletonPlaceholder width={300}></SkeletonPlaceholder>
      </TitleLine>
    </DefaultContentBoxWrapper>
  );
}

const SkeletonPlaceholder = styled.span<{ width: number }>(
  ({ width }) => css`
    background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
    background-size: 350px;
    width: ${width}px;
    height: 1.45rem;
    border-radius: 3px;
    margin-top: 1.5rem;
    animation: animation 1.5s infinite;

    @keyframes animation {
      0% {
        background-position: -100px;
      }
      40%,
      100% {
        background-position: 270px;
      }
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
      <Function onClick={leftFunc}>{leftMenu}</Function>
      <Title>{purpose}</Title>
      <Function onClick={rightFunc}>{rightMenu}</Function>
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
`;

const Title = styled.span`
  font-weight: bold;
`;

const Function = styled.span`
  cursor: pointer;
`;
