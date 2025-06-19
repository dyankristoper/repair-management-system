import ModalWindow from '../ui/ModalWindow';

const UserControl = () => {
  return (
    <div className="w-full flex justify-end mb-10">
      <div>
        <ModalWindow.Open opens="create-user">
          <button className="bg-green-800 text-white py-2 px-4 rounded">
            {'Add User'}
          </button>
        </ModalWindow.Open>
      </div>
    </div>
  )
}

export default UserControl;