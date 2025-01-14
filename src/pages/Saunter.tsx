/** @jsxImportSource @emotion/react */
import { SaunterType } from "../model/SaunterType";
import {
  DefaultContentBoxWrapper,
  EllipsisCase,
  MainFunctionContainer,
  PalletCircle,
} from "../components/Layouts/Layouts";
import { useProportionHook } from "../hooks/useWindowHook";
import { useWindowContext } from "../context/WindowContext";
import React, { useState } from "react";
import { useContentsFunction } from "../hooks/useContents";
import {
  Contents,
  ContentsBox,
  ContentsDescription,
  ContentsFold,
  Date,
  ProfileDescription,
  ProfileLine,
  TitleLine,
  UserLine,
  Username,
} from "../components/Layouts/Feed";
import { ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { Modal, Tooltip } from "@mui/material";
import { css } from "@emotion/react";
import { iso8601ToYYMMDDHHMM } from "../components/Date/DateFormatter";
import { ImageCarousel } from "../components/Carousel/ImageCarousel";
import { LikeButton } from "../components/Relation/Rate";
import { PersonalColorModal } from "../Modal/Modal";

const SAUNTER_DUMMY: SaunterType[] = [
  {
    id: 1,
    placeName: "서울시 도봉구",
    title: "test",
    travelMode: "walking",
    contents: `<p>테스트</p>`,
    personalColor: "#6095C9",
    rate: 5,
    insertDate: "2025-01-05T20:37:27.185327",
    insertId: "suni",
    waypoints: [
      {
        id: 1,
        saunterId: 1,
        WaypointType: "start",
        latitude: 37.5313805,
        longitude: 126.9798839,
        orderIndex: 1,
      },
      {
        id: 2,
        saunterId: 1,
        WaypointType: "stop",
        latitude: 37.5513805,
        longitude: 126.9698839,
        orderIndex: 2,
      },
      {
        id: 3,
        saunterId: 1,
        WaypointType: "end",
        latitude: 37.5613805,
        longitude: 126.9798839,
        orderIndex: 3,
      },
    ],
  },
];

export function Saunter() {
  // useBodyScrollBottomOver(fetchNextPage, isFetchingNextPage);

  return (
    <MainFunctionContainer>
      {SAUNTER_DUMMY.map((saunter, index) => (
        <SaunterContentBox fold={false} saunter={saunter} />
      ))}
    </MainFunctionContainer>
  );
}

export function SaunterContentBox(props: {
  saunter: SaunterType;
  fold: boolean;
  className?: string;
}) {
  const { saunter, fold, className } = props;
  const { windowWidth } = useWindowContext();
  const { size } = useProportionHook(windowWidth, 180, 630);

  const [placeModalOpen, setPlaceModalOpen] = useState(false);
  const [personalColorModalOpen, setPersonalColorModalOpen] = useState(false);

  const { contentsFold, setContentsFold, location, setLocation } =
    useContentsFunction();

  return (
    <>
      <DefaultContentBoxWrapper className={className}>
        <ProfileLine>
          <UserLine>
            <ProfileImage name="suni" />
            <ProfileDescription>
              <Username color={saunter.personalColor ?? theme.colors.black}>
                {saunter.insertId}
              </Username>
              <Tooltip title="클릭해서 위치를 확인하세요 !">
                <EllipsisCase
                  width={size}
                  text={saunter.placeName}
                  textAlign="left"
                  css={css`
                    font-size: 60%;
                    color: ${theme.colors.gray};
                    cursor: pointer;
                  `}
                />
                {/*<PlaceDescription onClick={() => setPlaceModalOpen(true)}>*/}
                {/*  */}
                {/*</PlaceDescription>*/}
              </Tooltip>
            </ProfileDescription>
          </UserLine>
          <ContentsDescription>
            {saunter.personalColor && (
              <Tooltip
                title={
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    클릭하면 화면에 퍼스널컬러가 비칩니다.
                    <br /> 오늘 착장과 미리 확인하세요 !
                  </p>
                }
              >
                <PalletCircle
                  backgroundColor={saunter.personalColor}
                  onClick={() => setPersonalColorModalOpen(true)}
                />
              </Tooltip>
            )}
            <Date>
              {iso8601ToYYMMDDHHMM(
                saunter.insertDate ? saunter.insertDate : "",
              )}
            </Date>
          </ContentsDescription>
        </ProfileLine>
        <TitleLine>
          <span>{saunter.title}</span>
        </TitleLine>
        {/*<Divider size={95} />*/}

        {fold ? null : (
          <>
            <div
              css={css`
                width: ${windowWidth}px;
                max-width: 630px;
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                box-shadow: ${theme.shadowStyle.default};
              `}
            >
              <ImageCarousel
                type="saunter"
                data={saunter}
                personalColor={saunter.personalColor}
                size={windowWidth}
              />
            </div>
            <ContentsBox contentsFold={contentsFold}>
              {contentsFold ? (
                <Contents
                  dangerouslySetInnerHTML={{ __html: saunter.contents }}
                />
              ) : (
                <ContentsFold onClick={() => setContentsFold(true)}>
                  내용보기
                </ContentsFold>
              )}
            </ContentsBox>
            <div
              css={css`
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                padding-left: 30px;
              `}
            >
              <LikeButton
                rate={saunter.rate ? saunter.rate : 0}
                feedId={saunter.id}
                type="saunter"
              />
            </div>
          </>
        )}
        <Modal
          open={personalColorModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PersonalColorModal
            onClose={() => setPersonalColorModalOpen(false)}
            color={saunter.personalColor}
          />
        </Modal>
      </DefaultContentBoxWrapper>
    </>
  );
}
