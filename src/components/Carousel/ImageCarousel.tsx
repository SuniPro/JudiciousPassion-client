/** @jsxImportSource @emotion/react */
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PostingType } from "../../model/DynamicTypeExtend";
import { TasteType } from "../../model/TasteType";
import theme from "../../styles/theme";
import { TourType } from "../../model/TourType";
import React, { ReactNode } from "react";

export function ImageCarousel(props: {
  type: PostingType["type"];
  data: any;
  personalColor?: string | null;
  size: number;
  children?: ReactNode;
}) {
  const { type, data, personalColor, size, children } = props;

  const imageRender = (urls: string[] | undefined) => {
    if (!urls) {
      return <></>;
    }

    return (
      <>
        {urls.map((url, index) => (
          <StyledSwiperSlide
            key={index}
            className={`swiper-slide swiper-slide-${index}`}
            index={index}
            image={url}
            size={size}
          />
        ))}
      </>
    );
  };

  const mediaRender = () => (
    <>
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </>
  );

  const dataAdaptor = () => {
    switch (type) {
      case "taste":
        return imageRender((data as TasteType).imageUrls!);
      case "saunter":
        return mediaRender();
      case "tour":
        return imageRender((data as TourType).imageUrls!);
      default:
        return <div>No valid data found</div>;
    }
  };

  return (
    <CollectionWrapper personalColor={personalColor}>
      <CollectionMain>
        <Swiper
          effect="cube"
          modules={[Pagination, Keyboard, Mousewheel]}
          grabCursor={true}
          centeredSlides={true}
          lazy={true}
          keyboard={{ enabled: true }}
          loop={true}
          pagination={{ el: ".swiper-pagination" }}
        >
          {dataAdaptor()}
          <div
            css={css`
              bottom: 0 !important;
            `}
            className="swiper-pagination"
          />
        </Swiper>
      </CollectionMain>
    </CollectionWrapper>
  );
}

export function FeedCarousel(props: {
  children: ReactNode;
  personalColor?: string | null;
}) {
  const { children, personalColor } = props;

  return (
    <CollectionWrapper personalColor={personalColor}>
      <CollectionMain>
        <Swiper
          effect="cube"
          modules={[Pagination, Keyboard, Mousewheel]}
          grabCursor={true}
          centeredSlides={true}
          lazy={true}
          keyboard={{ enabled: true }}
          loop={true}
          pagination={{ el: ".swiper-pagination" }}
          /*Swiper 는 기본적으로 contents box 상태를 유지하기 때문에 하단부의 1px 정도가 잘리게됩니다.
            때문에 이를 방지하기 위해 하단에 1px 정도의 여유를 두어 잘림을 방지합니다.
            */
          css={css`
            padding-bottom: 1px;
          `}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </CollectionMain>
    </CollectionWrapper>
  );
}

const CollectionWrapper = styled.div<{ personalColor?: string | null }>(
  ({ personalColor = "#007aff" }) => css`
    .swiper-pagination-bullet-active {
      background: ${personalColor} !important;
    }
  `,
);

const CollectionMain = styled.main``;

const StyledSwiperSlide = styled(SwiperSlide)<{
  index: number;
  image: string;
  size: number;
}>(
  ({ index, image, size }) => css`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: self-start;

    &.swiper-slide {
      height: ${size}px;
      max-height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: self-start;
    }

    &.swiper-slide-${index} {
      background: url(${image}) no-repeat 50% 50% / cover;
      box-shadow: ${theme.shadowStyle.default};
    }
  `,
);
