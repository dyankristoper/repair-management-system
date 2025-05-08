import styled from "styled-components";
import DashboardContents from "../dashboard/DashboardContents";
import DashboardFilter from "../dashboard/DashboardFilter";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 75rem;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <DashboardFilter />
      <DashboardContents />
    </StyledDashboard>
  );
}

export default Dashboard;
