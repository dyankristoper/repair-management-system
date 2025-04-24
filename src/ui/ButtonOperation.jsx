import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s ease-in-out;
  gap: 4px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function ButtonOperation({ disabled, onClick, children }) {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default ButtonOperation;
