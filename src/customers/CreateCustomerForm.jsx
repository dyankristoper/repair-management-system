import { useForm } from "react-hook-form";
import { useUpdateCustomers } from "./useUpdateCustomers";

import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  max-width: 80rem;
  height: 35rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
`;

function CreateCustomerForm({ setCustomerID, customerToEdit = {}, nextStep }) {
  const { id: customerId, ...editValues } = customerToEdit;

  const isEditSession = Boolean(customerId);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { mutate: createCustomer, isLoading: isCreating } = useUpdateCustomers(
    "create",
    "Customer successfully created"
  );

  const { mutate: editCustomer, isLoading: isEditing } = useUpdateCustomers(
    "edit",
    "Customer successfully edited"
  );

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editCustomer({
        newCustomerData: {
          ...data,
        },
        id: customerId,
      });
      nextStep();
    } else {
      createCustomer(
        { ...data },
        {
          onSuccess: (customerData) => {
            setCustomerID(customerData.id);
            // reset();
          },
          onError: (error) => {
            console.error("Failed to create customer:", error);
          },
        }
      );
      nextStep();
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Customer name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          name="name"
          disabled={isWorking}
          {...register("name", { required: "Customer name is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          name="email"
          disabled={isWorking}
          {...register("email", { required: "Email is required" })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          name="address"
          disabled={isWorking}
          {...register("address", { required: "Address is required" })}
        />
      </FormRow>
      <FormRow label="Contact number" error={errors?.phoneNumber?.message}>
        <Input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          disabled={isWorking}
          {...register("phoneNumber", { required: "Phone number is required" })}
        />
      </FormRow>
      <ButtonGroup>
        <Button disabled={isWorking} variation="primary" size="small">
          {isEditSession ? "Edit details" : "Add customer"}
        </Button>
      </ButtonGroup>
    </StyledForm>
  );
}

export default CreateCustomerForm;
