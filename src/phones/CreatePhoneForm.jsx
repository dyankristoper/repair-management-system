import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import styled from "styled-components";
import CreateChecklist from "./CreateChecklist";
import onError from "../utilities/formError";

import { useAssignee } from "../assignee/useAssignee";
import { useUpdatePhone } from "./useUpdatePhone";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
`;
const StyledFormContainer = styled.div`
  display: flex;
  gap: 1em;
`;
const StyledSelect = styled.select`
  background-color: var(--color-grey-100);
`;

function CreatePhoneForm({ phoneToEdit = {}, onCloseModal }) {
  const setTechnician = useState(null);
  const { technicians } = useAssignee();

  const handleCheckboxChange = (e) => {
    setValue(e.target.name, e.target.checked);
  };

  const { id: editId, ...editValues } = phoneToEdit;

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

  const { register, handleSubmit, reset, formState, setValue } = useForm({
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
    const { 
      phoneModel,
      imei,
      phoneCondition,
      cost, 
      assignee } = data;

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession){
      editPhone(
        {
          newPhoneData: {
            ...{ phoneModel, phoneCondition, imei, cost, assignee },
            image,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          }
        }
      );
    }
    else
      createPhone(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  onError(errors);

  return (
    <StyledFormContainer className="flex-col">
      <div className="w-full p-10">
        <h3 className="font-medium text-4xl">
          {`Job Order ${ editId }`}
        </h3>
      </div>

      <div className="flex">
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <div className="flex flex-col">
            <FormRow label="Phone model" error={errors?.phoneModel?.message}>
              <Input
                type="text"
                className="w-full"
                id="phoneModel"
                disabled={isWorking}
                defaultValue="SM-"
                {...register("phoneModel", {
                  required: "This field is required",
                })}
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
                {
                  ...register("assignee", {
                    required: "This field is required",
                  })
                }
              >
                <option value={null}>Select technician</option>
                {
                  technicians &&
                  technicians.map((technician) => <option value={ technician.id }>{ technician.email }</option>)
                }
              </StyledSelect>
            </FormRow>                      

            <FormRow label='Image'>
              <FileInput
                id="image"
                accept="image/*"
                {...register("image", {
                  required: isEditSession ? false : "This field is required",
                })}
              />
            </FormRow>

            <FormRow>
              <div className="mt-10 flex gap-4">
                <Button
                  variation="secondary"
                  type="reset"
                  onClick={() => onCloseModal?.()}
                >
                  Cancel
                </Button>
                <Button disabled={isCreating} variation="primary" size="small">
                  {isEditSession ? "Update Details" : "Add Job Order"}
                </Button>
              </div>
            </FormRow>
          </div>
         
        </Form>

        <CreateChecklist
          register={register}
          handleChange={handleCheckboxChange}
        />
      </div>
    </StyledFormContainer>
  );
}

export default CreatePhoneForm;
