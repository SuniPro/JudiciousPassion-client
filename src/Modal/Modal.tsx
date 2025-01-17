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
import { useContentIconHook } from "../hooks/useContents";
import { PlaceView } from "../components/Place/PlaceView";
import { WaypointType } from "../model/SaunterType";

function PlaceEditor(props: {
  onClose: () => void;
  locationState?: React.Dispatch<React.SetStateAction<LocationType>>;
  lat?: number;
  lng?: number;
  size?: { width: number; height: number };
  type?: "view" | "editor";
  wayPoint?: WaypointType[];
  travelMode?: "BICYCLING" | "DRIVING" | "TRANSIT" | "WALKING";
}) {
  useContentIconHook();
  const {
    onClose,
    locationState,
    lng,
    lat,
    size,
    type = "editor",
    wayPoint,
    travelMode,
  } = props;

  return (
    <>
      <StyledModalBox width={size?.width} height={size?.height}>
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
          <TextFunction onClick={onClose}>취소</TextFunction>
          <span>장소 확인</span>
          <TextFunction onClick={onClose}>확인</TextFunction>
        </div>
        <Divider
          css={css`
            padding: 0;
            margin: 0;
          `}
        />
        {type === "editor" ? (
          <SearchGoogle
            setLocation={locationState}
            lng={lng}
            lat={lat}
            size={size}
          />
        ) : (
          <PlaceView
            size={size}
            lng={lng}
            lat={lat}
            wayPoint={wayPoint}
            travelMode={travelMode as google.maps.TravelMode}
          />
        )}
      </StyledModalBox>
    </>
  );
}

export const PlaceModal = forwardRef(PlaceEditor);

export const StyledModalBox = styled(Box)<{ width?: number; height?: number }>(
  ({ width = 630, height = 500 }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${width}px;
    height: ${height}px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    background-color: ${theme.islandBlueTheme.defaultBackground};
    border-radius: ${theme.borderRadius.roundedBox};

    .pac-target-input {
      width: ${width / 2.5}px;
      height: 22px;
      border-radius: ${theme.borderRadius.softBox};
      border: 1px solid ${theme.islandBlueTheme.gray};

      transform: translateY(40%);
      top: 0;
    }

    .css-4nmryk-MuiBackdrop-root-MuiModal-backdrop {
      z-index: 10;
    }
  `,
);

const TextFunction = styled.span`
  cursor: pointer;
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
