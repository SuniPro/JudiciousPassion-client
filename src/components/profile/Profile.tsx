/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfileInitials(props: { name: string }) {
  return (
    <ProfileInitialContainer color="gray">
      <p>{props.name}</p>
    </ProfileInitialContainer>
  );
}

export function ProfileImage(props: {
  name: string;
  image?: string; // 선택적 프로퍼티
  href?: string;
}) {
  const { name, image, href } = props;

  const content = image ? (
    <img src={image} alt={name} />
  ) : (
    <AccountCircleIcon
      css={css`
        color: gray;
        width: 100%;
        height: 100%;
      `}
    />
  );

  return (
    <ProfileItem href={href || "#"} title="Profile Image">
      <ProfileImageItem>{content}</ProfileImageItem>
    </ProfileItem>
  );
}

const ProfileItem = styled.a`
  padding: 10px 0;
  line-height: 40px;
  display: inline-block;
  margin: 0 12px;
  background-color: transparent;
  text-decoration: none;

  color: white;

  &:hover {
    text-decoration: none;
  }
`;

const ProfileImageItem = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  line-height: 40px;
  text-align: center;
  fill: gray;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
`;

const ProfileInitialContainer = styled.div<{ color?: string }>(
  ({ color }) => css`
    border-radius: 100%;
    line-height: 40px;
    width: 50px;
    height: 50px;
    background-color: ${color};
    color: #fff;
    text-transform: uppercase;
    font-family: "OpenSans", Arial, sans-serif;
    font-size: 14px;
  `,
);
