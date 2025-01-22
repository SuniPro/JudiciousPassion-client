/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-color-palette/css";
import { ModalHeader, PalletCircle } from "../Layouts/Layouts";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import styled from "@emotion/styled";
import { PostingType } from "../../model/DynamicTypeExtend";
import { Modal } from "@mui/material";
import {
  SaunterWaypointInsertModal,
  StyledModalBox,
  YoutubeLinkInsertModal,
} from "../../Modal/Modal";
import { LocationWayPointType } from "../../model/location";
import { ApiConnector } from "../../api/posting";
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
import { useContentIconHook } from "../../hooks/useContents";
import { YoutubePlayer } from "../Youtube/Youtube";

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

export function Editor(props: {
  type: PostingType["type"];
  onClose: () => void;
  size?: { width: number; height: number };
}) {
  const { type, onClose } = props;
  const { user } = useUserContext();
  const { windowWidth } = useWindowContext();
  useContentIconHook();

  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileUploadType[]>([]);
  const [color, setColor] = useColor(theme.colors.black);

  const [waypoint, setWaypoint] = useState<LocationWayPointType[]>([]);
  const startPoint = waypoint.find((point) => point.WaypointType === "start");

  const [youtubeLink, setYouTubeLink] = useState("");

  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [youtubeModalOpen, setYoutubeModalOOpen] = useState(false);

  const { size } = useProportionHook(windowWidth, 600, 630);
  const waypointInsertAreaExtent = useProportionSizeHook(
    windowWidth,
    400,
    400,
    630,
  );
  const youtubeLinkModalExtent = useProportionSizeHook(
    windowWidth,
    400,
    300,
    630,
  );

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
    if (fileUrl === null) return ""; // null 인 경우 빈 문자열 반환
    return btoa(String.fromCharCode(...new Uint8Array(fileUrl))); // ArrayBuffer 변환
  };

  const eventHandler = () => {
    if (title.length <= 0) {
      ErrorNotify("제목을 입력해주세요.");
      return;
    } else if (waypoint.length < 2) {
      ErrorNotify("출발지와 목적지를 입력하세요.");
      return;
    }
    ApiConnector(type, {
      contents,
      title,
      location,
      imageUrl: selectedFile,
      personalColor: color.hex,
      insertId: user?.username,
      youtubeLink: youtubeLink,
    });
  };

  return (
    <StyledModalBox
      width={size}
      css={css`
        width: ${size}px;
        height: auto;
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
      <ModalHeader
        leftFunc={onClose}
        purpose="작성"
        rightMenu="저장"
        rightFunc={eventHandler}
      />
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
              value={startPoint?.placeName}
              type="text"
              readOnly
            />
            <TitleWriteBox
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              onClick={() => setPaletteOpen(false)}
              color={color.hex}
            />
          </div>
        </div>
        <section
          css={css`
            // 화면 전체 크기를 초과하지 않고 스크롤을 유지하기 위해 width 를 지정,
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
          {youtubeLink.length !== 0 && (
            <>
              <YoutubePlayer
                link={youtubeLink}
                size={{ width: 150, height: 150 }}
              />
              <CircleButton
                func={() => setYouTubeLink("")}
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
            </>
          )}
          {selectedFile.map((file, index) => (
            <div
              key={index}
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
              color: ${waypoint.length === 0
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
          <label
            onClick={() => {
              if (youtubeLink.length !== 0) {
                ErrorNotify("Youtube 첨부 시, 이미지를 추가할 수 없습니다.");
              }
            }}
          >
            <ImageUpload
              selectedFileState={{
                selectedFile,
                setSelectedFile,
              }}
              reactiveColor={
                color.hex === theme.colors.black
                  ? theme.islandBlueTheme.menuAndToggleActiveColor
                  : color.hex
              }
              disable={youtubeLink.length !== 0}
            />
          </label>
          <label
            onClick={() => {
              if (selectedFile.length === 0) {
                setYoutubeModalOOpen(true);
              } else {
                ErrorNotify("이미지 첨부 시, Youtube를 추가할 수 없습니다.");
              }
            }}
            css={css`
              color: ${youtubeLink.length === 0
                ? theme.colors.secondary
                : color.hex === theme.colors.black
                  ? theme.islandBlueTheme.activeBackgroundColor
                  : theme.colors.black};

              transition: color 0.5s ease-in-out;
            `}
          >
            <i
              data-feather="youtube"
              css={css`
                cursor: pointer;
              `}
            />
          </label>
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
            <SaunterWaypointInsertModal
              size={waypointInsertAreaExtent.size}
              onClose={() => setOpen(false)}
              setWaypoint={setWaypoint}
              css={css`
                height: auto;
              `}
            />
          }
        />
        <Modal
          open={youtubeModalOpen}
          onClose={() => setYoutubeModalOOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          children={
            <YoutubeLinkInsertModal
              size={youtubeLinkModalExtent.size}
              onClose={() => setYoutubeModalOOpen(false)}
              setYoutubeLink={setYouTubeLink}
            />
          }
        />
      </section>
    </StyledModalBox>
  );
}

function ImageUpload(props: {
  selectedFileState: SelectedFileStateType;
  reactiveColor: string;
  disable?: boolean;
}) {
  const { disable, reactiveColor } = props;
  const { selectedFile, setSelectedFile } = props.selectedFileState;

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // --For Multiple File Input
    let images = [];
    if (!e.target.files) return;
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];

      if (images.length <= IMAGE_UPLOAD_LIMIT) {
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
      } else {
        ErrorNotify(`이미지는 최대 ${IMAGE_UPLOAD_LIMIT}개 업로드 가능합니다.`);
      }
    }
  };

  return (
    <ImageUploaderContainer>
      {disable ? (
        <></>
      ) : (
        <input
          type="file"
          id="fileupload"
          className="file-upload-input"
          onChange={(e) => InputChange(e)}
          multiple
        />
      )}
      <label htmlFor="fileupload">
        <i
          data-feather="image"
          css={css`
            color: ${selectedFile.length === 0
              ? theme.colors.gray
              : reactiveColor};
          `}
        />
      </label>
    </ImageUploaderContainer>
  );
}

const TitleWriteBox = styled.input<{ color: string }>(
  ({ color }) => css`
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

  input {
    display: none;
  }
`;
const StyledImage = styled.img`
  width: 150px;
  height: 150px;

  object-fit: cover;
`;

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
  ({ width = 100 }) => css`
    width: ${width}%;
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

export const EditorModal = forwardRef(
  (
    props: {
      type: PostingType["type"];
      onClose: () => void;
      size?: { width: number; height: number };
    },
    _ref,
  ) => <Editor {...props} />,
);
