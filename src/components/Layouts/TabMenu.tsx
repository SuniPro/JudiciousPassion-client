/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { gsap } from "gsap";
import theme from "../../styles/theme";

export interface TabMenuListType {
  menu: string;
  path: string;
}

export interface ActiveFunctionProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export function TabMenu(props: {
  menuList: TabMenuListType[];
  activeState: ActiveFunctionProps;
}) {
  const { menuList, activeState } = props;
  const { selectedIndex, setSelectedIndex } = activeState;

  return (
    <TabMenuContainer>
      <TabMenuUnorderedList>
        {menuList.map((menu, index) => (
          <TabMenuList
            key={index}
            isActive={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            <TabMenuContent isActive={selectedIndex === index}>
              {menu.menu}
            </TabMenuContent>
          </TabMenuList>
        ))}
      </TabMenuUnorderedList>
    </TabMenuContainer>
  );
}

const TabMenuContainer = styled.div`
  border-radius: 10rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

const TabMenuUnorderedList = styled.ul`
  width: 220px;
  height: 50px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${theme.islandBlueTheme.defaultBackground};
  border-radius: 500px;
  padding: 8px 10px;
  margin: 0;

  color: ${theme.islandBlueTheme.fontColor.buttonDefault};
`;

const TabMenuList = styled.li<{ isActive?: boolean }>(
  ({ isActive }) => css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: #222;
    border-radius: 4rem;
    font-size: 1.2rem;
    padding: ${isActive ? "1rem 1.2rem" : "1rem"};
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
    cursor: pointer;
    ${isActive &&
    `background: ${theme.islandBlueTheme.menuAndToggleActiveColor};
    color: ${theme.islandBlueTheme.fontColor.default};`};

    width: 132px;
    height: 35%;
  `,
);

const TabMenuContent = styled.span<{ isActive?: boolean }>(
  ({ isActive }) => css`
    font-family: Roboto, sans-serif;
    width: 100%;
    font-size: 20px;
    font-weight: ${isActive ? "700" : "normal"};
    white-space: nowrap;
    color: ${isActive
      ? theme.islandBlueTheme.fontColor.buttonDefault
      : theme.islandBlueTheme.fontColor.default};
    text-align: center;
  `,
);

export function TripleTabMenu(props: {
  className?: string;
  menuList: string[];
  activeState: ActiveFunctionProps;
}) {
  const { className, menuList, activeState } = props;

  const { selectedIndex, setSelectedIndex } = activeState;

  let currentLink: EventTarget & Element;
  let currentIndex = 0;
  const links = document.querySelectorAll("nav a");

  function addActive(e: React.MouseEvent, index: number) {
    const target = e.currentTarget;
    links.forEach((link) => link.classList.remove("active"));

    if (target !== currentLink) {
      let direction;
      if (currentIndex < index) direction = "right";
      else direction = "left";
      const slide = target.querySelector(".slide");

      gsap
        .timeline()
        .fromTo(
          slide,
          {
            transformOrigin: `${direction === "left" ? "right" : "left"} center`,
            scaleX: 0,
          },
          {
            delay: 0.1,
            duration: 0.25,
            scaleX: 1,
          },
        )
        .to(slide, {
          delay: 0.25,
          duration: 0.25,
          transformOrigin: `${direction} center`,
          scaleX: 0,
        });
      currentLink = target;
      currentIndex = index;
    }
  }

  return (
    <TripleTabNav className={className}>
      {menuList.map((menu, index) => (
        <TabLink
          key={index}
          href="#"
          onClick={(e) => {
            setSelectedIndex(index);
            addActive(e, index);
          }}
          active={selectedIndex === index}
        >
          <span className="text">{menu.toUpperCase()}</span>
          <div
            css={css`
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background: ${theme.colors.gold};
              opacity: 0.2;
              transform: scaleX(0);
            `}
            className="slide"
          />
        </TabLink>
      ))}
    </TripleTabNav>
  );
}

export const TripleTabNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TabLink = styled.a<{ active: boolean }>(
  ({ active }) => css`
    position: relative;
    text-decoration: none;
    font-family: ${theme.fontStyle.roboto};
    font-weight: bold;
    color: ${active ? theme.colors.gold : theme.colors.gray};
    margin: 0 1rem;
    transition:
      text-shadow 300ms ease,
      color 300ms ease;
    ${active && "text-shadow: 0 0 20px #4df9ff7c"}

    &:focus {
      outline: none;
      border: none;
    }
  `,
);
