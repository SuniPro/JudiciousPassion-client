import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
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
  SendIcon,
  SettingsIcon,
} from "../FeatherIcon/Icons";
import { useWindowContext } from "../../context/WindowContext";

const spacer = "1rem";
const linkHeight = `calc(${spacer} * 3.5)`;
const timing = "250ms";
const transition = `${timing} ease all`;

const NAV_MENU = [
  { icon: HomeIcon, link: "/", description: "홈" },
  { icon: SendIcon, link: "/", description: "DM" },
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

export function FooterNav(props: { onEditor: () => void }) {
  const { onEditor } = props;
  const { user } = useUserContext();
  const { windowWidth } = useWindowContext();

  const listRef = useRef<HTMLLIElement>(null);
  const [listSize, setListSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    feather.replace();
  }, [user]);

  useEffect(() => {
    if (!listRef.current) return;
    setListSize({
      width: listRef.current.offsetWidth,
      height: listRef.current.offsetHeight,
    });
  }, [windowWidth]);

  return (
    <FooterNavWrapper width={windowWidth}>
      <FooterNavBar>
        <FooterNavUL className="navbar__menu">
          {NAV_MENU.map((item, index) => (
            <FooterManuList
              key={`${index} + ${item}`}
              index={index}
              ref={listRef}
              width={listSize.width}
              height={listSize.height}
            >
              <FooterNavLink
                className="navbar__link"
                onClick={() => {
                  if (item.description === "작성") {
                    onEditor();
                  }
                }}
              >
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
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media ${theme.windowSize.small} {
    border-radius: 0;
  }
`;

const FooterNavUL = styled.ul`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10%;
`;

const FooterManuList = styled.li<{
  index: number;
  width: number;
  height: number;
}>(
  ({ index, width, height }) => css`
    position: relative;

    &:before {
      content: "";
      position: absolute;
      opacity: 0;
      top: 0;
      transform: translateX(-22%) translateY(-22%);
      width: ${width + 20}px;
      height: ${height + 20}px;
      border-radius: ${theme.borderRadius.roundedBox};
      transition: ${timing} cubic-bezier(1, 0.2, 0.1, 1.2) all;
      background: ${theme.islandBlueTheme.menuAndToggleActiveColor};
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
  width: 100%;
  color: ${theme.islandBlueTheme.fontSecondary};
  transition: ${transition};

  &:hover {
    color: #fff;
  }
`;

export function SideNav(props: { onEditor: () => void }) {
  const { onEditor } = props;
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
                <SideNavLink
                  className="navbar__link"
                  onClick={() => {
                    if (item.description === "작성") {
                      onEditor();
                    }
                  }}
                >
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

const Container = styled.div`
  width: 100%;
`;

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
