import styled from "styled-components";
import AssignedDetails from "../assignee/AssignedDetails";

const StyledAssigned = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
  width: 100%;
`;

function Assigned() {
  return (
    <StyledAssigned>
      <AssignedDetails />
    </StyledAssigned>
  );
}

export default Assigned;
