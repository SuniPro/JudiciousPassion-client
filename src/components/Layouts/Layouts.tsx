import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

export const PageContainer = styled.div`
  width: 640px;
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
