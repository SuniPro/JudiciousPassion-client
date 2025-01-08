/** @jsxImportSource @emotion/react */
import {
  ContentsAreaContainer,
  PageContainer,
} from "../components/Layouts/Layouts";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { css } from "@emotion/react";
import theme from "../styles/theme";
import { Editor } from "../components/Editor/Editor";
import { MainFrameComponent } from "../components/Layouts/MainFrameComponent";
import { FooterNav, SideNav } from "../components/Layouts/Navigation";
import { MAIN_MENU_LIST } from "./MainFrame";
import { useWindowContext } from "../context/WindowContext";

export function EditorMainFrame() {
  const { windowWidth } = useWindowContext();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { width, liRefs, slide1Ref, slide2Ref } =
    MainFrameComponent(selectedIndex);

  return (
    <PageContainer width={windowWidth}>
      <nav
        css={css`
          position: fixed;
          z-index: 10;
        `}
      >
        <MainNavigationUL id="nav-1">
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
      </nav>
      <ContentsAreaContainer>
        <Editor type={MAIN_MENU_LIST[selectedIndex].type} />
      </ContentsAreaContainer>
      {width >= 760 ? <SideNav /> : <FooterNav width={width} />}
    </PageContainer>
  );
}

const MainNavigationUL = styled.ul`
  position: relative;
  border: none;
  border-radius: 10em;
  display: flex;
  list-style: none;
  background: ${theme.islandBlueTheme.defaultBackground};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 10px;
  justify-content: space-evenly;

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
`;

const ManuObject = styled.div<{ isActive: boolean }>(
  ({ isActive }) => css`
    position: relative;
    padding: 0.6em 2em;
    font-size: 18px;
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
