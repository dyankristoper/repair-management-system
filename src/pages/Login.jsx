import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function Login() {
  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
