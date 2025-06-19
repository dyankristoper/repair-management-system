import { tableHeaderOptions } from "../utilities/constants";

import ModalWindow from "../ui/ModalWindow";

const UserTableBody = ({ data, setSelectedUser }) => {
  const userFieldData = tableHeaderOptions["users"];

  // Handle empty or missing data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={userFieldData.length}
            className="text-center text-2xl py-4 text-gray-500"
          >
            Data not available.
          </td>
        </tr>
      </tbody>
    );
  }

  // Render a single row of user data
  const renderUserRowData = (row) => {
    const { isActive, id } = row;

    return userFieldData.map((field, index) => {
      const cellKey = `${field.key}-${id}`;
      let content = row[field.key];

      // Show suspend button if value is null and user is active
      if (content === undefined || content === null) {
        content = isActive ? (
          <ModalWindow.Open opens="suspend-user">
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-2xl uppercase rounded px-5 py-2"
              onClick={() => setSelectedUser(row)}
            >
              Delete
            </button>
          </ModalWindow.Open>
        ) : (
          "-"
        );
      }

      return (
        <td
          key={cellKey}
          className="py-3 px-4 border-b text-center text-2xl"
        >
          {content}
        </td>
      );
    });
  };

  // Render all rows
  const renderUserRows = () =>
    data.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        {renderUserRowData(row)}
      </tr>
    ));

  return (<tbody className="text-sm text-gray-700">{renderUserRows()}</tbody>);
};

export default UserTableBody;
