/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import React, { forwardRef, useState } from "react";
import { SearchGoogle } from "../components/Place/PlaceSearch";
import theme from "../styles/theme";
import { LocationType } from "../model/location";
import { CircleButton } from "../components/Layouts/Button";
import { css } from "@emotion/react";
import { SignForm } from "../components/Sign/Sign";
import { User } from "../model/User";
import { Divider } from "../components/Layouts/Layouts";
import { profileMessageChange } from "../api/user";
import { ErrorNotify, SuccessNotify } from "../components/Alert/Alert";

function Place(
  props: {
    onClose: () => void;
    locationState: React.Dispatch<React.SetStateAction<LocationType>>;
    lat?: number;
    lng?: number;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { onClose, locationState, lng, lat } = props;

  // const [searchInputValue, setSearchInputValue] = useState<string>("");
  //
  // useEffect(() => {
  //   const observer = new MutationObserver(() => {
  //     const inputElement = document.querySelector(
  //       ".pac-target-input",
  //     ) as HTMLInputElement | null;
  //
  //     if (inputElement) {
  //       const handleInput = (event: Event) => {
  //         const target = event.target as HTMLInputElement;
  //         setSearchInputValue(target.value); // 상태 업데이트
  //       };
  //
  //       inputElement.addEventListener("input", handleInput);
  //
  //       // 정리
  //       return () => {
  //         inputElement.removeEventListener("input", handleInput);
  //       };
  //     }
  //   });
  //
  //   // body를 관찰하여 변화 감지
  //   observer.observe(document.body, { childList: true, subtree: true });
  //
  //   return () => observer.disconnect(); // 정리: Observer 중지;
  // }, []);

  return (
    <>
      <div
        css={css`
          position: absolute;
          top: 14%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 10px;
        `}
      >
        <CircleButton icon="x" func={onClose} isActive={true} />
      </div>
      <StyledModalBox>
        <SearchGoogle setLocation={locationState} lng={lng} lat={lat} />
      </StyledModalBox>
    </>
  );
}

export const PlaceModal = forwardRef(Place);

export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 76%;
  border-radius: ${theme.borderRadius.softBox};
  color: #000000;
  background-color: black;
  overflow-y: scroll;
  border: 2px solid ${theme.islandBlueTheme.activeBackgroundColor};

  .css-4nmryk-MuiBackdrop-root-MuiModal-backdrop {
    z-index: 10;
  }

  .pac-target-input {
    width: 300px;
    height: 22px;
    border-radius: ${theme.borderRadius.softBox};
    border: 1px solid ${theme.islandBlueTheme.gray};
  }
`;

function Sign(props: { onClose: () => void }, ref: React.Ref<HTMLDivElement>) {
  const { onClose } = props;

  /** true 는 signUp, false 는 signIn 으로 규정합니다.*/
  const [signType, setSignType] = useState<boolean>(false);

  return (
    <>
      <div
        css={css`
          position: absolute;
          top: 14%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 10px;
        `}
      >
        <CircleButton icon="x" func={onClose} isActive={true} />
      </div>
      <StyledModalBox>
        <SignForm />
      </StyledModalBox>
    </>
  );
}

export const SignModal = forwardRef(Sign);

function PersonalColorView(
  props: {
    onClose: () => void;
    color?: string | null;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { onClose, color } = props;
  return (
    <>
      <div
        css={css`
          background-color: ${color};
          width: 100%;
          height: 100%;
        `}
        onClick={onClose}
      />
    </>
  );
}

export const PersonalColorModal = forwardRef(PersonalColorView);

function ProfileMessageChange(props: {
  message?: string | null;
  user: User;
  onClose: () => void;
}) {
  const { message, onClose, user } = props;

  const [messageState, setMessageState] = useState<string>(message ?? "");

  return (
    <>
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400px;
          height: 300px;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          background-color: ${theme.islandBlueTheme.defaultBackground};
          border-radius: ${theme.borderRadius.roundedBox};
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            height: 50px;
          `}
        >
          <span onClick={onClose}>취소</span>
          <span>상태메세지 변경</span>
          <span
            onClick={() => {
              const updatedUser = { ...user, profileMessage: messageState };
              profileMessageChange(updatedUser)
                .then(() => SuccessNotify("작성 완료"), onClose)
                .catch(() => ErrorNotify("서버 에러"));
            }}
          >
            저장
          </span>
        </div>
        <Divider
          css={css`
            padding: 0;
            margin: 0;
          `}
        />
        <textarea
          onChange={(e) => setMessageState(e.target.value)}
          value={messageState}
          css={css`
            width: 98%;
            height: 100%;

            border-radius: ${theme.borderRadius.roundedBox};
            border: none;
            outline: none;
            resize: none;
          `}
        />
      </div>
    </>
  );
}

export const ProfileMessageChangeModal = forwardRef(ProfileMessageChange);
