import styled from "styled-components";
import Input from "../ui/Input";
import InputRow from "../ui/InputRow";

const StyledCheckListForm = styled.form`
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border-radius: 8px;
`;

const CheckListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  p {
    font-weight: 600;
    font-size: 1.8rem;
    margin-bottom: 0.5em;
  }
`;

function CreateChecklist({ handleCheckboxChange, register }) {
  return (
    <StyledCheckListForm>
      <CheckListWrapper>
        <p>Accesssories</p>
        <InputRow label="w/ simtray">
          <Input
            type="checkbox"
            id="simtray"
            name="simtray"
            {...register("simtray")}
            onChange={handleCheckboxChange}
          />
        </InputRow>
        <InputRow label="w/ simcard">
          <Input
            type="checkbox"
            id="simcard"
            name="simcard"
            {...register("simcard")}
            onChange={handleCheckboxChange}
          />
        </InputRow>

        <InputRow label="w/ memorycard">
          <Input
            type="checkbox"
            id="memorycard"
            name="memorycard"
            {...register("memorycard")}
            onChange={handleCheckboxChange}
          />
        </InputRow>

        <InputRow label="w/ spen">
          <Input
            type="checkbox"
            id="spen"
            name="spen"
            {...register("spen")}
            onChange={handleCheckboxChange}
          />
        </InputRow>

        <InputRow label="w/ charger">
          <Input
            type="checkbox"
            id="charger"
            name="charger"
            {...register("charger")}
            onChange={handleCheckboxChange}
          />
        </InputRow>
      </CheckListWrapper>
      <CheckListWrapper>
        <p>Physical condition</p>
        <InputRow label="Broken Screen?">
          <Input
            type="checkbox"
            id="brokenScreen"
            name="brokenScreen"
            {...register("brokenScreen")}
            onChange={handleCheckboxChange}
          />
        </InputRow>
        <InputRow label="Bulged Battery">
          <Input
            type="checkbox"
            id="bulgedBattery"
            name="bulgedBattery"
            {...register("bulgedBattery")}
            onChange={handleCheckboxChange}
          />
        </InputRow>
        <InputRow label="Broken Chargingpin?">
          <Input
            type="checkbox"
            id="brokenChargingpin"
            name="brokenChargingpin"
            {...register("brokenChargingpin")}
            onChange={handleCheckboxChange}
          />
        </InputRow>
        <InputRow label="Broken Backcover?">
          <Input
            type="checkbox"
            id="brokenBackcover"
            name="brokenBackcover"
            {...register("brokenBackcover")}
            onChange={handleCheckboxChange}
          />
        </InputRow>
      </CheckListWrapper>
    </StyledCheckListForm>
  );
}

export default CreateChecklist;
