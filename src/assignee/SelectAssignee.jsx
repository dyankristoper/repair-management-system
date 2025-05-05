import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const TechnicianOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border: 1px solid var(--color-grey-300);
  gap: 0.2em;
`;

const Button = styled.button`
  border: 1px solid var(--color-grey-300);
  text-align: center;

  &:hover {
    color: var(--color-green-700);
    background-color: var(--color-grey-100);
  }
`;

function SelectAssignee() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterField = "status";
  const options = [
    { value: "Tech-001", label: "Tech-001" },
    { value: "Tech-002", label: "Tech-002" },
  ];
  // const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <TechnicianOptions>
      <StyledButtonGroup>
        {options.map((option) => (
          <Button key={option.value} onClick={() => handleClick(option.value)}>
            {option.label}
          </Button>
        ))}
      </StyledButtonGroup>
    </TechnicianOptions>
  );
}

export default SelectAssignee;
