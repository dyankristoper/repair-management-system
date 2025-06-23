import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

function ShowPasswordWrapper({ children }) {
  return <StyledWrapper>{children}</StyledWrapper>;
}

export default ShowPasswordWrapper;
