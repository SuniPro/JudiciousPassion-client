import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

export const PageContainer = styled.div`
  width: 630px;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: center;

  height: 100%;

  position: relative;
`;

export const Divider = styled.p<{ direction?: boolean; size?: number }>(
  ({ direction, size = 100 }) => css`
    border-top: 1px solid ${theme.colors.whiteGray};
    width: ${size}%;
  `,
);

export const ContentsAreaContainer = styled.div`
  width: 100%;
  height: 90vh;
`;
