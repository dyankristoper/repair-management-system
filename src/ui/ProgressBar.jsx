import styled from "styled-components";

const StyledContainer = styled.div`
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

  :before {
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
  transform: translateY(-50%);
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

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.active ? "var(--line-border-fill)" : "var(--line-border-empty)"};
  color: #fff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 30px;
  margin: 5px;
  font-size: 14px;
  transform: ${(props) => (props.active ? "scale(0.98)" : "none")};
  transition: 0.3s ease;

  &:focus {
    outline: 0;
  }

  &:disabled {
    background-color: var(--line-border-empty);
    cursor: not-allowed;
  }
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

function ProgressBar({ prevStep, nextStep, step }) {
  return (
    <StyledContainer>
      <ProgressContainer step={step}>
        <Progress step={step}></Progress>
        <CircleContainer>
          <Circle active={step >= 1}>1</Circle>
          {step === 1 && <p>Customer Information</p>}
        </CircleContainer>
        <CircleContainer>
          <Circle active={step >= 2}>2</Circle>
          {step === 2 && <p>Phone Details</p>}
        </CircleContainer>
        <CircleContainer>
          <Circle active={step >= 3}>3</Circle>
          {step === 3 && <p>Phone Checklist</p>}
        </CircleContainer>
      </ProgressContainer>

      <ButtonGroup>
        <StyledButton onClick={prevStep} active={step > 1}>
          Prev
        </StyledButton>
        <StyledButton onClick={nextStep} active={step < 3}>
          Next
        </StyledButton>
      </ButtonGroup>
    </StyledContainer>
  );
}

export default ProgressBar;
