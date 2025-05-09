import styled from "styled-components";

const StyledEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
`;

function Empty() {
  return <StyledEmpty>No data could be found.</StyledEmpty>;
}

export default Empty;
