/** @jsxImportSource @emotion/react */
import { SaunterType } from "../model/SaunterType";
import {
  DefaultContentBoxWrapper,
  EllipsisCase,
  MainFunctionContainer,
  PalletCircle,
  SkeletonContentBox,
} from "../components/Layouts/Layouts";
import {
  useProportionHook,
  useProportionSizeHook,
} from "../hooks/useWindowHook";
import { useWindowContext } from "../context/WindowContext";
import React, { useEffect, useMemo, useState } from "react";
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
import { css, SerializedStyles } from "@emotion/react";
import { iso8601ToYYMMDDHHMM } from "../components/Date/DateFormatter";
import { ImageCarousel } from "../components/Carousel/ImageCarousel";
import { LikeButton } from "../components/Relation/Rate";
import { PersonalColorModal, PlaceModal } from "../Modal/Modal";
import {
  BicycleIcon,
  BusIcon,
  CarIcon,
  WalkIcon,
} from "../components/FeatherIcon/Icons";
import { YoutubePlayer } from "../components/Youtube/Youtube";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useBodyScrollBottomOver } from "../hooks/useWheel";
import { getSaunterList } from "../api/saunter";

export function Saunter() {
  const { data, fetchNextPage, isFetchingNextPage, isFetched, isFetching } =
    useInfiniteQuery({
      queryKey: ["saunter"], // 캐싱 키
      queryFn: getSaunterList, // 데이터 요청 함수
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < 5 ? null : allPages.length, // 다음 페이지 번호
      initialPageParam: 0,
    });

  useBodyScrollBottomOver(fetchNextPage, isFetchingNextPage);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isFetched) {
      setTimeout(() => setVisible(true), 100); // 100ms 딜레이 후 서서히 등장
    }
  }, [isFetched]);

  const memoizedSaunterList = useMemo(
    () =>
      data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.map((saunter, index) => (
            <React.Fragment key={index}>
              <SaunterContentBox fold={false} saunter={saunter} />
            </React.Fragment>
          ))}
        </React.Fragment>
      )),
    [data],
  );

  if (!data) return;

  if (isFetching) {
    return <SkeletonContentBox />;
  }

  return (
    <>
      <MainFunctionContainer visible={visible}>
        {memoizedSaunterList}
      </MainFunctionContainer>
    </>
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
  const mediaSize = useProportionSizeHook(windowWidth, 630, 500, 630);

  const [placeModalOpen, setPlaceModalOpen] = useState(false);
  const [personalColorModalOpen, setPersonalColorModalOpen] = useState(false);

  const { contentsFold, setContentsFold } = useContentsFunction();

  const travelIconSelector = (serializedStyles: SerializedStyles) => {
    switch (saunter.travelMode) {
      case "WALKING":
        return <WalkIcon css={serializedStyles} />;
      case "BICYCLING":
        return <BicycleIcon css={serializedStyles} />;
      case "DRIVING":
        return <CarIcon css={serializedStyles} />;
      case "TRANSIT":
        return <BusIcon css={serializedStyles} />;
    }
  };

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
              <div
                onClick={() => setPlaceModalOpen(true)}
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 6px;
                  cursor: pointer;
                `}
              >
                {travelIconSelector(css`
                  width: 18px;
                  height: 18px;

                  fill: ${theme.colors.white};
                  path {
                    stroke: ${theme.colors.gray};
                  }
                `)}
                <EllipsisCase
                  width={size}
                  text={saunter.placeName}
                  textAlign="left"
                  css={css`
                    font-size: 70%;
                    color: ${theme.colors.gray};
                    cursor: pointer;
                  `}
                />
                {/*<PlaceDescription onClick={() => setPlaceModalOpen(true)}>*/}
                {/*  */}
                {/*</PlaceDescription>*/}
              </div>
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
        {fold ? null : (
          <>
            <div
              css={css`
                width: ${mediaSize.size.width}px;
                max-width: 630px;
                height: ${mediaSize.size.height}px;
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                box-shadow: ${theme.shadowStyle.default};
              `}
            >
              {saunter.youtubeLink ? (
                <YoutubePlayer
                  link={saunter.youtubeLink}
                  size={mediaSize.size}
                />
              ) : (
                <ImageCarousel
                  data={saunter}
                  type="saunter"
                  size={windowWidth}
                />
              )}
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
        <Modal
          open={placeModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PlaceModal
            onClose={() => setPlaceModalOpen(false)}
            lat={
              saunter.waypoints.find((route) => route.type === "start")
                ?.latitude
            }
            lng={
              saunter.waypoints.find((route) => route.type === "start")
                ?.longitude
            }
            size={mediaSize.size}
            wayPoint={saunter.waypoints}
            travelMode={saunter.travelMode}
            type="view"
          />
        </Modal>
      </DefaultContentBoxWrapper>
    </>
  );
}
