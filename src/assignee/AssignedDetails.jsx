import { useNavigate } from "react-router-dom";
import { useAssigned } from "./useAssigned";
import { Logo } from "../utilities/constants";
import styled from "styled-components";

import Grid from "./Grid";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import ModalWindow from "../ui/ModalWindow";
import UpdatePhoneForm from "./UpdatePhoneForm";
import { useSettings } from "../settings/useSettings";

const StyledAssigned = styled.div`
  border-radius: 8px;
  padding: 1em 2em;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  align-items: center;
  padding: 2rem 0rem;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
`;

function AssignedDetails() {
  const { assigned, isPending } = useAssigned();
  const { settings } = useSettings();

  const { company_logo, company_name } = settings ?? {};

  const navigate = useNavigate();

  if (isPending) return <Loader />;

  return (
    <StyledAssigned>
      <LogoWrapper>
        <img src={company_logo} width={56} />
        <h2>{company_name}</h2>
      </LogoWrapper>

      <Grid assigned={assigned} isPending={isPending} />

      <ButtonGroup>
        <Button
          variation="tertiary"
          onClick={() => navigate("/assignee")}
          replace={true}
        >
          &larr;back
        </Button>

        <ModalWindow>
          <ModalWindow.Open opens="update-form">
            <Button variation="quaternary">update</Button>
          </ModalWindow.Open>

          <ModalWindow.Window name="update-form">
            <UpdatePhoneForm assignedToUpdate={assigned} />
          </ModalWindow.Window>
        </ModalWindow>
      </ButtonGroup>
    </StyledAssigned>
  );
}

export default AssignedDetails;
