import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useSettings } from "../settings/useSettings";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  justify-content: right;
  gap: 0.8rem;
`;

const FilterButton = styled.button`
  background-color: ${(props) =>
    props.$active ? props.$colors.primary : "var(--color-grey-50)"};
  color: ${(props) =>
    props.$active ? "var(--color-grey-50)" : "var(--color-grey-900)"};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.$colors.primary};
    color: var(--color-grey-50);
  }
`;

function Filter({ filterField, options }) {
  const { settings } = useSettings();
  const { primary_color } = settings ?? {};

  const colors = {
    primary: primary_color || "var(--color-brand-600)",
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter =
    searchParams.get(filterField) ?? String(options[0].value);

  function handleClick(value) {
    searchParams.set(filterField, value);

    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={String(option.value) === currentFilter}
          disabled={String(option.value) === currentFilter}
          $colors={colors}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
