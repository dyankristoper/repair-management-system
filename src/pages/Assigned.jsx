import styled from "styled-components";
import AssignedDetails from "../assignee/AssignedDetails";

const StyledAssigned = styled.div`
  width: 100%;
  height: 100%;
`;

function Assigned() {
  return (
    <StyledAssigned>
      <AssignedDetails />
    </StyledAssigned>
  );
}

export default Assigned;
