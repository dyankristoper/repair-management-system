import styled, { css } from "styled-components";

const sizes = {
  large: css`
    width: 180px;
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    background-color: var(--color-green-800);
    border: none;
    outline: none;
    border-radius: 5px;
  `,
};

const ButtonSecondary = styled.button`
  ${(props) => sizes[props.size]}
`;

ButtonSecondary.defaultProps = {
  size: "large",
};

export default ButtonSecondary;
