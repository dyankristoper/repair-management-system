import { UserHeader, UserTable, UserControl } from '../users/index';
import ModalWindow from '../ui/ModalWindow';
import SignupFom from '../features/authentication/SignupForm';

const Users = () => {
  return (
    <ModalWindow>
      <div className="flex mt-10 px-5">
        <div className='w-1/3'>
          <UserHeader  />
        </div>
        <div className='w-2/3'>
          <UserControl />
          <UserTable />
        </div>

        <ModalWindow.Window name="create-user">
          <SignupFom />
        </ModalWindow.Window>
      </div>
    </ModalWindow>
  )
}

export default Users;