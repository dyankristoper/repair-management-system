import styled from "styled-components";
import Logo from "../../ui/Logo";
import BackgroundImage from "../../assets/background-image.jpg";
import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import ButtonSecondary from "../../ui/ButtonSecondary";

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

  @media (max-width: 546px) {
    display: none;
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

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
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
            disabled={isPending}
          />
          <label htmlFor="password"></label>
          <Input
            type="password"
            id="password"
            value={password}
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
          <div>
            <ButtonSecondary
              // variation="primary"
              size="large"
              disabled={isPending}
            >
              {!isPending ? "Log in" : <SpinnerMini />}
            </ButtonSecondary>
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
