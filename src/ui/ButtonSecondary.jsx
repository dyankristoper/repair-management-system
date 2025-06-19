import styled, { css } from "styled-components";

const sizes = {
  large: css`
    width: 180px;
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: var(--color-green-700);
    color: #fff;
  `,
};

const ButtonSecondary = styled.button`
  ${(props) => sizes[props.size]}
`;

ButtonSecondary.defaultProps = {
  size: "large",
};

export default ButtonSecondary;
