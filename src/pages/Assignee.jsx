import styled from "styled-components";
import Heading from "../ui/Heading";
import RepairTechnicianOne from "../ui/RepairTechnicianOne";
import RepairTechnicianTwo from "../ui/RepairTechnicianTwo";
import Row from "../ui/Row";

const StyledAssignee = styled.div`
  display: flex;
  align-items: center;
`;

function Assignee() {
  return (
    <StyledAssignee>
      <RepairTechnicianOne />
      <RepairTechnicianTwo />
    </StyledAssignee>
  );
}

export default Assignee;
