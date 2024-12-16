import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import { ReactNode, useEffect } from "react";
import * as feather from "feather-icons";

export function CircleButton(props: {
  icon: ReactNode;
  func: any;
  isActive: boolean;
}) {
  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  const { icon, func, isActive } = props;
  return (
    <CircleButtonContainer isActive={isActive} onClick={() => func()}>
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
