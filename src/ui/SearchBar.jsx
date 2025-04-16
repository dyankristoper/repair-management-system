import { useEffect, useState } from "react";

function SearchBar() {
  const [searchedValue, setSearchedValue] = useState("");

  useEffect(() => {}, [searchedValue]);

  function handleChange(e) {
    setSearchedValue(e.target.value);
  }
  console.log(searchedValue);
  return <input type="text" onChange={handleChange} />;
}

export default SearchBar;
