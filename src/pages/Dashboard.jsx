import styled from "styled-components";
import DashboardContents from "../ui/DashboardContents";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 75rem;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <DashboardContents />
    </StyledDashboard>
  );
}

export default Dashboard;
