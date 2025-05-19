import styled from "styled-components";
import EditIcon from "../ui/EditIcon";
import { MdFormatColorText } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

const StyledCompanySettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 8px;
  background-color: var(--color-grey-0);
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 25rem;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  margin-top: 0.5em;

  svg {
    color: ${(props) => props.color || "black"};
    font-size: 2rem;
  }
`;

const CompanyTitle = styled.p`
  font-size: 2.8rem;
`;

function CompanySettings({ settings }) {
  const {
    company_logo,
    company_name,
    primary_color,
    secondary_color,
    alternative_name,
  } = settings ?? {};
  return (
    <StyledCompanySettings>
      <ImageWrapper>
        <img src={company_logo} />
      </ImageWrapper>

      <Wrapper>
        <CompanyTitle>{company_name}</CompanyTitle>
        <EditIcon />
      </Wrapper>
      <CompanyTitle>{alternative_name}</CompanyTitle>

      <Wrapper>
        <p>Your primary color theme:</p>
        <FaCircle color={primary_color} />
      </Wrapper>
      <Wrapper>
        <p>Your secondary color theme:</p>
        <FaCircle color={secondary_color} />
      </Wrapper>
    </StyledCompanySettings>
  );
}

export default CompanySettings;
