import styled from "styled-components";
import Chart from "./Chart";
import PieChartComponent from "./PieChartComponent";
import { useSuccessRepairs } from "./useSuccessRepairs";
import DashboardStats from "./DashboardStats";
import Loader from "../ui/Loader";

const StyledDashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 8px;
`;

const StatWrapper = styled.div`
  grid-column: span 5 / span 5;
  grid-row: span 2 / span 2;
`;

const TaskWrapper = styled.div`
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;
  grid-row-start: 3;
  border: 1px solid black;
`;
const PieChartWrapper = styled.div`
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 4;
  grid-row-start: 3;
`;
const GraphWrapper = styled.div`
  grid-column: span 5 / span 5;
  grid-row: span 5 / span 5;
  grid-row-start: 6;
`;

function DashboardContents() {
  const { isPending, phones } = useSuccessRepairs();

  if (isPending) return <Loader />;
  return (
    <StyledDashboardContent>
      <StatWrapper>
        <DashboardStats phones={phones} />
      </StatWrapper>
      <TaskWrapper>Task</TaskWrapper>
      <PieChartWrapper>
        <PieChartComponent />
      </PieChartWrapper>
      <GraphWrapper>
        <Chart />
      </GraphWrapper>
    </StyledDashboardContent>
  );
}

export default DashboardContents;
