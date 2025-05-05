import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { HiOutlineCalendarDays } from "react-icons/hi2";
// import { useSearchParams } from "react-router-dom";
import StyledNavLink from "./StyledNavLink";
import SelectAssignee from "../assignee/SelectAssignee";

function AssigneeNav() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <li onClick={() => setShowOptions(!showOptions)}>
      <StyledNavLink to="/assignee">
        <HiOutlineCalendarDays />
        <span>Assignee</span>
        {showOptions ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </StyledNavLink>

      {showOptions && <SelectAssignee />}
    </li>
  );
}

export default AssigneeNav;
