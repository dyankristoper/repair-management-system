import styled, { css } from "styled-components";
import { useSettings } from "../settings/useSettings";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      background-color: ${props.$colors.primary || "var(--color-brand-600)"};
      color: var(--color-grey-0);
      border-color: ${props.$colors.primary || "var(--color-brand-600)"};
    `}

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$colors.primary || "var(--color-brand-600)"};
  }
`;

function Select({ options, value, onChange, active, ...props }) {
  const { settings } = useSettings();
  const { primary_color } = settings ?? {};

  const colors = {
    primary: primary_color,
  };

  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      $colors={colors}
      $active={active}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
