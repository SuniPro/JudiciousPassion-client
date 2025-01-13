/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import profileImage from "../../assets/ProfileImage.png";

export interface ExtentSizeType {
  width: number;
  height: number;
}

export function ProfileImage(props: {
  name: string;
  image?: string; // 선택적 프로퍼티
  href?: string;
  extentSize?: ExtentSizeType;
  className?: string;
}) {
  const { name, image, href, extentSize, className } = props;

  const content = image ? (
    <img src={image} alt={name} />
  ) : (
    <img
      css={css`
        color: gray;
        width: 100%;
        height: 100%;
        path {
          box-shadow: 10px 10px 110px gray;
        }
      `}
      src={profileImage}
      alt="profileImage"
    />
  );

  const profileImageItemRef = useRef<HTMLDivElement>(null);

  const profileImageItemWidth = profileImageItemRef.current
    ? profileImageItemRef.current.offsetWidth
    : 100;

  return (
    <ProfileItem className={className} href={href || "#"} title="Profile Image">
      <ProfileImageItem
        ref={profileImageItemRef}
        width={extentSize?.width}
        height={extentSize?.height}
      >
        {content}
      </ProfileImageItem>
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

const ProfileImageItem = styled.div<{ width?: number; height?: number }>(
  ({ width = 50, height = 50 }) => css`
    border-radius: 100%;
    line-height: 40px;
    text-align: center;
    fill: gray;

    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: ${width}px;
      height: ${height}px;
      border-radius: 100%;
    }
  `,
);

export function Profile(props: { image?: string; className?: string }) {
  const { className, image } = props;

  return (
    <>
      {image ? (
        <img className={className} src={image} alt={image} />
      ) : (
        <img
          className={className}
          css={css`
            color: gray;
            width: 100%;
            height: 100%;
          `}
          src={profileImage}
          alt="profileImage"
        />
      )}
    </>
  );
}
