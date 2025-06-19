import { useState } from "react";
import { useAssignee } from "../assignee/useAssignee";
import { useUpdateUser } from "../features/authentication/useUpdateUser";

import ModalWindow from '../ui/ModalWindow';
import ConfirmDelete from "../ui/ConfirmDelete";
import UserTableHeader from "./UserTableHeader";
import UserTableBody from "./UserTableBody";

const UserTable = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
	const { technicians } = useAssignee();
  const { suspendUser, isSuspending } = useUpdateUser();

  return (
    <>
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <UserTableHeader />
        <UserTableBody data={technicians} setSelectedUser={setSelectedUser} />
      </table>
      
      <ModalWindow.Window name="suspend-user">
        {selectedUser && (
          <ConfirmDelete
            resourceName={`user "${selectedUser.name || selectedUser.email}"`}
            disabled={isSuspending}
            onConfirm={() => suspendUser(selectedUser.id)}
          />
        )}
      </ModalWindow.Window>
    </>
  )
}

export default UserTable;