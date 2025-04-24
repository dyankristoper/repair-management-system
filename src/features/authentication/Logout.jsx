import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";
import { FaPowerOff } from "react-icons/fa";
import ButtonOperation from "../../ui/ButtonOperation";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonOperation disabled={isPending} onClick={logout} aria-label="Logout">
      <span>Logout</span>
      {!isPending ? <FaPowerOff size={20} /> : <SpinnerMini />}
    </ButtonOperation>
  );
}

export default Logout;
