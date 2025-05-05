import { forwardRef } from "react";
import LoginForm from "../features/authentication/LoginForm";
import { LoginPage } from "../ui/StyledLogin";
import { useRevealSection } from "../hooks/useRevealSection";

const Login = forwardRef((props, ref) => {
  const { ref: revealRef, isVisible } = useRevealSection();

  return (
    <LoginPage
      ref={(element) => {
        if (ref) ref.current = element;
        revealRef.current = element;
      }}
      isVisible={isVisible}
    >
      <LoginForm />
    </LoginPage>
  );
});

Login.displayName = "Login";

export default Login;
