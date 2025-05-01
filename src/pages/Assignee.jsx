import Row from "../ui/Row";
import PhonesTable from "../phones/PhonesTable";
import PhonetableOperation from "../phones/PhonetableOperation";

import { theme } from "../styles/theme";
import styled, { ThemeProvider } from "styled-components";
import ProgressCircleComponent from "../ui/ProgressCircle";

const StyledAssignee = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
function Assignee() {
  return (
    <StyledAssignee>
      <ThemeProvider theme={theme}>
        <ProgressCircleComponent />
      </ThemeProvider>
    </StyledAssignee>
  );
}

export default Assignee;
