import styled from "styled-components";
import Switcher from "../ui/Switcher";

import { jobOrderChecklist } from "../utilities/constants";

const StyledCheckList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const CheckList = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 28rem;
  padding: 0.5rem;

  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const renderChecklist = ( register, handleCheckboxChange, type='accessories' ) => {
  return jobOrderChecklist
    .filter((item) => item.type === type)
    .map(( checklistItem ) => {
      const { name, label } = checklistItem;

      return (
        <div className="flex">
          <label htmlFor={ name }>{`With ${label}`}</label>
          <Switcher 
            id={ name }
            name
            {...register( name )}
            onChange={handleCheckboxChange}
          />
        </div>
      )
  })
}

function CreateChecklist({ handleCheckboxChange, register }) {
  return (
    <StyledCheckList>
      <CheckList>
        <h3 className="text-2xl">Accesssories</h3>
        { renderChecklist( register, handleCheckboxChange, 'accessories' ) }
      </CheckList>
      <CheckList>
        <h3 className="text-2xl">Physical Condition</h3>
        { renderChecklist( register, handleCheckboxChange, 'condition' ) }
      </CheckList>
    </StyledCheckList>
  );
}

export default CreateChecklist;
