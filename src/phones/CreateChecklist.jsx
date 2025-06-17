import styled from "styled-components";
import Switcher from "../ui/Switcher";

import { jobOrderChecklist } from "../utilities/constants";

const StyledCheckList = styled.div`
  width: 80rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
  h3 {
    font-weight: 600;
    font-size: 1.8rem;
    margin-bottom: 0.5em;
  }
`;
const ChecklistItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
  border-bottom: 1px solid var(--color-grey-200);
  padding-bottom: 0.2rem;
`;
const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

const renderChecklist = (
  register,
  handleCheckboxChange,
  type = "accessories"
) => {
  return jobOrderChecklist
    .filter((item) => item.type === type)
    .map((checklistItem) => {
      const { name, label } = checklistItem;

      return (
        <ChecklistItem key={name}>
          <label htmlFor={name}>{`With ${label}`}</label>
          <Switcher
            id={name}
            name
            {...register(name, {
              required: "This field is required",
            })}
            onChange={handleCheckboxChange}
          />
        </ChecklistItem>
      );
    });
};

function CreateChecklist({ handleCheckboxChange, register }) {
  return (
    <StyledCheckList>
      <CheckList>
        <h3 className="text-2xl mb-4">Accessories</h3>
        {renderChecklist(register, handleCheckboxChange, "accessories")}
      </CheckList>
      <CheckList>
        <h3 className="text-2xl mb-4">Physical Condition</h3>
        {renderChecklist(register, handleCheckboxChange, "condition")}
      </CheckList>
    </StyledCheckList>
  );
}

export default CreateChecklist;
