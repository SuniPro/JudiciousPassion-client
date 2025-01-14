/** @jsxImportSource @emotion/react */
import { useInfiniteQuery } from "@tanstack/react-query";
import { useBodyScrollBottomOver } from "../hooks/useWheel";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { LocationType } from "../model/location";
import { ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { Modal, Tooltip } from "@mui/material";
import {
  DefaultContentBoxWrapper,
  MainFunctionContainer,
  PalletCircle,
} from "../components/Layouts/Layouts";
import { iso8601ToYYMMDDHHMM } from "../components/Date/DateFormatter";
import { ImageCarousel } from "../components/Carousel/ImageCarousel";
import { LikeButton } from "../components/Relation/Rate";
import { PersonalColorModal, PlaceModal } from "../Modal/Modal";
import { getTourList } from "../api/tour";
import { TourType } from "../model/TourType";
import { useWindowContext } from "../context/WindowContext";
import {
  Contents,
  ContentsBox,
  ContentsDescription,
  ContentsFold,
  Date,
  PlaceDescription,
  ProfileDescription,
  ProfileLine,
  TitleLine,
  UserLine,
  Username,
} from "../components/Layouts/Feed";

export function Tour() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tour"], // 캐싱 키
      queryFn: getTourList, // 데이터 요청 함수
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < 5 ? null : allPages.length, // 다음 페이지 번호
      initialPageParam: 0,
    });

  useBodyScrollBottomOver(fetchNextPage, isFetchingNextPage);

  if (!data) return;

  if (data.pages.length === 0) {
    return <SkeletonContentBox />;
  }

  return (
    <>
      <MainFunctionContainer>
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((tour, index) => (
              <React.Fragment key={index}>
                <TourContentBox fold={false} tour={tour} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </MainFunctionContainer>
    </>
  );
}

export function TourContentBox(props: {
  tour: TourType;
  fold: boolean;
  className?: string;
}) {
  const { tour, fold, className } = props;
  const { windowWidth } = useWindowContext();

  const [contentsFold, setContentsFold] = useState<boolean>(false);

  const [placeModalOpen, setPlaceModalOpen] = useState(false);
  const [personalColorModalOpen, setPersonalColorModalOpen] = useState(false);
  const [location, setLocation] = useState<LocationType>({
    placeName: "",
    longitude: "",
    latitude: "",
  });

  return (
    <DefaultContentBoxWrapper className={className}>
      <ProfileLine>
        <UserLine>
          <ProfileImage name="suni" />
          <ProfileDescription>
            <Username color={tour.personalColor ?? theme.colors.black}>
              {tour.insertId}
            </Username>
            <Tooltip title="클릭해서 위치를 확인하세요 !">
              <PlaceDescription onClick={() => setPlaceModalOpen(true)}>
                {tour.placeName}
              </PlaceDescription>
            </Tooltip>
          </ProfileDescription>
        </UserLine>
        <ContentsDescription>
          {tour.personalColor && (
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
                backgroundColor={tour.personalColor}
                onClick={() => setPersonalColorModalOpen(true)}
              />
            </Tooltip>
          )}
          <Date>
            {iso8601ToYYMMDDHHMM(tour.insertDate ? tour.insertDate : "")}
          </Date>
        </ContentsDescription>
      </ProfileLine>
      <TitleLine css={css``}>
        <span>{tour.title}</span>
      </TitleLine>
      {/*<Divider size={95} />*/}

      {fold ? null : (
        <>
          <div
            css={css`
              width: 600px;
              display: flex;
              flex-direction: column;
              margin-bottom: 10px;
              box-shadow: ${theme.shadowStyle.default};
            `}
          >
            <ImageCarousel
              type="tour"
              data={tour}
              personalColor={tour.personalColor}
              size={windowWidth}
            />
          </div>
          <ContentsBox contentsFold={contentsFold}>
            {contentsFold ? (
              <Contents dangerouslySetInnerHTML={{ __html: tour.contents }} />
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
              rate={tour.rate ? tour.rate : 0}
              feedId={tour.id}
              type="tour"
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
          color={tour.personalColor}
        />
      </Modal>
      <Modal
        open={placeModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PlaceModal
          onClose={() => setPlaceModalOpen(false)}
          locationState={setLocation}
          lat={tour.latitude}
          lng={tour.longitude}
        />
      </Modal>
    </DefaultContentBoxWrapper>
  );
}

function SkeletonContentBox() {
  return <DefaultContentBoxWrapper></DefaultContentBoxWrapper>;
}
