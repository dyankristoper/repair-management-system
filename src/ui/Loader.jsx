import styled from "styled-components";

const StyledLoader = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Loader() {
  return (
    <StyledLoader>
      <span class="loader"></span>
    </StyledLoader>
  );
}

export default Loader;
