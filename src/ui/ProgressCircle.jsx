import styled from "styled-components";
import { usePendingRepairs } from "../assignee/usePendingRepairs";
import { calcPercentage } from "../helpers/calcPecrcentage";
import Stat from "./Stat";
import { GiFinishLine } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { FaBarsProgress } from "react-icons/fa6";
import Spinner from "./Spinnner";

const StyledProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
const Wrapper = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  background-color: var(--color-grey-50);
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(135deg);
`;

const CircleBase = styled.circle`
  cx: 18;
  cy: 18;
  r: 16;
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
`;

const BackgroundCircle = styled(CircleBase)`
  stroke: ${({ theme }) => theme.colors.gray200};
`;

const ProgressCircle = styled(CircleBase)`
  stroke: ${({ theme }) => theme.colors.blue600};
  stroke-dasharray: ${({ dashArray }) => dashArray};
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2em;

  svg {
    font-size: 2.8rem;
    color: blue;
  }
`;

const StatContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 85rem;
  gap: 0.5em;
`;

const Percentage = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue600};
`;

const StatusText = styled.span`
  color: ${({ theme }) => theme.colors.blue600};
  display: block;
`;

function ProgressCircleComponent() {
  const { pendingRepairs } = usePendingRepairs();

  const { completionPercentage, progressStrokeDasharray } =
    calcPercentage(pendingRepairs);

  // tried to use nullish coalescing rather than optional chaining because sometimes the data is undefined or null;
  const completedCount = (pendingRepairs ?? []).filter(
    (pending) => pending.completed
  ).length;

  const pendingCount = (pendingRepairs ?? []).filter(
    (pending) => !pending.completed
  ).length;

  const confirmationCount = (pendingRepairs ?? []).filter(
    (pending) => pending.waitingForConfirmation
  ).length;

  return (
    <StyledProgress>
      <Wrapper>
        <SVG viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <BackgroundCircle />
          <ProgressCircle dashArray={progressStrokeDasharray} />
        </SVG>

        <InfoContainer>
          <Percentage>{completionPercentage}%</Percentage>
          <StatusText>
            {completionPercentage === 100 ? "Complete" : "Progress"}
          </StatusText>
          <FaBarsProgress />
        </InfoContainer>
      </Wrapper>

      <StatContainer>
        <Stat title="Completed" value={completedCount} icon="🟢" />
        <Stat title="Pending" value={pendingCount} icon="🔴" />
        <Stat title="for confirmation" value={confirmationCount} icon="✅" />
      </StatContainer>
    </StyledProgress>
  );
}

export default ProgressCircleComponent;
