import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import { ReactNode } from "react";
import { useContentIconHook } from "../../hooks/useContents";

/** feather를 기반으로 한 원형 버튼입니다. icon은 reactNode 혹은 "x" 형태로 feather 문자열을 받습니다.*/
export function CircleButton(props: {
  className?: string;
  icon: ReactNode;
  func: any;
  isActive: boolean;
}) {
  const { className, icon, func, isActive } = props;
  useContentIconHook();
  return (
    <CircleButtonContainer
      className={className}
      isActive={isActive}
      onClick={() => func()}
    >
      <i data-feather={icon} />
    </CircleButtonContainer>
  );
}

export function RoundedButton(props: {
  width?: number;
  text: string;
  func: any;
  isActive: boolean;
}) {
  const { width, text, func, isActive } = props;
  return (
    <RoundedButtonContainer
      width={width}
      onClick={() => func()}
      isActive={isActive}
    >
      <span>{text}</span>
    </RoundedButtonContainer>
  );
}

const CircleButtonContainer = styled.div<{
  isActive: boolean;
}>(
  ({ isActive }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    width: 45px;
    height: 45px;

    border-radius: ${theme.borderRadius.circle};
    background-color: ${isActive
      ? theme.islandBlueTheme.activeBackgroundColor
      : theme.islandBlueTheme.nonActiveBackgroundColor};
    color: ${theme.islandBlueTheme.fontColor.buttonDefault};
  `,
);

const RoundedButtonContainer = styled.div<{
  width?: number;
  isActive: boolean;
}>(
  ({ width = 80, isActive }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    width: ${width}px;
    height: 40px;

    font-weight: bold;

    border-radius: ${theme.borderRadius.roundedBox};
    background-color: ${isActive
      ? theme.islandBlueTheme.activeBackgroundColor
      : theme.islandBlueTheme.nonActiveBackgroundColor};
    color: ${theme.islandBlueTheme.fontColor.buttonDefault};
  `,
);
