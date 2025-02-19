/** @jsxImportSource @emotion/react */
import {
  ContentsAreaContainer,
  PageContainer,
} from "../components/Layouts/Layouts";
import styled from "@emotion/styled";
import FlatwareIcon from "@mui/icons-material/Flatware";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import React, { useState } from "react";
import { css } from "@emotion/react";
import theme from "../styles/theme";
import { FooterNav, SideNav } from "../components/Layouts/Navigation";
import { MainFrameComponent } from "../components/Layouts/MainFrameComponent";
import { MainMenuType } from "../model/MainMenuType";
import { Taste } from "./Taste";
import { Tour } from "./Tour";
import { Personal } from "./Personal";
import { Saunter } from "./Saunter";
import { EditorModal } from "../components/Editor/Editor";
import { Modal } from "@mui/material";
import { useProportionHook } from "../hooks/useWindowHook";

export const MAIN_MENU_LIST: MainMenuType[] = [
  { menu: "TASTE", icon: FlatwareIcon, type: "taste", component: <Taste /> },
  {
    menu: "WALK",
    icon: WbSunnyIcon,
    type: "saunter",
    component: <Saunter />,
  },
  {
    menu: "SPOT",
    icon: BeachAccessIcon,
    type: "tour",
    component: <Tour />,
  },
  {
    menu: "PERSONAL",
    icon: ManageAccountsIcon,
    type: "personal",
    component: <Personal />,
  },
];

export function MainFrame() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editorModalOpen, setEditorModalOpen] = useState(false);

  const [content, setContent] = useState<string>("");

  const { windowWidth, liRefs, slide1Ref, slide2Ref } =
    MainFrameComponent(selectedIndex);

  const { size } = useProportionHook(
    windowWidth,
    40,
    theme.mainFrameSize.defaultWidth,
  );

  const navigation = useProportionHook(
    windowWidth,
    378,
    theme.mainFrameSize.defaultWidth,
  );

  const navigationContainerSize = useProportionHook(
    windowWidth,
    theme.mainFrameSize.defaultWidth - 20,
    theme.mainFrameSize.defaultWidth,
  );

  return (
    <PageContainer
      width={windowWidth}
      css={css`
        padding-bottom: 4rem;
      `}
    >
      <nav
        css={css`
          position: fixed;
          z-index: 10;

          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: ${navigationContainerSize.size}px;
            box-sizing: border-box;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          `}
        >
          <MainNavigationUL id="nav-1" width={navigation.size}>
            <li ref={slide1Ref} className="slide1"></li>
            <li ref={slide2Ref} className="slide2"></li>
            {MAIN_MENU_LIST.map((menu, index) => (
              <li
                key={index}
                ref={(el) => {
                  if (el) liRefs.current[index] = el;
                }}
              >
                <ManuObject
                  onClick={() => setSelectedIndex(index)}
                  isActive={selectedIndex === index}
                >
                  {menu.menu}
                </ManuObject>
              </li>
            ))}
          </MainNavigationUL>
          <div
            css={css`
              width: ${size}px;
              height: ${size}px;
              border-radius: ${theme.borderRadius.circle};
              background: ${theme.defaultTheme.menuAndToggleNonActiveColor};
              transform: translateX(40%);
            `}
          />
        </div>
      </nav>
      <ContentsAreaContainer>
        {MAIN_MENU_LIST[selectedIndex].component}
      </ContentsAreaContainer>
      <Modal
        open={editorModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditorModal
          onClose={() => setEditorModalOpen(false)}
          type={MAIN_MENU_LIST[selectedIndex].type}
        />
      </Modal>
      {windowWidth >= 760 ? (
        <SideNav onEditor={() => setEditorModalOpen(true)} />
      ) : (
        <FooterNav onEditor={() => setEditorModalOpen(true)} />
      )}
    </PageContainer>
  );
}

const MainNavigationUL = styled.ul<{ width: number }>(
  ({ width }) => css`
    width: ${width}px;
    position: relative;
    border: none;
    border-radius: 10em;
    display: flex;
    list-style: none;
    background: ${theme.defaultTheme.defaultBackground};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    padding: 10px;
    justify-content: space-evenly;

    align-items: center;

    font-size: 80%;

    font-family: ${theme.fontStyle.poppins};
    font-weight: bold;

    @media ${theme.windowSize.small} {
      font-size: 50%;
      .slide1,
      .slide2 {
        height: 5em;
      }
    }

    li {
      margin: 0;
      position: relative;
    }

    .slide1,
    .slide2 {
      position: absolute;
      height: 3em;
      border-radius: 10em;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);

      @media ${theme.windowSize.small} {
        height: 4em;
      }
    }

    .slide1 {
      background-color: ${theme.colors.babyBlueToneDown};
      z-index: 2;
    }

    .slide2 {
      opacity: 0;
      background: #ddd;
      z-index: 1;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  `,
);

const ManuObject = styled.div<{ isActive: boolean }>(
  ({ isActive }) => css`
    position: relative;
    padding: 6% 2em;
    border: none;
    outline: none;
    color: ${isActive ? theme.colors.white : theme.colors.gray};
    font-weight: ${isActive ? "bold" : "normal"};
    display: inline-block;
    text-decoration: none;
    z-index: 3;
    cursor: pointer;
  `,
);
