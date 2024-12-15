import styled from "@emotion/styled";
import { ReactNode } from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { css } from "@emotion/react";

export function SideNav() {
  return (
    <Wrapper>
      <Container>
        <Nav>
          <Menu menu="Taste" icon={<RestaurantIcon />} />
        </Nav>
      </Container>
    </Wrapper>
  );
}

function Menu(props: { menu: string; icon?: ReactNode }) {
  const { menu, icon } = props;
  return (
    <MenuBox>
      <IconWrapper color="black">{icon}</IconWrapper>
      <MenuText>{menu}</MenuText>
    </MenuBox>
  );
}

const Wrapper = styled.section`
  position: fixed;
  overflow-y: visible;
  width: fit-content;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div``;

const Nav = styled.nav``;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const IconWrapper = styled.div<{ color?: string }>(
  ({ color }) => css`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
      fill: ${color ? color : "currentColor"};
    }
  `,
);

const MenuText = styled.span`
  font-size: 16px;
  color: #333;
`;
