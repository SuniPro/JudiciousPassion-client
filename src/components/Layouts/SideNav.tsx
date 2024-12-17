import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import * as feather from "feather-icons";
import theme from "../../styles/theme";

const spacer = "1rem";
const linkHeight = `calc(${spacer} * 3.5)`;
const timing = "250ms";
const transition = `${timing} ease all`;

const NAV_MENU = [
  { icon: "home", link: "/", description: "홈" },
  { icon: "message-square", link: "/", description: "톡" },
  { icon: "users", link: "/", description: "친구" },
  { icon: "edit", link: "posting", description: "작성" },
  { icon: "help-circle", link: "/", description: "도움" },
  { icon: "settings", link: "/", description: "설정" },
];

const createGooeyEffect = (i: number) =>
  keyframes({
    "0%": { transform: "scale(1, 1)" },
    "50%": { transform: "scale(0.5, 1.5)" },
    "100%": { transform: "scale(1, 1)" },
  });

export function SideNav() {
  useEffect(() => {
    // Feather Icons를 React에 적용
    feather.replace();
  }, []);

  return (
    <Wrapper>
      <Container>
        <SideNavbar>
          <ul className="navbar__menu">
            {NAV_MENU.map((item, index) => (
              <SideManuList key={`${index} + ${item}`} index={index}>
                <SideNavLink href={item.link} className="navbar__link">
                  <i data-feather={item.icon}></i>
                  <span>{item.description}</span>
                </SideNavLink>
              </SideManuList>
            ))}
          </ul>
        </SideNavbar>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: fixed;
  overflow-y: visible;
  width: fit-content;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Container = styled.div``;

export const SideNavbar = styled.nav`
  position: fixed;
  top: ${spacer};
  left: ${spacer};
  background: #fff;
  border-radius: ${theme.borderRadius.roundedBox};
  padding: ${spacer} 0;
  box-shadow: ${theme.shadowStyle.default};
  height: calc(100vh - calc(${spacer} * 4));
  display: flex;
  flex-direction: column;

  ul {
    position: relative;
    padding: 0;
  }
`;

const SideManuList = styled.li<{ index: number }>(
  ({ index }) => css`
    position: relative;

    &:before {
      content: "";
      position: absolute;
      opacity: 0;
      z-index: -1;
      top: 0;
      left: ${spacer};
      width: ${linkHeight};
      height: ${linkHeight};
      background: ${theme.islandBlueTheme.menuAndToggleActiveColor};
      border-radius: calc(${theme.borderRadius.roundedBox} * 1.75);
      transition: ${timing} cubic-bezier(1, 0.2, 0.1, 1.2) all;

      animation: ${createGooeyEffect(index)} ${timing} ease-in-out;
    }

    &:hover:before {
      opacity: 1;
    }
  `,
);

const SideNavLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${linkHeight};
  width: calc(${spacer} * 5.5);
  color: ${theme.islandBlueTheme.fontSecondary};
  transition: ${transition};

  span {
    position: absolute;
    left: 100%;
    transform: translate(calc(-1 * ${spacer} * 3));
    margin-left: 1rem;
    opacity: 0;
    pointer-events: none;
    color: ${theme.islandBlueTheme.menuAndToggleActiveColor};
    background: #fff;
    padding: calc(${spacer} * 0.75);
    border-radius: calc(${theme.borderRadius.roundedBox} * 1.75);
    transition: ${transition};
    white-space: nowrap;
    font-weight: bold;
  }

  &:hover {
    color: #fff;

    span {
      opacity: 1;
      transform: translate(0);
    }
  }
`;
