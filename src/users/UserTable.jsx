import { useAssignee } from "../assignee/useAssignee";

import UserTableHeader from "./UserTableHeader";
import UserTableBody from "./UserTableBody";

const UserTable = () => {
	const { technicians } = useAssignee();

  return (
    <table className="min-w-full bg-white border rounded-md border-gray-200">
			<UserTableHeader />
			<UserTableBody data={technicians} />
    </table>
  )
}

export default UserTable;