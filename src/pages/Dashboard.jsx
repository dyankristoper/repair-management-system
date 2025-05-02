import styled from "styled-components";
import DashboardContents from "../ui/DashboardContents";
import Heading from "../ui/Heading";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 75rem;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>

      <DashboardContents />
    </StyledDashboard>
  );
}

export default Dashboard;
