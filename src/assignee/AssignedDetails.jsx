import styled from "styled-components";
import { useAssigned } from "./useAssigned";
import Spinner from "../ui/Spinnner";
import Logo from "../assets/PINES_MULTI_TELECOM.png";

import Grid from "./Grid";
import { useNavigate } from "react-router-dom";

const StyledAssigned = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  border: 1px solid black;
  padding: 1em 2em;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function AssignedDetails() {
  const { assigned, isPending } = useAssigned();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  return (
    <StyledAssigned>
      <LogoWrapper>
        <img src={Logo} width={56} />
        <p>Job order #</p>
      </LogoWrapper>

      <Grid assigned={assigned} />
      <p onClick={() => navigate("/assignee")}>&larr; </p>
    </StyledAssigned>
  );
}

export default AssignedDetails;
