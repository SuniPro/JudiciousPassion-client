/** @jsxImportSource @emotion/react */
import { Box, Modal } from "@mui/material";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { SearchGoogle } from "../components/Place/PlaceSearch";
import theme from "../styles/theme";
import { LocationType, LocationWayPointType } from "../model/location";
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
import {
  FlagIcon,
  MapPinIcon,
  MinusSquareIcon,
  PlusSquareIcon,
  PullRequestIcon,
} from "../components/FeatherIcon/Icons";
import { useProportionSizeHook } from "../hooks/useWindowHook";
import { useWindowContext } from "../context/WindowContext";
import { uid } from "uid";

const STOP_POINT_LIMIT = 3;

interface locationStateType {
  location: LocationType;
  setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
}

interface waypointStateType {
  waypoint: LocationWayPointType[];
  setWaypoint: React.Dispatch<React.SetStateAction<LocationWayPointType[]>>;
}

export const PlaceModal = React.forwardRef(
  (
    props: {
      onClose: () => void;
      setLocation?: React.Dispatch<React.SetStateAction<LocationType>>;
      lat?: number;
      lng?: number;
      size?: { width: number; height: number };
      type?: "view" | "editor";
      wayPoint?: WaypointType[];
      travelMode?: "BICYCLING" | "DRIVING" | "TRANSIT" | "WALKING";
    },
    _ref: any,
  ) => {
    useContentIconHook();
    const {
      onClose,
      lng,
      lat,
      size,
      setLocation,
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
              setLocation={setLocation}
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
  },
);

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

export const PersonalColorModal = React.forwardRef(
  (
    props: {
      onClose: () => void;
      color?: string | null;
    },
    _ref: any,
  ) => {
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
  },
);

export const ProfileMessageChangeModal = React.forwardRef(
  (
    props: {
      message?: string | null;
      user: User;
      onClose: () => void;
      size?: ExtentType;
    },
    _ref: any,
  ) => {
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
  },
);

export const YoutubeLinkInsertModal = React.forwardRef(
  (
    props: {
      size?: { width: number; height: number };
      onClose: () => void;
      setYoutubeLink: React.Dispatch<React.SetStateAction<string>>;
    },
    _ref,
  ) => {
    const { size, onClose, setYoutubeLink } = props;
    const linkAreaRef = useRef<HTMLTextAreaElement>(null);

    const saveLink = () => {
      if (!linkAreaRef.current) return;

      if (linkAreaRef.current.value.length > 0) {
        setYoutubeLink(linkAreaRef.current.value);
        onClose();
      } else {
        ErrorNotify("YoutubeLink 를 입력해주세요.");
      }
    };

    return (
      <StyledModalBox width={size?.width} height={size?.height}>
        <ModalHeader
          leftFunc={() => {
            setYoutubeLink("");
            onClose();
          }}
          purpose="Youtube Link"
          rightFunc={saveLink}
          rightMenu="저장"
        />
        <textarea
          ref={linkAreaRef}
          placeholder="링크를 입력해주세요."
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
  },
);

export const SaunterWaypointInsertModal = React.forwardRef(
  (
    props: {
      size?: { width: number; height: number };
      onClose: () => void;
      waypointState: waypointStateType;
      className?: string;
    },
    _ref,
  ) => {
    useContentIconHook();
    const { size, onClose, className } = props;
    const { waypoint, setWaypoint } = props.waypointState;
    const { windowWidth } = useWindowContext();

    const mapExtend = useProportionSizeHook(windowWidth, 600, 600, 630);

    const [open, setOpen] = useState<boolean>(false);

    const [pointSwitch, setPointSwitch] = useState<{
      type: "start" | "stop" | "end";
      index?: number;
    }>({ type: "start", index: 0 });

    const defaultPlace: LocationType = {
      placeName: "",
      latitude: 37.314694,
      longitude: 126.575308,
    };

    const [startPoint, setStartPoint] = useState<LocationType>(defaultPlace);
    const [stopPoint, setStopPoint] = useState<LocationType[]>([]);
    const [stopPointObject, setStopPointObject] =
      useState<LocationType>(defaultPlace);
    const [endPoint, setEndPoint] = useState<LocationType>(defaultPlace);

    const pointSelector = (): React.Dispatch<
      React.SetStateAction<LocationType>
    > => {
      switch (pointSwitch.type) {
        case "start":
          return setStartPoint;
        case "stop":
          return setStopPointObject;
        case "end":
          return setEndPoint;
        default:
          throw new Error(`Invalid type: ${pointSwitch.type}`);
      }
    };

    useEffect(() => {
      if (pointSwitch.type === "stop" && pointSwitch.index !== undefined) {
        setStopPoint((prev) =>
          prev.map((point, i) =>
            i === pointSwitch.index ? stopPointObject : point,
          ),
        );
      }
    }, [stopPointObject, pointSwitch]);

    const saveWayPoint = () => {
      const start: LocationWayPointType = {
        orderIndex: 0,
        placeName: startPoint.placeName,
        latitude: startPoint.latitude,
        longitude: startPoint.longitude,
        waypointType: "start",
      };
      const stops: LocationWayPointType[] = stopPoint.map((point, index) => ({
        orderIndex: index + 1,
        placeName: point.placeName,
        latitude: point.latitude,
        longitude: point.longitude,
        waypointType: "stop",
      }));

      const end: LocationWayPointType = {
        orderIndex: stopPoint.length + 1,
        placeName: endPoint.placeName,
        latitude: endPoint.latitude,
        longitude: endPoint.longitude,
        waypointType: "end",
      };

      setWaypoint([start, ...stops, end]);
    };

    return (
      <StyledModalBox
        width={size?.width}
        className={className}
        css={css`
          height: auto;
        `}
      >
        <ModalHeader
          leftFunc={() => {
            setWaypoint([]);
            onClose();
          }}
          purpose="산책 경로"
          rightFunc={onClose}
          rightMenu="저장"
        />
        {waypoint.length >= 2 && (
          <PlaceView
            size={size}
            lng={
              waypoint.find((route) => route.waypointType === "start")
                ?.longitude
            }
            lat={
              waypoint.find((route) => route.waypointType === "start")?.latitude
            }
            wayPoint={waypoint.map((point, index) => ({
              id: parseInt(uid()),
              saunterId: 1,
              latitude: point.latitude,
              longitude: point.longitude,
              orderIndex: index,
              waypointType: point.waypointType,
            }))}
            travelMode={"WALKING" as google.maps.TravelMode}
          />
        )}
        <section
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px 10px;
            gap: 20px;
            box-sizing: border-box;
          `}
        >
          <PlaceArea>
            <MapPinIcon />
            <WaypointInput
              value={startPoint.placeName}
              onClick={() => {
                setOpen(true);
                setPointSwitch((prev) => ({ ...prev, type: "start" }));
              }}
            />
          </PlaceArea>
          {Array.isArray(stopPoint) &&
            stopPoint.map((point, index) => (
              <PlaceArea key={index}>
                <PullRequestIcon />
                <WaypointInput
                  value={point.placeName}
                  onClick={() => {
                    setOpen(true);
                    setPointSwitch((prev) => ({
                      ...prev,
                      type: "stop",
                      index,
                    }));
                  }}
                />
                <IconFunctionCase
                  onClick={() => {
                    setStopPoint(
                      (prev) => prev.filter((_, i) => i !== index), // index에 해당하는 요소를 삭제
                    );
                  }}
                >
                  <MinusSquareIcon />
                </IconFunctionCase>
              </PlaceArea>
            ))}
          <PlaceArea>
            <FlagIcon />
            <WaypointInput
              value={endPoint.placeName}
              onClick={() => {
                setOpen(true);
                setPointSwitch((prev) => ({ ...prev, type: "end" }));
              }}
            />
            <IconFunctionCase
              onClick={() => {
                if (stopPoint.length <= STOP_POINT_LIMIT) {
                  setStopPoint((prev) => [...prev, defaultPlace]);
                } else {
                  ErrorNotify(
                    `경유지는 ${STOP_POINT_LIMIT}개 까지만 추가할 수 있습니다.`,
                  );
                }
              }}
            >
              <PlusSquareIcon />
            </IconFunctionCase>
          </PlaceArea>
        </section>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          children={
            <PlaceModal
              size={mapExtend.size}
              onClose={() => {
                setOpen(false);
                saveWayPoint();
              }}
              setLocation={pointSelector()}
              type="editor"
            />
          }
        />
      </StyledModalBox>
    );
  },
);

const WaypointInput = styled.input`
  width: 90%;
  height: 20px;
  color: ${theme.islandBlueTheme.fontColor.default};
  border-radius: ${theme.borderRadius.softBox};
  border: 1px solid ${theme.islandBlueTheme.secondary};
`;

const PlaceArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;

  svg {
    color: ${theme.islandBlueTheme.gray};
  }
`;

const IconFunctionCase = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
