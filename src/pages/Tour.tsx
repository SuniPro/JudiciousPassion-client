/** @jsxImportSource @emotion/react */
import { useInfiniteQuery } from "@tanstack/react-query";
import { useBodyScrollBottomOver } from "../hooks/useWheel";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import * as feather from "feather-icons";
import { LocationType } from "../model/location";
import { ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { Modal, Tooltip } from "@mui/material";
import { Divider, PalletCircle } from "../components/Layouts/Layouts";
import { iso8601ToYYMMDDHHMM } from "../components/Date/DateFormatter";
import { Carousel } from "../components/Carousel/Carousel";
import { LikeButton } from "../components/Relation/Rate";
import { PersonalColorModal, PlaceModal } from "../Modal/Modal";
import styled from "@emotion/styled";
import { getTourList } from "../api/tour";
import { TourType } from "../model/TourType";
import { useWindowContext } from "../context/WindowContext";

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
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 6rem;
        `}
      >
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((tour, index) => (
              <React.Fragment key={index}>
                <ContentBox fold={false} index={index} tour={tour} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}

export function ContentBox(props: {
  tour: TourType;
  index: number;
  fold: boolean;
}) {
  const { tour, index, fold } = props;
  const { windowWidth } = useWindowContext();
  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  const [contentsFold, setContentsFold] = useState<boolean>(false);

  const [placeModalOpen, setPlaceModalOpen] = useState(false);
  const [personalColorModalOpen, setPersonalColorModalOpen] = useState(false);
  const [location, setLocation] = useState<LocationType>({
    placeName: "",
    longitude: "",
    latitude: "",
  });
  const personalColorOpacity = tour.personalColor
    ? tour.personalColor + "CC"
    : "rgba(0, 0, 0, 0.2)";

  // @ts-ignore
  return (
    <ContentBoxWrapper fold={fold} shadowColor={personalColorOpacity}>
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
      <Divider size={95} />

      <div
        css={css`
          width: 600px;
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
          box-shadow: ${theme.shadowStyle.default};
        `}
      >
        <Carousel
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
    </ContentBoxWrapper>
  );
}

function SkeletonContentBox() {
  return <ContentBoxWrapper fold={false}></ContentBoxWrapper>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentBoxWrapper = styled.section<{
  fold: boolean;
  shadowColor?: string;
}>(
  ({ fold, shadowColor }) => css`
    background-color: white;
    transition: all 200ms linear;

    width: 100%;
    border: 1px solid ${theme.islandBlueTheme.contentBoxBorder};
    box-shadow: 0 1px 2px ${shadowColor};
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4px;
  `,
);

const UserLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Username = styled.span<{ color?: string }>(
  ({ color = theme.colors.black }) => css`
    font-size: 18px;
    color: ${color};
    font-weight: bold;
  `,
);

const PlaceDescription = styled.span`
  width: 100%;
  font-size: 60%;
  color: ${theme.colors.gray};
  cursor: pointer;
`;

const ContentsDescription = styled.div`
  padding: 10px 10px;
  height: 100%;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 4px;
`;

const TitleLine = styled.div`
  width: 94%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-family: ${theme.fontStyle.roboto};
  font-weight: bold;
`;

const ContentsFold = styled.div`
  color: ${theme.islandBlueTheme.gray};
  cursor: pointer;
  font-weight: bold;
`;

const ContentsBox = styled.div<{ contentsFold: boolean }>(
  ({ contentsFold }) => css`
    height: ${contentsFold ? "auto" : "10%"};
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 30px;

    transition: height 1.4s ease-in-out;
  `,
);

const Contents = styled.div`
  font-family: ${theme.fontStyle.montserrat};
`;

const Date = styled.div`
  font-family: ${theme.fontStyle.roboto};
  font-size: 90%;
`;
