import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSettings } from "../settings/useSettings";
import { BiEdit } from "react-icons/bi";

const EditIconWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover::after {
    content: "Edit";
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-grey-700);
    color: var(--color-grey-50);
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 0.8rem;
    white-space: nowrap;
  }
`;

function EditIcon() {
  const { settings } = useSettings();
  const navigate = useNavigate();

  return (
    <EditIconWrapper>
      <BiEdit onClick={() => navigate("/settings", { state: { settings } })} />
    </EditIconWrapper>
  );
}

export default EditIcon;
