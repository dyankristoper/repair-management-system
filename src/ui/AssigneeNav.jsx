import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import styled from "styled-components";
import StyledNavLink from "./StyledNavLink";
import { useSearchParams } from "react-router-dom";
import SelectAssignee from "../assignee/SelectAssignee";

const TechnicianOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

function AssigneeNav() {
  const [showOptions, setShowOptions] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("assignedTechnician");

  function handleClick(value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("assignedTechnician", value);
    setSearchParams(newParams);
  }

  const options = [
    { value: "Adrian", label: "Adrian" },
    { value: "Jhay-ar", label: "Jhay-ar" },
  ];

  return (
    <li onClick={() => setShowOptions(!showOptions)}>
      <StyledNavLink to="/assignee">
        <HiOutlineCalendarDays />
        <span>Assignee</span>
        {showOptions ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </StyledNavLink>

      {showOptions && (
        <TechnicianOptions>
          <SelectAssignee
            options={options}
            selectedValue={sortBy}
            onSelect={handleClick} // 🔹 Correcting function name
          />
        </TechnicianOptions>
      )}
    </li>
  );
}

export default AssigneeNav;
