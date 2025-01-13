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
import { SaunterType } from "../../model/SaunterType";
import theme from "../../styles/theme";
import { TourType } from "../../model/TourType";

export function Carousel(props: {
  type: PostingType["type"];
  data: any;
  personalColor?: string | null;
  size: number;
}) {
  const { type, data, personalColor, size } = props;

  const renderSlides = (urls: string[] | undefined) => {
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

  const dataAdaptor = () => {
    switch (type) {
      case "taste":
        return renderSlides((data as TasteType).imageUrls!);
      case "saunter":
        return renderSlides((data as SaunterType).mediaUrls!);
      case "tour":
        return renderSlides((data as TourType).imageUrls!);
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
