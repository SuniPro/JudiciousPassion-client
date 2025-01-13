/** @jsxImportSource @emotion/react */
import {
  DefaultContentBoxWrapper,
  EllipsisCase,
  MainFunctionContainer,
  PalletCircle,
} from "../components/Layouts/Layouts";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { TasteType } from "../model/TasteType";
import { LikeButton } from "../components/Relation/Rate";
import React, { useEffect, useState } from "react";
import * as feather from "feather-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasteList } from "../api/taste";
import { useBodyScrollBottomOver } from "../hooks/useWheel";
import { Carousel } from "../components/Carousel/Carousel";
import { iso8601ToYYMMDDHHMM } from "../components/Date/DateFormatter";
import { Modal, Tooltip } from "@mui/material";
import { PersonalColorModal, PlaceModal } from "../Modal/Modal";
import { LocationType } from "../model/location";
import { useWindowContext } from "../context/WindowContext";

export function Taste() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["taste"], // 캐싱 키
      queryFn: getTasteList, // 데이터 요청 함수
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < 5 ? null : allPages.length, // 다음 페이지 번호
      initialPageParam: 0,
    });

  useBodyScrollBottomOver(fetchNextPage, isFetchingNextPage);

  if (!data) return;

  return (
    <>
      <MainFunctionContainer>
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((taste, index) => (
              <React.Fragment key={index}>
                <ContentBox fold={false} index={index} taste={taste} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </MainFunctionContainer>
    </>
  );
}

export function ContentBox(props: {
  taste: TasteType;
  index: number;
  fold: boolean;
}) {
  const { windowWidth } = useWindowContext();
  const { taste, index, fold } = props;
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
  const personalColorOpacity = taste.personalColor
    ? taste.personalColor + "CC"
    : "rgba(0, 0, 0, 0.2)";

  // @ts-ignore
  return (
    <DefaultContentBoxWrapper fold={fold} shadowColor={personalColorOpacity}>
      <ProfileLine>
        <UserLine>
          <ProfileImage name="suni" />
          <ProfileDescription>
            <Username color={taste.personalColor ?? theme.colors.black}>
              {taste.insertId}
            </Username>
            <Tooltip title="클릭해서 위치를 확인하세요 !">
              <EllipsisCase
                width={180}
                text={taste.placeName}
                textAlign="left"
                css={css`
                  font-size: 60%;
                  color: ${theme.colors.gray};
                  cursor: pointer;
                `}
              ></EllipsisCase>
              {/*<PlaceDescription onClick={() => setPlaceModalOpen(true)}>*/}
              {/*  */}
              {/*</PlaceDescription>*/}
            </Tooltip>
          </ProfileDescription>
        </UserLine>
        <ContentsDescription>
          {taste.personalColor && (
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
                backgroundColor={taste.personalColor}
                onClick={() => setPersonalColorModalOpen(true)}
              />
            </Tooltip>
          )}
          <Date>
            {iso8601ToYYMMDDHHMM(taste.insertDate ? taste.insertDate : "")}
          </Date>
        </ContentsDescription>
      </ProfileLine>
      <TitleLine css={css``}>
        <span>{taste.title}</span>
      </TitleLine>
      {/*<Divider size={95} />*/}

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
        <Carousel
          type="taste"
          data={taste}
          personalColor={taste.personalColor}
          size={windowWidth}
        />
      </div>
      <ContentsBox contentsFold={contentsFold}>
        {contentsFold ? (
          <Contents dangerouslySetInnerHTML={{ __html: taste.contents }} />
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
          rate={taste.rate ? taste.rate : 0}
          feedId={taste.id}
          type="taste"
        />
      </div>
      <Modal
        open={personalColorModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PersonalColorModal
          onClose={() => setPersonalColorModalOpen(false)}
          color={taste.personalColor}
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
          lat={taste.latitude}
          lng={taste.longitude}
        />
      </Modal>
    </DefaultContentBoxWrapper>
  );
}

function SkeletonContentBox() {
  return <DefaultContentBoxWrapper fold={false}></DefaultContentBoxWrapper>;
}

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

  // test
  padding-bottom: 1rem;
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
  font-size: 80%;
`;
