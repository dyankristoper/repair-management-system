import styled from "styled-components";
import LOGO from "../assets/PINES_MULTI_TELECOM.jpg";

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const TitleLogo = styled.h1`
  letter-spacing: 3px;
  font-size: 1.5rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={LOGO} alt="Logo" />
      <TitleLogo>Mobile Solutions</TitleLogo>
    </StyledLogo>
  );
}

export default Logo;
