import styled from "styled-components";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

import { useAssignee } from "../assignee/useAssignee";

const StyledTableOperations = styled.div`
  display: flex;
  gap: 1.6rem;
`;

function PhonetableOperation() {
  const { technicians } = useAssignee();

  return (
    <StyledTableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Ongoing" },
        ]}
      />

      <SortBy
        options={[
          { value: "all", label: "Assigned to all" },
          ...(technicians
            ? technicians.map(({ id, name }) => ({
                value: id,
                label: `Assigned to ${name}`,
              }))
            : []),
        ]}
      />
    </StyledTableOperations>
  );
}

export default PhonetableOperation;
