import { UserHeader, UserTable, UserControl } from '../users/index';

const Users = () => {
  return (
    <div className="flex flex-col">
        <UserHeader />
        <UserControl />
        <UserTable />
    </div>
  )
}

export default Users;