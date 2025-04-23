import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

const StyledLogout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em;
`;
function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <StyledLogout disabled={isPending} onClick={logout}>
      {!isPending ? "Logout" : <SpinnerMini />}
    </StyledLogout>
  );
}

export default Logout;
