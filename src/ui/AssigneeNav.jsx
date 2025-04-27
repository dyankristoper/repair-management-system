import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import styled from "styled-components";
import StyledNavLink from "./StyledNavLink";
import { useSearchParams } from "react-router-dom";

const TechnicianOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

function AssigneeNav() {
  const [showOptions, setShowOptions] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("assignedTechnician") || "";

  function handleClick(e) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("assignedTechnician", e.target.value);

    setSearchParams(newParams);
  }

  return (
    <li onClick={() => setShowOptions(!showOptions)}>
      <StyledNavLink to="/assignee">
        <HiOutlineCalendarDays />
        <span>Assignee</span>
        {showOptions ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </StyledNavLink>

      {showOptions && (
        <TechnicianOptions>
          <button onClick={handleClick} value="adrian">
            {`${sortBy}Adrian`}
          </button>
          <button onClick={handleClick} value="jhay-ar">
            {`${sortBy}Jhay-ar`}
          </button>
        </TechnicianOptions>
      )}
    </li>
  );
}

export default AssigneeNav;
