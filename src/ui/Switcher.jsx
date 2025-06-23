const Switcher = ( props ) => {
  return (
    <input 
      {...props} 
      type="checkbox" 
      className="toggle border-gray-600 bg-gray-500 checked:border-blue-500 checked:bg-blue-400 checked:text-blue-800y" />
  )
}

export default Switcher;