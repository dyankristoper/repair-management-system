import styled from "styled-components";

const StyledEntityDetails = styled.li`
  display: flex;
  gap: 0.5rem;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-grey-700);
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ $isCompleted }) =>
      $isCompleted ? "var(--color-green-700)" : "var(--color-grey-600)"};
    margin: 0;
  }
`;
function EntityDetails({ title, description }) {
  const isCompleted = description.toLowerCase() === "completed";

  return (
    <StyledEntityDetails $isCompleted={isCompleted}>
      <h2>{title}:</h2>
      <p>{description}</p>
    </StyledEntityDetails>
  );
}

export default EntityDetails;
