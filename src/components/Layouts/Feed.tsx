import styled from "@emotion/styled";
import theme from "../../styles/theme";
import { css } from "@emotion/react";

export const UserLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Username = styled.span<{ color?: string }>(
  ({ color = theme.colors.black }) => css`
    font-size: 18px;
    color: ${color};
    font-weight: bold;
  `,
);

export const PlaceDescription = styled.span`
  width: 100%;
  font-size: 60%;
  color: ${theme.colors.gray};
  cursor: pointer;
`;

export const ContentsDescription = styled.div`
  padding: 10px 10px;
  height: 100%;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 4px;
`;

export const TitleLine = styled.div`
  width: 94%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-family: ${theme.fontStyle.roboto};
  font-weight: bold;

  // test
  padding-bottom: 1rem;
`;

export const ContentsFold = styled.div`
  color: ${theme.islandBlueTheme.gray};
  cursor: pointer;
  font-weight: bold;
`;

export const ContentsBox = styled.div<{ contentsFold: boolean }>(
  ({ contentsFold }) => css`
    height: ${contentsFold ? "auto" : "10%"};
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 30px;

    transition: height 1.4s ease-in-out;
  `,
);

export const Contents = styled.div`
  font-family: ${theme.fontStyle.montserrat};
`;

export const Date = styled.div`
  font-family: ${theme.fontStyle.roboto};
  font-size: 80%;
`;
