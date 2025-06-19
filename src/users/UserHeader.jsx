import { pageHeaderDetails } from "../utilities/constants";

const UserHeader = () => {
    const { header, description } = pageHeaderDetails['users'];

  return (
    <div className="w-full flex flex-col my-10">
        <h2 className="text-4xl font-medium">{ header }</h2>
        <p className="text-xl mt-5 w-[80%]">
            { description }
        </p>
    </div>
  )
}

export default UserHeader;