import styled from "styled-components";

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

function StepButton({ prevStep, nextStep, step }) {
  return (
    <ButtonGroup>
      <StyledButton type="primary" onClick={prevStep} active={step > 1}>
        Prev
      </StyledButton>
      <StyledButton type="primary" onClick={nextStep} active={step < 3}>
        Next
      </StyledButton>
    </ButtonGroup>
  );
}

export default StepButton;
