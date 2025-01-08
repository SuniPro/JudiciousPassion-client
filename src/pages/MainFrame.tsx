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
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import theme from "../styles/theme";
import { Outlet, useNavigate } from "react-router-dom";
import { FooterNav, SideNav } from "../components/Layouts/Navigation";
import { MainFrameComponent } from "../components/Layouts/MainFrameComponent";
import { MainMenuType } from "../model/MainMenuType";

export const MAIN_MENU_LIST: MainMenuType[] = [
  { menu: "Taste", icon: FlatwareIcon, type: "taste" },
  { menu: "Saunter", icon: WbSunnyIcon, type: "saunter" },
  { menu: "Tour", icon: BeachAccessIcon, type: "tour" },
  { menu: "Personal", icon: ManageAccountsIcon, type: "personal" },
];
export function MainFrame() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const { width, liRefs, slide1Ref, slide2Ref } =
    MainFrameComponent(selectedIndex);

  useEffect(() => {
    const locate = MAIN_MENU_LIST[selectedIndex].type;
    navigate(locate!);
  }, [navigate, selectedIndex]);

  return (
    <PageContainer width={width}>
      <nav
        css={css`
          position: fixed;
          z-index: 10;

          display: flex;
          flex-direction: column;
          align-items: center;
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
        <Outlet />
      </ContentsAreaContainer>
      {width >= 760 ? <SideNav /> : <FooterNav width={width} />}
    </PageContainer>
  );
}

const MainNavigationUL = styled.ul`
  width: 100%;
  position: relative;
  border: none;
  border-radius: 10em;
  display: flex;
  list-style: none;
  background: ${theme.islandBlueTheme.defaultBackground};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 10px;
  justify-content: space-evenly;

  align-items: center;

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
