import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";
import { onEvent } from "../../utilities/formError";
import { FaPowerOff } from "react-icons/fa";
import StyledNavLink from "../../ui/StyledNavLink";

const navLinkStyle = {
  backgroundColor: 'transparent'
}

function Logout() {
  const { logout, isPending } = useLogout();

  const onLogoutClickHandler = async () => {
    await onEvent({ type: 'logout' });
    
    logout();
  }

  return (
    <StyledNavLink
      style={ navLinkStyle } 
      disabled={isPending} 
      onClick={onLogoutClickHandler} 
      aria-label="Logout">
      {
        !isPending ? 
        <FaPowerOff /> : 
        <SpinnerMini />
      }
      <span>Logout</span>
    </StyledNavLink>
  );
}

export default Logout;
