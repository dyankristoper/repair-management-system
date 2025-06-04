import { useForm, Controller } from "react-hook-form";
import { useUpdatePhone } from "./useUpdatePhone";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import styled from "styled-components";
import CreateChecklist from "./CreateChecklist";
import onError from "../utilities/formError";
import CreateCustomerForm from "../customers/CreateCustomerForm";
import ProgressBar from "../ui/ProgressBar";
import ViewPhoneDetails from "../ui/ViewPhoneDetails";
import { phoneModelOptions } from "../utilities/modelList";

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  width: 1000px;
  min-height: 58rem;
`;
const StyledSelect = styled.select`
  background-color: var(--color-grey-100);
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.active ? "var(--line-border-fill)" : "var(--line-border-empty)"};
  color: #fff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 30px;
  margin: 5px;
  font-size: 14px;
  transform: ${(props) => (props.active ? "scale(0.98)" : "none")};
  transition: 0.3s ease;

  &:focus {
    outline: 0;
  }

  &:disabled {
    background-color: var(--line-border-empty);
    cursor: not-allowed;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

function CreatePhoneForm({ phoneToEdit = {}, onCloseModal }) {
  const [customerID, setCustomerID] = useState(null);

  const [step, setStep] = useState(1);

  const [newPhoneData, setNewPhoneData] = useState(null);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const setTechnician = useState("Select technician");

  const handleCheckboxChange = (e) => {
    setValue(e.target.name, e.target.checked);
  };

  const { id: editId, ...editValues } = phoneToEdit ?? {};

  const customerToEdit = editValues?.customers ?? {};
  const customerToEditId = editValues?.customers?.id ?? {};

  const isEditSession = Boolean(editId);

  const defaultCheckValues = isEditSession
    ? {
        ...editValues,
        simtray: editValues.simtray ?? false,
        simcard: editValues.simcard ?? false,
        memorycard: editValues.memorycard ?? false,
        spen: editValues.spen ?? false,
        charger: editValues.charger ?? false,
        brokenScreen: editValues.brokenScreen ?? false,
        bulgedBattery: editValues.bulgedBattery ?? false,
        brokenChargingpin: editValues.brokenChargingpin ?? false,
        brokenBackcover: editValues.brokenBackcover ?? false,
      }
    : {
        simtray: false,
        simcard: false,
        memorycard: false,
        spen: false,
        charger: false,
        brokenScreen: false,
        bulgedBattery: false,
        brokenChargingpin: false,
        brokenBackcover: false,
      };

  const { register, handleSubmit, reset, formState, setValue, control } =
    useForm({
      defaultValues: isEditSession ? editValues && defaultCheckValues : {},
    });

  const { errors } = formState;

  const { mutate: createPhone, isLoading: isCreating } = useUpdatePhone(
    "create",
    "Phone Successfully created"
  );

  const { mutate: editPhone, isLoading: isEditing } = useUpdatePhone(
    "edit",
    "Phone Successfully edited"
  );

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editPhone(
        {
          newPhoneData: {
            ...data,
            image,
            customer_id: isEditSession ? customerToEditId : customerID,
          },
          id: editId,
        },
        {
          onSuccess: (updatedPhone) => {
            setNewPhoneData(updatedPhone);
            nextStep();
          },
        }
      );
    else
      createPhone(
        { ...data, image: image, customer_id: customerID },
        {
          onSuccess: (createdPhone) => {
            setNewPhoneData(createdPhone);
            reset();
            nextStep();
          },
        }
      );
  }

  onError(errors.message);

  return (
    <StyledFormContainer>
      <ProgressBar step={step} prevStep={prevStep} nextStep={nextStep} />
      {step === 1 && (
        <CreateCustomerForm
          setCustomerID={setCustomerID}
          customerToEdit={customerToEdit}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <Wrapper>
            <div>
              <FormRow label="Phone model" error={errors?.phoneModel?.message}>
                <Controller
                  control={control}
                  name="phoneModel"
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <CreatableSelect
                      isDisabled={isWorking}
                      options={phoneModelOptions}
                      onChange={(val) => field.onChange(val?.value)}
                    />
                  )}
                />
              </FormRow>

              <FormRow label="IMEI" error={errors?.imei?.message}>
                <Input
                  type="text"
                  id="imei"
                  disabled={isWorking}
                  {...register("imei", {
                    required: "This field is required",
                  })}
                />
              </FormRow>
              <FormRow
                label="Phone condition"
                error={errors?.phoneCondition?.message}
              >
                <Textarea
                  type="text"
                  id="phoneCondition"
                  disabled={isWorking}
                  {...register("phoneCondition", {
                    required: "This field is required",
                  })}
                />
              </FormRow>
              <FormRow label="Cost" error={errors?.cost?.message}>
                <Input
                  type="text"
                  id="cost"
                  defaultValue="Php"
                  disabled={isWorking}
                  {...register("cost", {
                    required: "This field is required",
                  })}
                />
              </FormRow>
              <FormRow label="Assignee" error={errors?.assignee?.message}>
                <StyledSelect
                  id="assignee"
                  onChange={(e) => setTechnician(e.target.value)}
                  {...register("assignee", {
                    required: "This field is required",
                  })}
                >
                  <option>Select technician</option>
                  <option value="Tech-001">Tech-001</option>
                  <option value="Tech-002">Tech-002</option>
                </StyledSelect>
              </FormRow>
              <FormRow>
                <label>Image</label>
                <FileInput
                  id="image"
                  accept="image/*"
                  {...register("image", {
                    required: isEditSession ? false : "This field is required",
                  })}
                />
              </FormRow>
            </div>
            <CreateChecklist
              register={register}
              handleChange={handleCheckboxChange}
            />
          </Wrapper>

          <FormRow>
            <Button
              variation="secondary"
              type="reset"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button disabled={isCreating} variation="primary" size="small">
              {isEditSession ? "Edit details" : "Add phone"}
            </Button>
          </FormRow>
        </Form>
      )}

      {step === 3 && <ViewPhoneDetails phoneDetails={newPhoneData} />}

      <ButtonGroup>
        <StyledButton onClick={prevStep} active={step > 1}>
          Prev
        </StyledButton>
        <StyledButton onClick={nextStep} active={step < 3}>
          Next
        </StyledButton>
      </ButtonGroup>
    </StyledFormContainer>
  );
}

export default CreatePhoneForm;
