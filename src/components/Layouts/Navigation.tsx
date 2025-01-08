import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import * as feather from "feather-icons";
import theme from "../../styles/theme";
import { useUserContext } from "../../context/UserContext";
import "@iconscout/unicons/css/line.css";
import {
  EditIcon,
  HelpIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MessageIcon,
  SettingsIcon,
} from "../FeatherIcon/Icons";

const spacer = "1rem";
const linkHeight = `calc(${spacer} * 3.5)`;
const timing = "250ms";
const transition = `${timing} ease all`;

const NAV_MENU = [
  { icon: HomeIcon, link: "/", description: "홈" },
  { icon: MessageIcon, link: "/", description: "톡" },
  { icon: EditIcon, link: "posting", description: "작성" },
  { icon: HelpIcon, link: "/", description: "도움" },
  { icon: LogInIcon, link: "/", description: "로그인" },
  { icon: SettingsIcon, link: "/", description: "설정" },
];

const createGooeyEffect = (i: number) =>
  keyframes({
    "0%": { transform: "scale(1, 1)" },
    "50%": { transform: "scale(0.5, 1.5)" },
    "100%": { transform: "scale(1, 1)" },
  });

export function FooterNav(props: { width: number }) {
  const { user } = useUserContext();

  useEffect(() => {
    feather.replace();
  }, [user]);

  return (
    <FooterNavWrapper width={props.width}>
      <Container>
        <FooterNavBar>
          <FooterNavUL className="navbar__menu">
            {NAV_MENU.map((item, index) => (
              <FooterManuList key={`${index} + ${item}`} index={index}>
                <FooterNavLink href={item.link} className="navbar__link">
                  {user && item.description === "로그인" ? (
                    <LogOutIcon />
                  ) : (
                    <item.icon />
                  )}
                </FooterNavLink>
              </FooterManuList>
            ))}
          </FooterNavUL>
        </FooterNavBar>
      </Container>
    </FooterNavWrapper>
  );
}

const FooterNavWrapper = styled.section<{ width: number }>(
  ({ width }) => css`
    position: fixed;
    bottom: 0;
    width: ${width}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  `,
);

const FooterNavBar = styled.nav`
  background: #fff;
  border-radius: ${theme.borderRadius.roundedBox};
  box-shadow: ${theme.shadowStyle.default};
`;

const FooterNavUL = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const FooterManuList = styled.li<{ index: number }>(
  ({ index }) => css`
    position: relative;

    &:before {
      content: "";
      position: absolute;
      opacity: 0;
      top: 0;
      left: ${spacer};
      width: ${linkHeight};
      height: ${linkHeight};
      border-radius: calc(${theme.borderRadius.roundedBox} * 1.75);
      transition: ${timing} cubic-bezier(1, 0.2, 0.1, 1.2) all;
      background: ${theme.islandBlueTheme.menuAndToggleActiveColor};
      animation: ${createGooeyEffect(index)} ${timing} ease-in-out;
    }

    &:hover:before {
      opacity: 1;
    }
  `,
);

const FooterNavLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${linkHeight};
  width: calc(${spacer} * 5.5);
  color: ${theme.islandBlueTheme.fontSecondary};
  transition: ${transition};

  &:hover {
    color: #fff;
  }
`;

export function SideNav() {
  const { user } = useUserContext();
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
                  {user && item.description === "로그인" ? (
                    <LogOutIcon />
                  ) : (
                    <item.icon />
                  )}
                  <span>
                    {user && item.description === "로그인"
                      ? "로그아웃"
                      : item.description}
                  </span>
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

const SideNavbar = styled.nav`
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

const SideNavHover = styled.div`
  opacity: 0;
  background: #ddd;
  z-index: 1;
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
