import { useNavigate } from "react-router-dom";
import ButtonOperation from "../../ui/ButtonOperation";
import { MdAccountCircle } from "react-icons/md";

function Account() {
  const navigate = useNavigate();
  return (
    <ButtonOperation>
      <p>Account</p>
      <MdAccountCircle size={20} onClick={() => navigate("/account")} />
    </ButtonOperation>
  );
}

export default Account;
