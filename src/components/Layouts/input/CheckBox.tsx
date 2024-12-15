import styled from "@emotion/styled";
import theme from "../../../styles/theme";
import { css } from "@emotion/react";

export function ToggleButton(props: { id: string; color?: string }) {
  const { id, color } = props;
  return (
    <>
      <StyledToggleInput id={id} type="checkbox" />
      <StyledLabel color={color} className="tgl-btn" htmlFor={id} />
    </>
  );
}

const StyledToggleInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label<{ color?: string }>(
  ({ color = theme.islandBlueTheme.menuAndToggleActiveColor }) => css`
    background: ${theme.islandBlueTheme.defaultBackground};
    border: 2px solid ${theme.colors.whiteGray};
    border-radius: 8px;
    outline: 0;
    display: block;
    width: 50px;
    height: 20px;
    position: relative;
    cursor: pointer;
    user-select: none;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 25%;
      width: calc(50% - 2px); /* label 너비의 50%에서 2px 작게 */
      height: calc(100% - 2px); /* label 높이에서 2px 작게 */
      background: #f2f2f2;
      border-radius: 6px;
      transform: translate(-50%, -50%); /* 부모의 중심으로 이동 */
      transition:
        left 0.3s ease,
        background 0.3s ease;
    }

    /* 체크 상태 스타일 */
    input:checked + & {
      border-color: ${color};
    }

    input:checked + &::after {
      left: calc(75% - 1px); /* 중앙에서 오른쪽으로 이동 */
      background: ${color};
    }
  `,
);
