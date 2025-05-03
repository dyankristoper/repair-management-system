import styled from "styled-components";
import Chart from "../dashboard/Chart";
import PieChartComponent from "../dashboard/PieChartComponent";

const StyledDashboardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 12px;
  min-height: 60rem;
`;

const TaskWrapper = styled.div`
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;
  border: 1px solid black;
`;
const PieChartWrapper = styled.div`
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 4;
`;
const GraphWrapper = styled.div`
  grid-column: span 5 / span 5;
  grid-row: span 4 / span 4;
  grid-row-start: 4;
`;
const ExtraInfoWrapper = styled.div`
  grid-column: span 2 / span 2;
  grid-row: span 4 / span 4;
  grid-column-start: 4;
  grid-row-start: 4;
  border: 1px solid black;
`;

function DashboardContents() {
  return (
    <StyledDashboardContent>
      <TaskWrapper>Task</TaskWrapper>
      <PieChartWrapper>
        <PieChartComponent />
      </PieChartWrapper>
      <GraphWrapper>
        <Chart />
      </GraphWrapper>
      {/* <ExtraInfoWrapper>Extra info</ExtraInfoWrapper> */}
    </StyledDashboardContent>
  );
}

export default DashboardContents;
