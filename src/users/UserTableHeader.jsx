import { tableHeaderOptions } from '../utilities/constants';

const UserTableHeader = () => {
  const userHeader = tableHeaderOptions['users'];

  return (
    <thead className='bg-gray-50 text-2xl font-semibold text-gray-700'>
      <tr>
        {userHeader?.map(({ label }, index) => (
          <th key={`${index}-${label}`} className="py-5 px-4 border-b">
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default UserTableHeader;