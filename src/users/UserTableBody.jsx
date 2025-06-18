import { tableHeaderOptions } from "../utilities/constants"

const UserTableBody = ({ data }) => {
	const userFieldData = tableHeaderOptions['users'];

	if( data?.length === 0 || !data){
		return (
			<tbody>
				<tr>
					<td>{'Data not available.'}</td>
				</tr>
			</tbody>
		)
	}

	const renderUserRowData = (row) => {
		return userFieldData
						.map(( fieldData, fieldIndex ) => {
							const cellContent =  row[ fieldData.key ] ?? <button className="bg-red-500 text-white text-base uppercase rounded px-4 py-2">{'Suspend'}</button>;
							return <td key={`${fieldIndex}-${row[fieldData.key]}`} className="py-3 px-4 border-b">{ cellContent }</td>;
						})
	}

	const renderUserRow = () => {
		return data.map((item) => <tr key={item.id} className="hover:bg-gray-50">{ renderUserRowData( item ) }</tr>)
	}

  return (
    <tbody>
			{ renderUserRow() }
    </tbody>
  )
}

export default UserTableBody;