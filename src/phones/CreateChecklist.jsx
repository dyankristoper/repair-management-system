import styled from "styled-components";

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

function CreateChecklist({ handleCheckboxChange, register }) {
  return (
    <StyledCheckList>
      <CheckList>
        <p>Accesssories</p>
        <div>
          <label htmlFor="simtray">w/ simtray</label>
          <input
            type="checkbox"
            id="simtray"
            name="simtray"
            {...register("simtray")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="simcard">w/ simcard</label>
          <input
            type="checkbox"
            id="simcard"
            name="simcard"
            {...register("simcard")}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          <label htmlFor="memorycard">w/ memory card</label>
          <input
            type="checkbox"
            id="memorycard"
            name="memorycard"
            {...register("memorycard")}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          <label htmlFor="s-pen">w/ spen</label>
          <input
            type="checkbox"
            id="spen"
            name="spen"
            {...register("spen")}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          <label htmlFor="charger">w/ charger</label>
          <input
            type="checkbox"
            id="charger"
            name="charger"
            {...register("charger")}
            onChange={handleCheckboxChange}
          />
        </div>
      </CheckList>
      <CheckList>
        <p>Physical condition</p>
        <div>
          <label htmlFor="broken-screen">broken screen</label>
          <input
            type="checkbox"
            id="broken-screen"
            name="broken-screen"
            {...register("broken screen")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="bulged-battery">bulged battery</label>
          <input
            type="checkbox"
            id="bulged-battery"
            name="bulged-battery"
            {...register("bulged battery")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="broken-chargingpin">broken chargingpin</label>
          <input
            type="checkbox"
            id="broken-chargingpin"
            name="broken-chargingpin"
            {...register("broken chargingpin")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="broken-backcover">broken backcover</label>
          <input
            type="checkbox"
            id="broken-backcover"
            name="broken-backcover"
            {...register("broken backcover")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label html="others">others</label>
          <input
            type="checkbox"
            id="others"
            name="others"
            {...register("others")}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* <label htmlFor="remarks">remarks</label>
        <input
          type="text"
          id="remarks"
          name="remarks"
          {...register("remarks")}
          onChange={handleCheckboxChange}
        /> */}
      </CheckList>
    </StyledCheckList>
  );
}

export default CreateChecklist;
