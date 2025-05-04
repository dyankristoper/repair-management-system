import styled from "styled-components";
// import { usePhones } from "../phones/usePhones";
import AssignedRow from "./AssignedRow";
import Menus from "../ui/Menus";
import Table from "../ui/Table";
import Spinner from "../ui/Spinnner";
import { Pagination } from "@mui/material";
import { useAssignee } from "./useAssignee";

const StyledAssignedRepairs = styled.div`
  width: 100%;
  /* border: 1px solid black; */
`;

function AssignedRepairs() {
  const { isPending, technician } = useAssignee();

  console.log(technician);

  if (isPending) return <Spinner />;
  return (
    <StyledAssignedRepairs>
      <Menus>
        <Table columns="0.26fr 0.25fr 0.25fr 0.3fr 0.4fr 0.5fr">
          <Table.Header>
            <div>Date</div>
            <div>Status</div>
            <div>Model</div>
            <div>IMEI</div>
            <div>Phone problem</div>
            <div>Repair price</div>
          </Table.Header>

          <Table.Body
            data={technician ?? []}
            render={(tech) => <AssignedRow key={tech.id} tech={tech} />}
          />
        </Table>
      </Menus>

      {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
    </StyledAssignedRepairs>
  );
}

export default AssignedRepairs;
