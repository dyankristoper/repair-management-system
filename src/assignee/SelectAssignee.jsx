import styled from "styled-components";

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

function SelectAssignee({ options, selectedValue, onSelect, ...props }) {
  return (
    <StyledButtonGroup {...props}>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onSelect(option.value)}
          style={{
            backgroundColor: selectedValue === option.value ? "#ccc" : "#fff",
          }}
        >
          {option.label}
        </Button>
      ))}
    </StyledButtonGroup>
  );
}

export default SelectAssignee;
