import styled from "styled-components";

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 2em;
  justify-content: right;
`;

function ButtonGroupWrapper({ children }) {
  return <StyledButtonGroup>{children}</StyledButtonGroup>;
}

export default ButtonGroupWrapper;
