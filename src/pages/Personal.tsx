/** @jsxImportSource @emotion/react */
import "react-color-palette/css";
import { useUserContext } from "../context/UserContext";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Profile, ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { ColorPicker, useColor } from "react-color-palette";
import React, { useEffect, useState } from "react";
import * as feather from "feather-icons";
import {
  EmailIcon,
  MapPinIcon,
  MessageIcon,
  PhoneIcon,
  UserCheckIcon,
  UserPlusIcon,
} from "../components/FeatherIcon/Icons";
import { LikeButton } from "../components/Relation/Rate";
import { Modal, Tooltip } from "@mui/material";
import { User } from "../model/User";
import { profilePersonalColorChange } from "../api/user";
import { ErrorNotify } from "../components/Alert/Alert";
import { SignForm } from "../components/Sign/Sign";
import { ProfileMessageChangeModal } from "../Modal/Modal";

const USER_CONNECT_FUNC = [MessageIcon, UserPlusIcon];
const USER_CERTIFY_LIST = [
  { icons: EmailIcon, description: "메일 인증 및 가입여부" },
  { icons: PhoneIcon, description: "휴대폰번호 인증" },
  { icons: UserCheckIcon, description: "본인 인증" },
  { icons: MapPinIcon, description: "거주지 인증" },
];

const PROFILE_VIEW_LIMIT = 4;

const totalProfiles = 8;

export function Personal() {
  const { user } = useUserContext();

  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  const [color, setColor] = useColor(theme.colors.secondary);
  const [userState, setUserState] = useState<User | null>(user);
  const [paletteOpen, setPaletteOpen] = useState(false);

  //Modal
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  useEffect(() => {
    if (!user || !userState || color.hex === "#dddddd") return;
    const updatedUser = { ...userState, personalColor: color.hex };
    profilePersonalColorChange(updatedUser).catch(() =>
      ErrorNotify("서버 에러"),
    );
  }, [color, user, userState]);

  if (!user || !userState) return <SignForm />;

  const personalColorOpacity = user.personalColor + "CC";

  return (
    <Container
      css={css`
        margin-top: 6rem;
      `}
    >
      <PersonalWrapper>
        <ProfileBox>
          <ProfileImage
            name="suni"
            extentSize={{ width: 150, height: 150 }}
            css={css`
              img {
                box-shadow: 0 0 20px ${personalColorOpacity};
              }
              padding: 10px 0 0 0;
              margin-bottom: 10px;
            `}
          />
          <PersonalColorChecker
            onClick={() => {
              setPaletteOpen((prev) => !prev);
            }}
            backgroundColor={user.personalColor!}
          />
          {paletteOpen && (
            <ColorPicker
              color={color}
              onChange={setColor}
              hideInput={["rgb", "hsv"]}
            />
          )}
        </ProfileBox>
        <ProfileDescriptionBox>
          <UserInfoArea>
            <ContentsBox>
              <Username>{user.username}</Username>
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  gap: 10px;
                `}
              >
                {USER_CONNECT_FUNC.map((Func) => (
                  <Func />
                ))}
              </div>
            </ContentsBox>
            <ContentsBox>
              <LikeButton
                css={css`
                  transform: translateY(-20%);
                `}
                rate={10}
                type="personal"
              />
            </ContentsBox>
            <div>
              {user.profileMessage ? (
                <ProfileMessage onClick={() => setMessageModalOpen(true)}>
                  {user.profileMessage}
                </ProfileMessage>
              ) : (
                <ProfileMessage
                  onClick={() => setMessageModalOpen(true)}
                  css={css`
                    color: ${theme.islandBlueTheme.gray};
                  `}
                >
                  상태메세지 추가
                </ProfileMessage>
              )}
            </div>
          </UserInfoArea>
          <ContentsBox>
            <UserDescription>
              <UserDescriptionIcon data-feather="users" />
              {Array.from({ length: PROFILE_VIEW_LIMIT }, (_, index) =>
                index === 0 ? (
                  <div
                    css={css`
                      position: relative;
                      width: 25px;
                      height: 25px;
                      background-color: #ccc;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-size: 12px;
                      transform: translateX(-${index * 40}%);
                      z-index: ${PROFILE_VIEW_LIMIT - index};
                    `}
                  >
                    +{totalProfiles - PROFILE_VIEW_LIMIT}
                  </div>
                ) : (
                  <Profile
                    css={css`
                      position: relative;
                      width: 25px;
                      height: 25px;
                      transform: translateX(-${index * 40}%);
                      z-index: ${PROFILE_VIEW_LIMIT - index};
                      background-color: ${theme.colors.white};
                      border-radius: ${theme.borderRadius.circle};
                    `}
                  />
                ),
              )}
            </UserDescription>
            <UserDescription
              css={css`
                gap: 5px;
              `}
            >
              <UserDescriptionIcon data-feather="check" />
              {USER_CERTIFY_LIST.map((certify) => {
                const Icon = certify.icons;
                return (
                  <div
                    css={css`
                      height: 20px;
                      svg {
                        width: 20px;
                        height: 20px;
                        color: ${theme.colors.secondary};
                      }
                    `}
                  >
                    <Tooltip title={certify.description}>
                      <Icon />
                    </Tooltip>
                  </div>
                );
              })}
            </UserDescription>
          </ContentsBox>
        </ProfileDescriptionBox>
      </PersonalWrapper>
      <Modal open={messageModalOpen}>
        <ProfileMessageChangeModal
          message={user.profileMessage}
          user={userState}
          onClose={() => setMessageModalOpen(false)}
        ></ProfileMessageChangeModal>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBox = styled.div`
  background-color: white;
  transition: all 200ms linear;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  padding: 10px 20px;

  border-radius: ${theme.borderRadius.roundedBox};

  .rcp {
    position: absolute;
    z-index: 10;
    transform: translateY(56%);
  }
`;

const ProfileDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;

  gap: 10px;
`;

const PersonalWrapper = styled.div`
  width: 100%;
  border: 1px solid ${theme.islandBlueTheme.contentBoxBorder};
  box-shadow: ${theme.shadowStyle.default};
  border-radius: 15px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const Username = styled.span<{ color?: string }>(
  ({ color = theme.islandBlueTheme.fontColor.default }) => css`
    color: ${color};
    font-family: ${theme.fontStyle.roboto};
    font-size: 34px;
  `,
);

const UserDescription = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

const UserDescriptionIcon = styled.i`
  width: 22px;
  padding-right: 10px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 20px;
`;

const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const PersonalColorChecker = styled.div<{ backgroundColor: string }>(
  ({ backgroundColor }) => css`
    height: 10px;
    width: 150px;
    border: 4px solid ${theme.islandBlueTheme.defaultBackground};
    box-shadow: ${theme.shadowStyle.default};
    border-radius: ${theme.borderRadius.roundedBox};

    background-color: ${backgroundColor};
  `,
);

const ProfileMessage = styled.span`
  cursor: pointer;
`;
