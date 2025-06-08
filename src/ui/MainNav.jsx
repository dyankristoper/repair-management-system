import styled from "styled-components";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi2";
import { CiMobile3 } from "react-icons/ci";
import StyledNavLink from "./StyledNavLink";
import AssigneeNav from "./AssigneeNav";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>

        <AssigneeNav />

        <li>
          <StyledNavLink to="/phones">
            <CiMobile3 />
            <span>Job Orders</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/createUser">
            <HiOutlineUser />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
