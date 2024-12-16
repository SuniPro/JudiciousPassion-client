/** @jsxImportSource @emotion/react */
import { Divider } from "../components/Layouts/Layouts";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ProfileImage } from "../components/profile/Profile";
import theme from "../styles/theme";
import { ToggleButton } from "../components/Layouts/input/CheckBox";
import { TasteType } from "../model/TasteType";
import { LikeButton } from "../components/Relation/Rate";

const TASTE_DUMMY: TasteType[] = [
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
  {
    id: 1,
    name: "suni",
    title: "test 입니다.",
    description: "test입니다.",
    contents: "컨텐츠 테스트",
    latitude: 12323.4223345,
    longitude: 12323.4223345,
  },
];

const Container = styled.div`
  margin-top: 7rem;
  width: 100%;
  height: 100%;
`;

export function Taste() {
  return (
    <Container>
      {TASTE_DUMMY.map((taste, index) => (
        <ContentBox fold={false} index={index} taste={taste} />
      ))}
    </Container>
  );
}

export function ContentBox(props: {
  taste: TasteType;
  index: number;
  fold: boolean;
}) {
  const { taste, index, fold } = props;
  return (
    <ContentBoxWrapper fold={fold}>
      <ProfileLine>
        <UserLine>
          <ProfileImage name="suni" />
          <ProfileDescription>
            <Username>{taste.name}</Username>
            <UserDescription>{taste.description}</UserDescription>
          </ProfileDescription>
        </UserLine>
        <ContentsDescription>
          <ToggleButton id={`taste-${index}`} />
        </ContentsDescription>
      </ProfileLine>
      <Divider size={95} />
      <TitleLine css={css``}>
        <span>{taste.title}</span>
      </TitleLine>
      <div></div>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          padding-left: 30px;
        `}
      >
        <LikeButton />
      </div>
    </ContentBoxWrapper>
  );
}

function SkeletonContentBox() {
  return <ContentBoxWrapper fold={false}></ContentBoxWrapper>;
}

const ContentBoxWrapper = styled.section<{ fold: boolean }>(
  ({ fold }) => css`
    background-color: white;
    transition: all 200ms linear;

    width: 100%;
    border: 1px solid ${theme.islandBlueTheme.contentBoxBorder};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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

const Username = styled.span`
  font-size: 20px;
`;

const UserDescription = styled.span`
  font-size: 16px;
`;

const ContentsDescription = styled.div`
  padding: 10px 10px;
  height: 100%;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TitleLine = styled.div`
  width: 94%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 12px;
`;
