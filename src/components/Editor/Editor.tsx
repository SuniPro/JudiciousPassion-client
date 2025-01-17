/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-color-palette/css";
import { Container, PalletCircle } from "../Layouts/Layouts";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import styled from "@emotion/styled";
import { PostingType } from "../../model/DynamicTypeExtend";
import { Modal } from "@mui/material";
import { PlaceModal } from "../../Modal/Modal";
import { LocationType } from "../../model/location";
import { ApiConnector } from "../../api/posting";
import { useNavigate } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import { useUserContext } from "../../context/UserContext";
import { ErrorNotify } from "../Alert/Alert";
import {
  useProportionHook,
  useProportionSizeHook,
} from "../../hooks/useWindowHook";
import { useWindowContext } from "../../context/WindowContext";
import { CircleButton } from "../Layouts/Button";
import { ProfileImage } from "../profile/Profile";

export interface FileUploadType {
  id: number;
  file: Blob;
  fileUrl: string | ArrayBuffer | null;
}

export interface SelectedFileStateType {
  selectedFile: FileUploadType[];
  setSelectedFile: React.Dispatch<React.SetStateAction<FileUploadType[]>>;
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
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: Object.values(theme.colors) }],
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
  const { windowWidth } = useWindowContext();

  const [contents, setContents] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileUploadType[]>([]);
  const [color, setColor] = useColor(theme.colors.black);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const [location, setLocation] = useState<LocationType>({
    placeName: "",
    longitude: 0,
    latitude: 0,
  });

  const navigate = useNavigate();
  const { size } = useProportionHook(windowWidth, 600, 630);
  const mediaSize = useProportionSizeHook(windowWidth, 630, 500, 630);

  const handleProcedureContentChange = (content: any) => {
    setContents(content);
  };

  const DeleteSelectFile = (id: number) => {
    const result = selectedFile.filter((data) => data.id !== id);
    setSelectedFile(result);
  };

  const convertArrayBufferToString = (
    fileUrl: ArrayBuffer | string | null,
  ): string => {
    if (typeof fileUrl === "string") return fileUrl; // 문자열인 경우 그대로 반환
    if (fileUrl === null) return ""; // null인 경우 빈 문자열 반환
    return btoa(String.fromCharCode(...new Uint8Array(fileUrl))); // ArrayBuffer 변환
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
        imageUrl: selectedFile,
        personalColor: color.hex,
        insertId: user?.username,
      },
      navigate(`/${props.type}`),
    );
  };

  return (
    <Container
      css={css`
        transform: translateX(0%);
        width: ${size}px;
        margin-top: 8rem;

        border: 1px solid ${theme.islandBlueTheme.secondary};
        border-radius: ${theme.borderRadius.roundedBox};

        .ql-toolbar.ql-snow {
          border: none;
          transition: border 0.5s ease-in-out;

          @media ${theme.windowSize.small} {
          }
        }

        .ql-container.ql-snow {
          border: none;
          height: 200px;

          transition: border 0.5s ease-in-out;

          @media ${theme.windowSize.small} {
            border-radius: 0;
          }
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
          padding: 10px 20px;
          border-bottom: 1px solid ${theme.colors.secondary};
          box-sizing: border-box;
        `}
      >
        <span>취소</span>
        <span>작성</span>
        <span>확인</span>
      </div>
      <section
        css={css`
          padding: 10px 10px 0 10px;
          box-sizing: border-box;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <ProfileImage
            name="suni"
            css={css`
              img {
                box-shadow: 0 0 8px ${color.hex + "CC"};
              }
            `}
          />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              width: 100%;
            `}
          >
            <StyledInput
              onFocus={() => setOpen(true)}
              width={90}
              value={location.placeName}
              type="text"
              readOnly
              onChange={(e) =>
                setLocation((prev) => ({
                  ...prev,
                  placeName: e.target.value,
                }))
              }
            />
            <TitleWriteBox
              isActive={title.length !== 0}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              onClick={() => setPaletteOpen(false)}
              color={color.hex}
            />
          </div>
        </div>
        <section
          css={css`
            // 화면 전체 크기를 초과하지 않고 스크롤을 유지하기 위해 width를 지정,
            // translateX와 margin 값을 제거하기 위해 25를 추가하였음.
            width: ${size - 25}px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 10px;
            transform: translateX(2%);

            overflow-x: scroll;
            overflow-y: hidden;
            margin: 5px 0;
          `}
        >
          {selectedFile.map((file, index) => (
            <div
              css={css`
                position: relative;
              `}
            >
              <CircleButton
                func={() => DeleteSelectFile(file.id)}
                icon="x"
                isActive={false}
                css={css`
                  position: absolute;
                  width: 30px;
                  height: 30px;
                  opacity: 0.5;
                  background: ${theme.colors.black};

                  transform: translateX(380%) translateY(20%);
                `}
              />
              <StyledImage
                key={index}
                src={convertArrayBufferToString(file.fileUrl)}
                alt={`Uploaded ${index}`}
                onClick={() => {
                  setSelectedFile((prev) => prev.filter((_, i) => i !== index));
                }}
              />
            </div>
          ))}
        </section>
        <section onClick={() => setPaletteOpen(false)}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={contents}
            onChange={handleProcedureContentChange}
            css={css`
              width: ${size}px;
              height: 80%;
            `}
          />
        </section>
        <section
          css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            align-items: flex-start;

            gap: 10px;

            transform: translateX(2%);
          `}
        >
          <label
            onClick={() => {
              setOpen(true);
            }}
            css={css`
              color: ${location.placeName.length === 0
                ? theme.colors.secondary
                : color.hex === theme.colors.black
                  ? theme.islandBlueTheme.activeBackgroundColor
                  : theme.colors.black};

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
          <ImageUpload
            selectedFileState={{
              selectedFile,
              setSelectedFile,
            }}
            reactiveColor={color.hex}
          />
          <InfoLine>
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
        </section>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          children={
            <PlaceModal
              size={mediaSize.size}
              onClose={() => setOpen(false)}
              locationState={setLocation}
              type="editor"
            />
          }
        />
      </section>
    </Container>
  );
}

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
  selectedFileState: SelectedFileStateType;
  reactiveColor: string;
}) {
  const { selectedFile, setSelectedFile } = props.selectedFileState;

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // --For Multiple File Input
    let images = [];
    if (!e.target.files) return;
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];

      reader.onloadend = () => {
        setSelectedFile((prev) => [
          ...prev,
          {
            id: i,
            file: file,
            fileUrl: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageUploaderContainer>
      <input
        type="file"
        id="fileupload"
        className="file-upload-input"
        onChange={(e) => InputChange(e)}
        multiple
      />
      <label htmlFor="fileupload">
        <i
          data-feather="image"
          css={css`
            color: ${theme.colors.gray};
          `}
        />
      </label>
    </ImageUploaderContainer>
  );
}

const TitleWriteBox = styled.input<{ isActive: boolean; color: string }>(
  ({ isActive, color }) => css`
    border-radius: ${theme.borderRadius.softBox};
    border: none;
    width: 90%;
    height: 30px;

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

  justify-content: flex-start;

  gap: 10px;

  svg {
    color: ${theme.colors.secondary};
  }
  input {
    display: none;
  }
`;
const StyledImage = styled.img`
  width: 150px;
  height: 150px;

  object-fit: cover;
`;

const ImageCase = styled.label<{ borderColor: string }>(
  ({ borderColor }) => css`
    width: 90px;
    height: 90px;
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
  ({ width = 100, isView = true }) => css`
    width: ${width}%;
    height: 15px;
    border: none;
    font-size: 10%;

    display: ${isView ? "block" : "none"};

    color: ${theme.islandBlueTheme.gray};
  `,
);

const ColorPickerCase = styled(ColorPicker)`
  position: absolute;
`;

const InfoLine = styled.div<{ width?: number }>(
  ({ width }) => css`
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    .rcp {
      position: absolute;
      z-index: 10;
      transform: translateX(0) translateY(-55%);
    }
  `,
);
