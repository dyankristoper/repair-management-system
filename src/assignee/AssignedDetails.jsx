import { useNavigate } from "react-router-dom";
import { useAssigned } from "./useAssigned";
import Logo from "../assets/PINES_MULTI_TELECOM.png";
import styled from "styled-components";

import Grid from "./Grid";
import Loader from "../ui/Loader";

const StyledAssigned = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  border-radius: 8px;
  padding: 1em 2em;
  background-color: var(--color-grey-50);
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
`;

function AssignedDetails() {
  const { assigned, isPending } = useAssigned();
  const navigate = useNavigate();

  if (isPending) return <Loader />;

  return (
    <StyledAssigned>
      <LogoWrapper>
        <img src={Logo} width={56} />
        <p>Job order #</p>
      </LogoWrapper>

      <Grid assigned={assigned} isPending={isPending} />

      <ButtonGroup>
        <button onClick={() => navigate("/assignee")} replace={true}>
          &larr;back
        </button>
        <button>update</button>
      </ButtonGroup>
    </StyledAssigned>
  );
}

export default AssignedDetails;
