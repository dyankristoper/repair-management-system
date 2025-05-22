import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortByTechnician") || "";

  function handleChange(e) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortByTechnician", e.target.value);

    setSearchParams(newParams);
  }

  return <Select options={options} onChange={handleChange} value={sortBy} />;
}

export default SortBy;
