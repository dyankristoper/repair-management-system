import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;

  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;
  margin-top: 0.7em;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 6rem;
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, className = '', props }) {
  return (
    <StyledFormRow className={className} {...props}>
      {label && <Label>{label}</Label>}
      <ErrorWrapper>
        {children}
        {error && <Error>{error}</Error>}
      </ErrorWrapper>
    </StyledFormRow>
  );
}

export default FormRow;
