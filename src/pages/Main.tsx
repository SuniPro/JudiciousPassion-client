import { PageContainer } from "../components/Layouts/Layouts";
import { Taste } from "./Taste";
import styled from "@emotion/styled";
import FlatwareIcon from "@mui/icons-material/Flatware";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import theme from "../styles/theme";

const MAIN_MENU_LIST = [
  { menu: "Taste", icon: FlatwareIcon },
  { menu: "Saunter", icon: WbSunnyIcon },
  { menu: "Tour", icon: BeachAccessIcon },
  { menu: "Personal", icon: ManageAccountsIcon },
];

type MainMenuType = typeof MAIN_MENU_LIST;

export function Main() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const liRefs = useRef<HTMLLIElement[]>([]);
  const slide1Ref = useRef<HTMLLIElement>(null);
  const slide2Ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const slide1 = slide1Ref.current;
    const slide2 = slide2Ref.current;
    const selectedLi = liRefs.current[selectedIndex];

    if (!slide1 || !slide2) return;

    const rect = selectedLi.getBoundingClientRect();
    const parentRect = selectedLi.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    const left = rect.left - parentRect.left;
    const width = rect.width;

    // slide1 위치 및 크기 업데이트
    slide1.style.left = `${left}px`;
    slide1.style.width = `${width}px`;

    // slide2는 비활성화 애니메이션용
    slide2.style.opacity = "0";
    slide2.style.left = `${left}px`;
    slide2.style.width = `${width}px`;
  }, [selectedIndex]);

  return (
    <>
      <nav>
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
      <PageContainer>
        <Taste />
      </PageContainer>
    </>
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
