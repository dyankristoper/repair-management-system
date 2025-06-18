import { tableHeaderOptions } from '../utilities/constants';

const UserTableHeader = () => {
	const userHeader = tableHeaderOptions['users'];

	const renderTableHeader = () => {
		return (
			<tr className='bg-gray-100 text-left text-2xl font-semibold text-gray-700'>
				{ 
					userHeader && 
					userHeader.map((userData, _ind) => <th key={`${_ind}-${userData.label}`} className='py-5 px-4 border-b'>{ userData.label }</th>)
				}
			</tr>
		)
	}

	return (
		<thead>
			{ renderTableHeader() }
		</thead>
	)
}

export default UserTableHeader;