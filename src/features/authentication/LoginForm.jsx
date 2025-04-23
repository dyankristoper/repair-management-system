import styled from "styled-components";
import Logo from "../../ui/Logo";
import BackgroundImage from "../../assets/background-image.jpg";
import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

const StyledLoginForm = styled.div`
  width: 100%;
  max-width: 630px;
  height: 420px;

  display: flex;
  align-items: center;
`;

const FormSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  gap: 0.2em;
`;
const LogoSection = styled.div`
  width: 100%;
  height: 100%;

  div {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
`;

function LoginForm() {
  const [email, setEmail] = useState("adrian@example.com");
  const [password, setPassword] = useState("password123");

  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }
  return (
    <StyledLoginForm>
      <FormSection>
        <div>
          <Logo />
        </div>
        <div>
          <Heading as="h4">Please sign in to your account</Heading>
        </div>

        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="email"></label>
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
          />
          <label htmlFor="password"></label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
          />
          <div>
            <Button variation="primary" size="large" disabled={isLoggingIn}>
              {!isLoggingIn ? "Log in" : <SpinnerMini />}
            </Button>
          </div>
        </StyledForm>
      </FormSection>

      <LogoSection>
        <div>
          <img src={BackgroundImage} />
        </div>
      </LogoSection>
    </StyledLoginForm>
  );
}

export default LoginForm;
