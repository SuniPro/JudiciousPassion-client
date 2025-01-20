/** @jsxImportSource @emotion/react */
import {
  DefaultContentBoxWrapper,
  EllipsisCase,
  MainFunctionContainer,
  PalletCircle,
} from "../components/Layouts/Layouts";
import { css } from "@emotion/react";
import { ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { TasteType } from "../model/TasteType";
import { LikeButton } from "../components/Relation/Rate";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasteList } from "../api/taste";
import { useBodyScrollBottomOver } from "../hooks/useWheel";
import { ImageCarousel } from "../components/Carousel/ImageCarousel";
import { iso8601ToYYMMDDHHMM } from "../components/Date/DateFormatter";
import { Modal, Tooltip } from "@mui/material";
import { PersonalColorModal, PlaceModal } from "../Modal/Modal";
import { useWindowContext } from "../context/WindowContext";
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
import {
  useProportionHook,
  useProportionSizeHook,
} from "../hooks/useWindowHook";

export function Taste() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["taste"], // 캐싱 키
    queryFn: getTasteList, // 데이터 요청 함수
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
            {page.map((taste, index) => (
              <React.Fragment key={index}>
                <TasteContentBox fold={false} taste={taste} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </MainFunctionContainer>
    </>
  );
}

export function TasteContentBox(props: {
  taste: TasteType;
  fold: boolean;
  className?: string;
}) {
  const { taste, fold, className } = props;
  const { windowWidth } = useWindowContext();

  const { size } = useProportionHook(windowWidth, 280, 630);
  const mapSize = useProportionSizeHook(windowWidth, 600, 600, 630);

  const [placeModalOpen, setPlaceModalOpen] = useState(false);
  const [personalColorModalOpen, setPersonalColorModalOpen] = useState(false);

  const [contentsFold, setContentsFold] = useState<boolean>(false);

  return (
    <DefaultContentBoxWrapper className={className}>
      <ProfileLine>
        <UserLine>
          <ProfileImage name="suni" />
          <ProfileDescription>
            <Username color={taste.personalColor ?? theme.colors.black}>
              {taste.insertId}
            </Username>
            <EllipsisCase
              func={() => setPlaceModalOpen(true)}
              width={size}
              text={taste.placeName}
              textAlign="left"
              css={css`
                font-size: 60%;
                color: ${theme.colors.gray};
                cursor: pointer;
              `}
            />
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
      <TitleLine>
        <span>{taste.title}</span>
      </TitleLine>
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
        </>
      )}
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
          lat={taste.latitude}
          lng={taste.longitude}
          size={mapSize.size}
          type="view"
        />
      </Modal>
    </DefaultContentBoxWrapper>
  );
}

function SkeletonContentBox() {
  return <DefaultContentBoxWrapper></DefaultContentBoxWrapper>;
}
