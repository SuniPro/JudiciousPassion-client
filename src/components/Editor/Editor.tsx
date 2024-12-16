/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PageContainer } from "../Layouts/Layouts";
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import styled from "@emotion/styled";
import * as feather from "feather-icons";
import { CircleButton, RoundedButton } from "../Layouts/Button";

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

export function Editor() {
  const [code, setCode] = useState("");
  const handleProcedureContentChange = (content: any) => {
    setCode(content);
  };
  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <PageContainer
      css={css`
        margin-top: 7rem;
        .ql-toolbar.ql-snow {
          border-radius: ${theme.borderRadius.roundedBox};
        }

        .ql-container.ql-snow {
          border-radius: ${theme.borderRadius.roundedBox};

          height: 500px;
        }
      `}
    >
      <ButtonContainer>
        <CircleButton icon="trash-2" func={undefined} isActive={false} />
        <CircleButton icon="save" func={undefined} isActive={true} />
      </ButtonContainer>

      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
      />
      <ImageUpload />
    </PageContainer>
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

function ImageUpload() {
  const [uploadImgUrl, setUploadImgUrl] = useState<string[]>([]);

  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  const onchangeImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { files } = e.target;
    if (files && files[0]) {
      const uploadFile = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        setUploadImgUrl((prev) => {
          const updatedUrls = [...prev];
          updatedUrls[index] = reader.result as string; // 인덱스 위치에 URL 추가
          return updatedUrls;
        });
      };
    }
  };

  return (
    <ImageUploaderContainer>
      {Array.from({ length: IMAGE_UPLOAD_LIMIT }, (_, index) => (
        <React.Fragment key={index}>
          {uploadImgUrl[index] ? (
            <StyledImage
              key={index}
              src={uploadImgUrl[index]}
              alt={`Uploaded ${index}`}
            />
          ) : (
            <>
              <input
                id={`image-upload-case ${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => onchangeImageUpload(e, index)}
              />
              <ImageCase htmlFor={`image-upload-case ${index}`}>
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

const ImageCase = styled.label`
  width: 54px;
  height: 54px;
  border: 1px dashed ${theme.colors.gray};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
