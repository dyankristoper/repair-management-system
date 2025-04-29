import styled from "styled-components";

export const RevealSection = styled.section`
  transition: transform 1s, opacity 1s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(8rem)"};
`;

export const LoginPage = styled(RevealSection)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
