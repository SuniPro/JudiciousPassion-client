/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-color-palette/css";
import { PalletCircle } from "../Layouts/Layouts";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import styled from "@emotion/styled";
import * as feather from "feather-icons";
import { CircleButton } from "../Layouts/Button";
import { PostingType } from "../../model/DynamicTypeExtend";
import { Modal } from "@mui/material";
import { PlaceModal } from "../../Modal/Modal";
import { LocationType } from "../../model/location";
import { ApiConnector } from "../../api/posting";
import { useNavigate } from "react-router-dom";
import heic2any from "heic2any";
import { ColorPicker, useColor } from "react-color-palette";
import { useUserContext } from "../../context/UserContext";
import { ErrorNotify } from "../Alert/Alert";

interface ImageUrlStateType {
  imageUrl: Blob[];
  setImageUrl: React.Dispatch<React.SetStateAction<Blob[]>>;
}

const IMAGE_UPLOAD_LIMIT = 8;

const myColors = [
  "purple",
  "#785412",
  "#452632",
  "#856325",
  "#963254",
  "#254563",
  "white",
];
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ color: myColors }],
    [{ background: myColors }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "background",
  "align",
];

export function Editor(props: { type: PostingType["type"] }) {
  const { user } = useUserContext();

  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  const [contents, setContents] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<Blob[]>([]);
  const [color, setColor] = useColor(theme.colors.secondary);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const [location, setLocation] = useState<LocationType>({
    placeName: "",
    longitude: "",
    latitude: "",
  });

  const navigate = useNavigate();

  const [quillWidth, setQuillWidth] = useState(0);

  const quillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setQuillWidth(quillRef.current ? quillRef.current.offsetWidth : 600);
  }, [quillRef.current?.offsetWidth]);

  const handleProcedureContentChange = (content: any) => {
    setContents(content);
  };

  const eventHandler = () => {
    if (title.length <= 0) {
      ErrorNotify("제목을 입력해주세요.");
      return;
    }
    ApiConnector(
      props.type,
      {
        contents,
        title,
        location,
        imageUrl,
        personalColor: color.hex,
        insertId: user?.username,
      },
      navigate(`/${props.type}`),
    );
  };

  return (
    <Container
      css={css`
        margin-top: 8rem;

        .ql-toolbar.ql-snow {
          border-radius: ${theme.borderRadius.roundedBox};
          border: ${color.hex} 1px solid;

          transition: border 0.5s ease-in-out;
        }

        .ql-container.ql-snow {
          border-radius: ${theme.borderRadius.roundedBox};
          border: ${color.hex} 1px solid;
          height: 300px;

          transition: border 0.5s ease-in-out;
        }
      `}
    >
      <ButtonContainer>
        <CircleButton icon="save" func={eventHandler} isActive={true} />
      </ButtonContainer>

      {/*<SearchGoogle />*/}
      <InfoLine width={quillWidth}>
        <label
          onClick={() => {
            setOpen(true);
          }}
          css={css`
            color: ${location.placeName.length !== 0 &&
            color.hex !== theme.colors.secondary
              ? theme.islandBlueTheme.activeBackgroundColor
              : color.hex};

            transition: color 0.5s ease-in-out;
          `}
        >
          <i
            data-feather="map-pin"
            css={css`
              cursor: pointer;
            `}
          />
        </label>
        <StyledInput
          onFocus={() => setOpen(true)}
          width={60}
          value={location.placeName}
          type="text"
          readOnly
          placeholder="좌측 맵핀을 누르고 주소를 입력하세요."
          onChange={(e) =>
            setLocation((prev) => ({
              ...prev,
              placeName: e.target.value,
            }))
          }
        />
      </InfoLine>
      <InfoLine width={quillWidth}>
        <PalletCircle
          onClick={() => {
            setPaletteOpen((prev) => !prev);
          }}
          backgroundColor={color.hex}
        />
        <StyledInput
          width={60}
          type="text"
          readOnly
          placeholder="좌측의 팔레트를 눌러 식당의 퍼스널컬러를 지정해보세요!."
          onClick={() => setPaletteOpen(false)}
        />
        {paletteOpen && (
          <ColorPickerCase
            color={color}
            onChange={setColor}
            hideInput={["rgb", "hsv"]}
          />
        )}
      </InfoLine>

      <div
        css={css`
          width: ${quillWidth}px;
          display: flex;
          flex-direction: row;
          margin-bottom: 8px;
        `}
      >
        <TitleWriteBox
          isActive={title.length !== 0}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
          onClick={() => setPaletteOpen(false)}
          color={color.hex}
        />
      </div>
      <div ref={quillRef} onClick={() => setPaletteOpen(false)}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={contents}
          onChange={handleProcedureContentChange}
          css={css`
            width: ${quillWidth < 550 ? 550 : quillWidth}px;
          `}
        />
      </div>
      <ImageUpload
        imageUrlState={{ imageUrl, setImageUrl }}
        reactiveColor={color.hex}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        children={
          <PlaceModal
            onClose={() => setOpen(false)}
            locationState={setLocation}
          />
        }
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

function ImageUpload(props: {
  imageUrlState: ImageUrlStateType;
  reactiveColor: string;
}) {
  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  const { reactiveColor } = props;
  const { imageUrl, setImageUrl } = props.imageUrlState;

  const handleFileChange = async (fileBlob: File): Promise<Blob> => {
    console.log(fileBlob);
    const blob = await heic2any({ blob: fileBlob, toType: "image/jpeg" });
    console.log(blob);
    if (Array.isArray(blob)) {
      return blob[0]; // 첫 번째 Blob 반환
    }

    return blob;
  };

  const onchangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { files } = e.target;
    if (files) {
      const uploadBlob =
        files[0].type === "image/heic"
          ? await handleFileChange(files[0]) // 비동기 작업 대기
          : files[0]; // File은 Blob의 하위 타입
      setImageUrl((prev) => {
        const updatedUrls = [...prev];
        updatedUrls[index] = uploadBlob; // 인덱스 위치에 URL 추가
        return updatedUrls;
      });
    }
  };

  return (
    <ImageUploaderContainer>
      {Array.from({ length: IMAGE_UPLOAD_LIMIT }, (_, index) => (
        <React.Fragment key={index}>
          {imageUrl[index] ? (
            <StyledImage
              key={index}
              src={URL.createObjectURL(imageUrl[index])}
              alt={`Uploaded ${index}`}
              onClick={() => {
                setImageUrl((prev) => prev.filter((_, i) => i !== index));
              }}
            />
          ) : (
            <>
              <input
                id={`image-upload-case ${index}`}
                type="file"
                accept="image/*,image/heic"
                onChange={(e) => onchangeImageUpload(e, index)}
              />
              <ImageCase
                htmlFor={`image-upload-case ${index}`}
                borderColor={reactiveColor}
              >
                <i
                  data-feather="plus"
                  css={css`
                    color: ${theme.colors.gray};
                  `}
                />
              </ImageCase>
            </>
          )}
        </React.Fragment>
      ))}
    </ImageUploaderContainer>
  );
}

const TitleWriteBox = styled.input<{ isActive: boolean; color: string }>(
  ({ isActive, color }) => css`
    border-radius: ${theme.borderRadius.softBox};
    border: none;
    width: 100%;
    height: 30px;

    padding-left: 10px;
    font-size: 18px;

    color: ${color};
    font-weight: bold;
    font-family: ${theme.fontStyle.montserrat};

    transition: color 0.5s ease-in-out;
  `,
);

const ImageUploaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;

  justify-content: center;

  gap: 10px;

  input {
    display: none;
  }
`;
const StyledImage = styled.img`
  width: 54px;
  height: 54px;

  object-fit: cover;
`;

const ImageCase = styled.label<{ borderColor: string }>(
  ({ borderColor }) => css`
    width: 54px;
    height: 54px;
    border: 1px solid ${borderColor};
    border-radius: ${theme.borderRadius.roundedBox};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition: border 0.5s ease-in-out;
  `,
);

const StyledInput = styled.input<{ width?: number; isView?: boolean }>(
  ({ width = 70, isView = true }) => css`
    width: ${width}%;
    height: 22px;
    border: none;
    padding-left: 10px;

    display: ${isView ? "block" : "none"};

    color: ${theme.islandBlueTheme.gray};
  `,
);

const ColorPickerCase = styled(ColorPicker)`
  position: absolute;
`;

const InfoLine = styled.div<{ width: number }>(
  ({ width }) => css`
    width: ${width}px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    gap: 4px;

    .rcp {
      position: absolute;
      z-index: 10;
      left: 10%;
    }
  `,
);
