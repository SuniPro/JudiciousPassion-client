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
import { ExtentType, ModalHeader } from "../components/Layouts/Layouts";
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
        <ModalHeader leftFunc={onClose} purpose="장소" rightFunc={onClose} />
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

function Sign(props: { onClose: () => void }) {
  const { onClose } = props;

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

function PersonalColorView(props: {
  onClose: () => void;
  color?: string | null;
}) {
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
  size?: ExtentType;
}) {
  const { message, onClose, user, size } = props;

  const [messageState, setMessageState] = useState<string>(message ?? "");

  return (
    <>
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          width: ${size?.width}px;
          height: ${size?.width}px;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          background-color: ${theme.islandBlueTheme.defaultBackground};
          border-radius: ${theme.borderRadius.roundedBox};
        `}
      >
        <ModalHeader
          leftFunc={onClose}
          purpose="상태메세지 변경"
          rightFunc={() => {
            const updatedUser = { ...user, profileMessage: messageState };
            profileMessageChange(updatedUser)
              .then(() => SuccessNotify("작성 완료"), onClose)
              .catch(() => ErrorNotify("서버 에러"));
          }}
          rightMenu="저장"
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

function YoutubeLinkInsert(props: {
  size?: { width: number; height: number };
  onClose: () => void;
  setYoutubeLink: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { size, onClose, setYoutubeLink } = props;
  return (
    <StyledModalBox width={size?.width} height={size?.height}>
      <ModalHeader
        leftFunc={() => {
          setYoutubeLink("");
          onClose();
        }}
        purpose="Youtube Link"
        rightFunc={onClose}
        rightMenu="저장"
      />
      <textarea
        onChange={(e) => setYoutubeLink(e.target.value)}
        css={css`
          width: 98%;
          height: 100%;

          border-radius: ${theme.borderRadius.roundedBox};
          border: none;
          outline: none;
          resize: none;
        `}
      />
    </StyledModalBox>
  );
}

export const YoutubeLinkInsertModal = forwardRef(YoutubeLinkInsert);
