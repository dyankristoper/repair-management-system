import styled from "styled-components";
import { formatTimestamp } from "../helpers/formatTime";

const StyledGrid = styled.div`
  height: 280px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 20px;
`;

const BoxOne = styled.div`
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;

  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 14px;
    margin-right: 0.5em;
  }
`;

const BoxTwo = styled.div`
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;
  grid-column-start: 1;
  grid-row-start: 4;
  padding: 1.5em;
  background-color: var(--color-red-100);
  border-radius: 8px;

  p {
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

const BoxThree = styled.div`
  grid-column: span 2 / span 2;
  grid-row: span 6 / span 6;
  grid-column-start: 4;
  grid-row-start: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: 8px;
  background-color: var(--color-grey-50);

  div {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

function Grid({ assigned }) {
  const {
    customer,
    address,
    contactNumber,
    phoneModel,
    imei,
    phoneCondition,
    created_at,
    image,
    assignee,
    waitingForConfirmation,
  } = assigned ?? {};
  return (
    <StyledGrid>
      <BoxOne>
        <p>{formatTimestamp(created_at)}</p>
        <p>
          <span>Customer:</span>
          {customer}
        </p>
        <p>
          <span>Address:</span>
          {address}
        </p>
        <p>
          <span>Contact number:</span>
          {contactNumber}
        </p>
        <p>
          <span>Assigned tech:</span>
          {assignee}
        </p>
        <p>
          {waitingForConfirmation === true ? "Waiting for Confirmation" : ""}
        </p>
      </BoxOne>
      <BoxTwo>
        <p>{phoneModel}</p>
        <p>{imei}</p>
        <p>{phoneCondition}</p>
      </BoxTwo>

      <BoxThree>
        <div>
          <img src={image} alt={`Image sample of ${phoneModel}`} />
        </div>
      </BoxThree>
    </StyledGrid>
  );
}

export default Grid;
