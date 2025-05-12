import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageNotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 2em;
`;

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <PageNotFoundWrapper>
      <p>| Page cannot be displayed</p>
      <button onClick={() => navigate(-1)}>&larr;go back</button>
    </PageNotFoundWrapper>
  );
}

export default PageNotFound;
