import { useForm } from "react-hook-form";
import { useCreatePhone } from "./useCreatePhone";
import { useEditPhone } from "./useEditPhone";
import { useState } from "react";

import Button from "../ui/Button";
import FileInput from "../ui/FileInput";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import styled from "styled-components";
import CreateChecklist from "./CreateChecklist";

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
  const setTechnician = useState("Select technician");

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
        memoryCard: editValues.memoryCard ?? false,
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
        memoryCard: false,
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

  const { isCreating, createPhone } = useCreatePhone();
  const { isEditing, editPhone } = useEditPhone();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editPhone(
        {
          newPhoneData: {
            ...data,
            image,
          },
          id: editId,
        },
        {
          onSuccess: () => reset(),
        }
      );
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

    // console.log(data);
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <StyledFormContainer>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Customer" error={errors?.customer?.message}>
          <Input
            type="text"
            id="customer"
            disabled={isWorking}
            {...register("customer", "status", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Address" error={errors?.address?.message}>
          <Input
            type="text"
            id="address"
            disabled={isWorking}
            {...register("address", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Contact number" error={errors?.contactNumber?.message}>
          <Input
            type="text"
            id="contactNumber"
            disabled={isWorking}
            defaultValue={`+${639}`}
            {...register("contactNumber", {
              required: "This field is required",
              min: {
                value: 9,
                message: "Contact number must be valid",
              },
            })}
          />
        </FormRow>
        <FormRow label="Phone model" error={errors?.phoneModel?.message}>
          <Input
            type="text"
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

      <CreateChecklist
        register={register}
        handleChange={handleCheckboxChange}
      />
    </StyledFormContainer>
  );
}

export default CreatePhoneForm;
