import ButtonOperation from "../../ui/ButtonOperation";
import { MdAccountCircle } from "react-icons/md";
import ModalWindow from "../../ui/ModalWindow";
import UpdateUserDataForm from "./UpdateUserDataForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

function Account() {
  return (
    <ModalWindow>
      <ModalWindow.Open opens="update-account">
        <ButtonOperation>
          <p>Account</p>
          <MdAccountCircle size={20} />
        </ButtonOperation>
      </ModalWindow.Open>

      <ModalWindow.Window name="update-account">
        <div>
          <UpdateUserDataForm />
          <UpdatePasswordForm />
        </div>
      </ModalWindow.Window>
    </ModalWindow>
  );
}

export default Account;
