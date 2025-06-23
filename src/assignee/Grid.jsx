import { formatTimestamp } from "../helpers/formatTime";

import styled from "styled-components";
import Loader from "../ui/Loader";
import EntityDetails from "../ui/EntityDetails";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
  padding: 2rem;
`;

const BoxOne = styled.ul`
  grid-column: span 3 / span 3;
  grid-row: span 2 / span 2;

  display: flex;
  flex-direction: column;
`;

const BoxTwo = styled.ul`
  grid-column: span 3 / span 3;
  grid-row: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 3;
`;

const BoxThree = styled.div`
  grid-column: span 2 / span 2;
  grid-row: span 4 / span 4;
  grid-column-start: 4;
  grid-row-start: 1;
`;

function Grid({ assigned, isPending }) {
  const {
    phoneModel,
    imei,
    phoneCondition,
    created_at,
    image,
    assignee,
    status,
  } = assigned ?? {};

  const { name, phoneNumber, address, email } = assigned?.customers ?? {};

  if (isPending) return <Loader />;

  const customerEntities = [
    {
      label: "Date received",
      value: formatTimestamp(created_at),
    },

    {
      label: "Customer name",
      value: name,
    },
    {
      label: "Customer address",
      value: address,
    },
    {
      label: "Contact number",
      value: phoneNumber,
    },
    {
      label: "Email address",
      value: email,
    },
  ];

  const phoneEntities = [
    { label: "Phone model", value: phoneModel },
    { label: "Imei", value: imei },
    { label: "Phone condition", value: phoneCondition },
    { label: "Repair status", value: status },
    {
      label: "Assigned to",
      value: assignee.name,
    },
  ];
  return (
    <StyledGrid>
      <BoxOne>
        {customerEntities.map((entity) => (
          <EntityDetails
            key={entity.label}
            title={entity.label}
            description={entity.value}
          />
        ))}
      </BoxOne>

      <BoxTwo>
        {phoneEntities.map((entity) => (
          <EntityDetails
            key={entity.label}
            title={entity.label}
            description={entity.value}
          />
        ))}
      </BoxTwo>

      <BoxThree>
        <img src={image} alt={`Image sample of ${phoneModel}`} />
      </BoxThree>
    </StyledGrid>
  );
}

export default Grid;
