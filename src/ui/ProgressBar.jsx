import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  position: relative;
  margin-bottom: 15px;

  &:before {
    position: absolute;
    top: 30%;
    left: 0;
    transform: translateY(-50%);
    height: 5px;
    width: ${(props) => (props.step / 3) * 100}%;
    z-index: -1;
    transition: width 0.4s ease;
  }
`;

const Progress = styled.div`
  background-color: var(--line-border-fill);
  position: absolute;
  top: 30%;
  left: 0;
  transform: translateY(0%);
  height: 5px;
  width: ${(props) => (props.step / 3) * 100}%;
  z-index: -1;
  transition: width 0.4s ease;
`;

const Circle = styled.div`
  background-color: #fff;
  color: #999;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 3px solid var(--line-border-empty);
  transition: 0.4s ease;

  border-color: ${(props) =>
    props.active ? "var(--line-border-fill)" : "var(--line-border-empty)"};
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 18rem;

  p {
    color: var(--line-border-fill);
  }
`;

function ProgressBar({ step, isEditSession }) {
  const stepLabels = [
    isEditSession ? "Edit customer info" : "Create customer info",
    isEditSession ? "Edit phone details" : "Create phone details",
    isEditSession ? "Preview details" : "Preview details",
  ];

  return (
    <StyledContainer>
      <ProgressContainer step={step}>
        <Progress step={step} />
        {stepLabels.map((label, index) => (
          <CircleContainer key={index}>
            <Circle active={step >= index + 1}>{index + 1}</Circle>
            {step === index + 1 && <p>{label}</p>}
          </CircleContainer>
        ))}
      </ProgressContainer>
    </StyledContainer>
  );
}

export default ProgressBar;
