import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import styled from "styled-components";

const PasswordShowIcons = styled.span`
  svg {
    cursor: pointer;
    color: #aaa;
    font-size: 22px;
    transition: color 0.3s ease;

    &:hover {
      color: #333;
    }
  }
`;

function PasswordShow({ argument, setter }) {
  return (
    <PasswordShowIcons>
      {argument ? (
        <MdOutlineRemoveRedEye onClick={() => setter(false)} />
      ) : (
        <LuEyeClosed onClick={() => setter(true)} />
      )}
    </PasswordShowIcons>
  );
}

export default PasswordShow;
