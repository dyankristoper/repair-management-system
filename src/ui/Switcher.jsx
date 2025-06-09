const Switcher = ( props ) => {
  return (
    <input 
      {...props}
      defaultChecked 
      type="checkbox" 
      className="toggle" />
  )
}

export default Switcher;