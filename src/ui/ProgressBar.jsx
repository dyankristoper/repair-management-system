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
  margin-bottom: 30px;

  ::before {
    content: ""; /* Mandatory with ::before */
    background-color: var(--line-border-empty);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
  }
`;

const Progress = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: ${(props) => (props.step - 1) * (100 / 2)}%;
  background-color: var(--line-border-fill);

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

function ProgressBar({ prevStep, nextStep, step }) {
  return (
    <StyledContainer>
      <ProgressContainer>
        <Progress />
        <Circle active={step >= 1}>1</Circle>
        <Circle active={step >= 2}>2</Circle>
        <Circle active={step >= 3}>3</Circle>
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
